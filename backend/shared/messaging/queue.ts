import { Queue, Worker, Job, QueueScheduler } from 'bullmq';

import { redisClient } from '../database/connection';
import { logger } from '../logging/logger';

// 큐 설정 인터페이스
export interface QueueConfig {
  name: string;
  concurrency?: number;
  attempts?: number;
  backoff?: {
    type: 'exponential' | 'fixed';
    delay: number;
  };
}

// 기본 큐 설정
const defaultQueueConfig: Partial<QueueConfig> = {
  concurrency: 5,
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000,
  },
};

// 큐 매니저 클래스
export class QueueManager {
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();
  private schedulers: Map<string, QueueScheduler> = new Map();

  // 큐 생성
  createQueue(name: string, config?: Partial<QueueConfig>): Queue {
    const queueConfig = { ...defaultQueueConfig, ...config };

    const queue = new Queue(name, {
      connection: redisClient,
      defaultJobOptions: {
        attempts: queueConfig.attempts,
        backoff: queueConfig.backoff,
        removeOnComplete: 100,
        removeOnFail: 50,
      },
    });

    this.queues.set(name, queue);
    logger.info(`큐 생성됨: ${name}`);
    return queue;
  }

  // 워커 생성
  createWorker(
    name: string,
    processor: (job: Job) => Promise<any>,
    config?: Partial<QueueConfig>
  ): Worker {
    const queueConfig = { ...defaultQueueConfig, ...config };

    const worker = new Worker(name, processor, {
      connection: redisClient,
      concurrency: queueConfig.concurrency,
    });

    // 워커 이벤트 리스너
    worker.on('completed', job => {
      logger.info(`작업 완료: ${job.id}`, {
        queue: name,
        jobId: job.id,
        duration: Date.now() - job.timestamp,
      });
    });

    worker.on('failed', (job, err) => {
      logger.error(`작업 실패: ${job?.id}`, {
        queue: name,
        jobId: job?.id,
        error: err.message,
        stack: err.stack,
      });
    });

    worker.on('error', err => {
      logger.error(`워커 에러: ${name}`, {
        queue: name,
        error: err.message,
        stack: err.stack,
      });
    });

    this.workers.set(name, worker);
    logger.info(`워커 생성됨: ${name}`);
    return worker;
  }

  // 스케줄러 생성
  createScheduler(name: string): QueueScheduler {
    const scheduler = new QueueScheduler(name, {
      connection: redisClient,
    });

    this.schedulers.set(name, scheduler);
    logger.info(`스케줄러 생성됨: ${name}`);
    return scheduler;
  }

  // 작업 추가
  async addJob(
    queueName: string,
    jobName: string,
    data: any,
    options?: any
  ): Promise<Job> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`큐를 찾을 수 없음: ${queueName}`);
    }

    const job = await queue.add(jobName, data, options);
    logger.info(`작업 추가됨: ${job.id}`, {
      queue: queueName,
      jobName,
      jobId: job.id,
    });

    return job;
  }

  // 지연된 작업 추가
  async addDelayedJob(
    queueName: string,
    jobName: string,
    data: any,
    delay: number,
    options?: any
  ): Promise<Job> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`큐를 찾을 수 없음: ${queueName}`);
    }

    const job = await queue.add(jobName, data, {
      delay,
      ...options,
    });

    logger.info(`지연 작업 추가됨: ${job.id}`, {
      queue: queueName,
      jobName,
      jobId: job.id,
      delay,
    });

    return job;
  }

  // 반복 작업 추가
  async addRepeatableJob(
    queueName: string,
    jobName: string,
    data: any,
    pattern: string,
    options?: any
  ): Promise<Job> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`큐를 찾을 수 없음: ${queueName}`);
    }

    const job = await queue.add(jobName, data, {
      repeat: { pattern },
      ...options,
    });

    logger.info(`반복 작업 추가됨: ${job.id}`, {
      queue: queueName,
      jobName,
      jobId: job.id,
      pattern,
    });

    return job;
  }

  // 큐 상태 조회
  async getQueueStatus(queueName: string): Promise<any> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`큐를 찾을 수 없음: ${queueName}`);
    }

    const [waiting, active, completed, failed] = await Promise.all([
      queue.getWaiting(),
      queue.getActive(),
      queue.getCompleted(),
      queue.getFailed(),
    ]);

    return {
      name: queueName,
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
    };
  }

  // 모든 큐 상태 조회
  async getAllQueueStatus(): Promise<any[]> {
    const statuses = [];
    for (const [name] of this.queues) {
      statuses.push(await this.getQueueStatus(name));
    }
    return statuses;
  }

  // 큐 정리
  async cleanQueue(
    queueName: string,
    grace: number = 1000 * 60 * 60 * 24
  ): Promise<void> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`큐를 찾을 수 없음: ${queueName}`);
    }

    await queue.clean(grace, 'completed');
    await queue.clean(grace, 'failed');
    logger.info(`큐 정리 완료: ${queueName}`);
  }

  // 연결 종료
  async close(): Promise<void> {
    const closePromises = [];

    // 워커 종료
    for (const [name, worker] of this.workers) {
      closePromises.push(worker.close());
      logger.info(`워커 종료: ${name}`);
    }

    // 스케줄러 종료
    for (const [name, scheduler] of this.schedulers) {
      closePromises.push(scheduler.close());
      logger.info(`스케줄러 종료: ${name}`);
    }

    // 큐 종료
    for (const [name, queue] of this.queues) {
      closePromises.push(queue.close());
      logger.info(`큐 종료: ${name}`);
    }

    await Promise.all(closePromises);
    logger.info('모든 큐 연결 종료');
  }
}

// 전역 큐 매니저 인스턴스
export const queueManager = new QueueManager();

// 일반적인 큐 이름들
export const QUEUE_NAMES = {
  PORTFOLIO_UPDATES: 'portfolio-updates',
  TRANSACTION_PROCESSING: 'transaction-processing',
  REPORT_GENERATION: 'report-generation',
  EMAIL_NOTIFICATIONS: 'email-notifications',
  DATA_SYNC: 'data-sync',
  AUDIT_LOGS: 'audit-logs',
} as const;
