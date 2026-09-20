```markdown
# FamilyOffice Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the FamilyOffice codebase, a TypeScript project built on the Next.js framework. You will learn about file naming, import/export styles, commit message patterns, and how to structure and run tests. This guide is designed to help you quickly onboard and contribute effectively to the FamilyOffice repository.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - **Example:** `userProfile.tsx`, `accountSettings.test.ts`

### Import Style
- Use **alias imports** for modules.
  - **Example:**
    ```typescript
    import userService from '@/services/userService'
    import { getConfig } from '@/utils/config'
    ```

### Export Style
- Use **default exports** for modules.
  - **Example:**
    ```typescript
    const userProfile = () => { /* ... */ }
    export default userProfile
    ```

### Commit Patterns
- Commit messages are **freeform** with no strict prefix, averaging 66 characters.
  - **Example:**  
    ```
    Add user profile page with editable contact information
    ```

## Workflows

_No automated workflows detected in the repository._

## Testing Patterns

- **Test File Pattern:** All test files use the `*.test.*` naming convention.
  - **Example:** `userProfile.test.ts`, `apiHandler.test.ts`
- **Testing Framework:** Not explicitly detected. Check project dependencies or documentation for specifics.
- **Test Example:**
  ```typescript
  // userProfile.test.ts
  import userProfile from '@/components/userProfile'

  describe('userProfile', () => {
    it('renders correctly', () => {
      // test implementation
    })
  })
  ```

## Commands
| Command | Purpose |
|---------|---------|
| /test   | Run all tests in the repository |
| /lint   | Lint the codebase according to project standards |
| /build  | Build the Next.js application |
| /dev    | Start the development server |
```
