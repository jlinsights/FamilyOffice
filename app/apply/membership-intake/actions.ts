'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'membership-intakes.json');

// Define the schema as used in the form (we can export this from a shared file later, but keeping it here for simplicity now)
// Note: We need to match the form schema structure
import { membershipIntakeSchema, type MembershipIntakeSubmission } from './schema';

// Re-export type for convenience if needed, but usually better to import from schema
export type { MembershipIntakeSubmission } from './schema';

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, '[]', 'utf-8');
  }
}

export async function submitMembershipIntake(data: z.infer<typeof membershipIntakeSchema>) {
  try {
    await ensureDataFile();
    
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const submissions: MembershipIntakeSubmission[] = JSON.parse(fileContent);

    const newSubmission: MembershipIntakeSubmission = {
      ...data,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    submissions.unshift(newSubmission); // Add to top

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(submissions, null, 2), 'utf-8');

    return { success: true };
  } catch (error) {
    console.error('Failed to submit membership intake:', error);
    return { success: false, error: 'Failed to save submission' };
  }
}

export async function getMembershipIntakeSubmissions() {
  try {
    await ensureDataFile();
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const submissions: MembershipIntakeSubmission[] = JSON.parse(fileContent);
    return { data: submissions, error: null };
  } catch (error) {
    console.error('Failed to get membership intake submissions:', error);
    // Return empty array instead of error to prevent UI crash
    return { data: [], error: 'Failed to load submissions' };
  }
}
