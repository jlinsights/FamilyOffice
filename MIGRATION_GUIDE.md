# Component Structure Migration Guide

## Current Structure Analysis

Current components are mixed in `/components/` directory with poor organization:

- 100+ files in flat structure
- Mixed responsibilities (UI + business logic + features)
- No clear separation between reusable and feature-specific components

## Target Structure

```
components/
├── ui/                    # Reusable UI primitives (shadcn/ui)
├── layout/                 # Layout components
├── features/               # Feature-specific components
│   ├── auth/
│   ├── financial/
│   ├── blog/
│   ├── seminars/
│   ├── admin/
│   └── contact/
├── pages/                  # Page-specific components
├── providers/              # Context providers
├── hooks/                  # Custom hooks
├── utils/                  # Component utilities
└── types/                  # Component-specific types
```

## Migration Steps

### Phase 1: Create Target Structure

1. Create new directory structure
2. Copy existing shadcn/ui components to `ui/`
3. Extract layout components to `layout/`
4. Create feature directories

### Phase 2: Categorize Components

1. UI Components → `ui/`
2. Layout Components → `layout/`
3. Feature Components → `features/[category]/`
4. Page Components → `pages/`
5. Utilities → `utils/`

### Phase 3: Update Imports

1. Update all import paths
2. Fix absolute imports
3. Test compilation

### Phase 4: Cleanup

1. Remove old components
2. Update index files
3. Run tests
