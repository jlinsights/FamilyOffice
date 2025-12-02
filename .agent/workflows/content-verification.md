---
description: Workflow for verifying and updating expert column content
---

# Content Verification and Revision Workflow

This workflow outlines the process for fact-checking and updating "Expert Column" (Local Blog Post) content, especially in response to tax law changes or policy updates.

## 1. Fact-Checking (Pre-Publication)

Before publishing a new Expert Column, perform the following checks:

1.  **Tax Law Verification**:
    - Check the latest tax laws on the [National Tax Service (NTS)](https://www.nts.go.kr) website.
    - Verify if there are any pending legislative changes or announcements from the Ministry of Economy and Finance.
2.  **Policy Verification**:
    - Check the [Financial Supervisory Service (FSS)](https://www.fss.or.kr) for relevant financial regulations.
    - Confirm if the content aligns with the latest government guidelines.
3.  **Data Accuracy**:
    - Verify all statistics, rates (e.g., tax rates, interest rates), and figures against official sources.
4.  **Source Citation**:
    - If the content references specific laws, reports, or external data, add them to the `sources` field.
    - Format: `{ title: "Source Title", url: "https://..." }`.

## 2. Content Revision (Post-Publication)

If an existing post needs to be updated due to errors or policy changes:

1.  **Identify the Post**: Locate the post in `lib/blog-data.ts`.
2.  **Update Content**:
    - Modify the `content` field with the corrected or updated information.
    - **CRITICAL**: Do not change the original `date` (published date).
3.  **Update Metadata**:
    - Set `lastUpdated` to the current date (ISO format, e.g., `2025-12-03T00:00:00Z`).
    - Add a `revisionNote` explaining what changed (e.g., "Updated to reflect 2025 tax law amendments").
    - Set `verificationStatus` to `'verified'`.

### Example Update in `lib/blog-data.ts`

```typescript
'investment-strategy-2025': {
  // ... existing fields
  date: '2024-11-15T00:00:00Z', // Original publish date
  lastUpdated: '2025-01-10T00:00:00Z', // New update date
  revisionNote: '2025년 금융투자소득세 폐지 확정에 따른 내용 수정',
  verificationStatus: 'verified',
  // ...
}
```

## 3. Republishing

1.  **Commit & Push**: Commit the changes to `lib/blog-data.ts`.
2.  **Deploy**: The updated content will automatically appear on the `/insights` page.
3.  **UI Verification**: Check that the post now displays the "Updated" date in the Insights Feed.
