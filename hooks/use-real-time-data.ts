import { useState, useEffect, useCallback, useRef } from 'react';

interface RealTimeDataOptions {
  refreshInterval?: number;
  enabled?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
}

interface RealTimeDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  retryCount: number;
}

export function useRealTimeData<T>(
  endpoint: string,
  options: RealTimeDataOptions = {}
): RealTimeDataState<T> & {
  refetch: () => void;
  reset: () => void;
} {
  const {
    refreshInterval = 30000,
    enabled = true,
    retryAttempts = 3,
    retryDelay = 1000,
    onError,
    onSuccess,
  } = options;

  const [state, setState] = useState<RealTimeDataState<T>>({
    data: null,
    isLoading: true,
    error: null,
    lastUpdated: null,
    retryCount: 0,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 콜백 함수들을 ref로 관리하여 의존성 배열 안정화
  const onErrorRef = useRef(onError);
  const onSuccessRef = useRef(onSuccess);

  // ref 업데이트
  useEffect(() => {
    onErrorRef.current = onError;
    onSuccessRef.current = onSuccess;
  }, [onError, onSuccess]);

  const fetchData = useCallback(
    async (isRetry = false) => {
      if (!enabled) return;

      // 이전 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 새로운 AbortController 생성
      abortControllerRef.current = new AbortController();

      try {
        setState(prev => ({
          ...prev,
          isLoading: true,
          error: null,
        }));

        const response = await fetch(endpoint, {
          signal: abortControllerRef.current.signal,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setState(prev => ({
          ...prev,
          data: result,
          isLoading: false,
          lastUpdated: new Date(),
          retryCount: 0,
        }));

        onSuccessRef.current?.(result);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // 요청이 취소된 경우
        }

        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';

        setState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
          retryCount: prev.retryCount + 1,
        }));

        onErrorRef.current?.(error as Error);

        // 재시도 로직
        if (!isRetry && state.retryCount < retryAttempts) {
          setTimeout(
            () => {
              fetchData(true);
            },
            retryDelay * (state.retryCount + 1)
          );
        }
      }
    },
    [endpoint, enabled, retryAttempts, retryDelay, state.retryCount]
  );

  // 초기 데이터 로드
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 주기적 데이터 갱신
  useEffect(() => {
    if (!enabled || refreshInterval <= 0) return;

    intervalRef.current = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, refreshInterval, fetchData]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: true,
      error: null,
      lastUpdated: null,
      retryCount: 0,
    });
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch,
    reset,
  };
}

// WebSocket을 사용한 실시간 데이터 훅
interface WebSocketOptions {
  url: string;
  enabled?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useWebSocket<T = any>(options: WebSocketOptions) {
  const {
    url,
    enabled = true,
    reconnectAttempts = 5,
    reconnectDelay = 1000,
    onMessage,
    onError,
    onOpen,
    onClose,
  } = options;

  const [state, setState] = useState({
    isConnected: false,
    data: null as T | null,
    error: null as string | null,
    reconnectCount: 0,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (!enabled) return;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setState(prev => ({
          ...prev,
          isConnected: true,
          error: null,
        }));
        onOpen?.();
      };

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data);
          setState(prev => ({
            ...prev,
            data,
          }));
          onMessage?.(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = error => {
        setState(prev => ({
          ...prev,
          error: 'WebSocket error occurred',
        }));
        onError?.(error);
      };

      ws.onclose = _event => {
        setState(prev => ({
          ...prev,
          isConnected: false,
        }));
        onClose?.();

        // 자동 재연결
        if (state.reconnectCount < reconnectAttempts) {
          reconnectTimeoutRef.current = setTimeout(
            () => {
              setState(prev => ({
                ...prev,
                reconnectCount: prev.reconnectCount + 1,
              }));
              connect();
            },
            reconnectDelay * (state.reconnectCount + 1)
          );
        }
      };
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to create WebSocket connection',
      }));
    }
  }, [
    url,
    enabled,
    reconnectAttempts,
    reconnectDelay,
    onMessage,
    onError,
    onOpen,
    onClose,
    state.reconnectCount,
  ]);

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  const send = useCallback((data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
  }, []);

  return {
    ...state,
    send,
    disconnect,
  };
}

// 실시간 포트폴리오 데이터 훅
export function usePortfolioData(): RealTimeDataState<any> & {
  refetch: () => void;
  reset: () => void;
} {
  return useRealTimeData('/api/portfolio', {
    refreshInterval: 30000, // 30초마다 갱신
    retryAttempts: 3,
    onError: error => {
      console.error('Portfolio data fetch error:', error);
    },
  });
}

// 실시간 시장 데이터 훅
export function useMarketData(): RealTimeDataState<any> & {
  refetch: () => void;
  reset: () => void;
} {
  return useRealTimeData('/api/market-data', {
    refreshInterval: 10000, // 10초마다 갱신
    retryAttempts: 5,
    onError: error => {
      console.error('Market data fetch error:', error);
    },
  });
}

// 실시간 알림 데이터 훅
export function useNotifications(): {
  isConnected: boolean;
  data: any;
  error: string | null;
  reconnectCount: number;
  send: (data: any) => void;
  disconnect: () => void;
} {
  return useWebSocket({
    url: '/api/notifications',
    reconnectAttempts: 10,
    reconnectDelay: 2000,
    onMessage: data => {
      // 알림 처리 로직
      console.log('Notification received:', data);
    },
    onError: error => {
      console.error('Notification WebSocket error:', error);
    },
  });
}
