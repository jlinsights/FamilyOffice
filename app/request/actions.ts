'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { requestTicketSchema, type RequestTicketSubmission } from './schema';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'request-tickets.json');

// Re-export type
export type { RequestTicketSubmission } from './schema';

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, '[]', 'utf-8');
  }
}

export async function submitRequestTicket(
  data: z.infer<typeof requestTicketSchema>
) {
  try {
    await ensureDataFile();

    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const submissions: RequestTicketSubmission[] = JSON.parse(fileContent);

    const newSubmission: RequestTicketSubmission = {
      ...data,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    submissions.unshift(newSubmission); // Add to top

    await fs.writeFile(
      DATA_FILE_PATH,
      JSON.stringify(submissions, null, 2),
      'utf-8'
    );

    return { success: true };
  } catch (error) {
    console.error('Failed to submit request ticket:', error);
    return { success: false, error: 'Failed to save submission' };
  }
}

export async function getRequestTickets() {
  try {
    await ensureDataFile();
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const submissions: RequestTicketSubmission[] = JSON.parse(fileContent);
    return { data: submissions, error: null };
  } catch (error) {
    console.error('Failed to get request tickets:', error);
    return { data: [], error: 'Failed to load tickets' };
  }
}
