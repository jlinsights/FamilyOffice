# Design System Enhancement Plan

## FamilyOffice Wealth Management Platform

### Executive Summary

This document outlines a comprehensive design system enhancement plan for the FamilyOffice platform, focusing on creating a cohesive, scalable, and professional design language that reflects premium wealth management standards while maintaining Korean cultural context.

---

## 1. Current Design System Audit

### 1.1 Existing Foundation

**Strengths:**

- Modern component architecture with shadcn/ui
- Consistent Tailwind CSS implementation
- Professional color palette (Navy + Bronze)
- TypeScript integration for type safety

**Areas for Improvement:**

- Limited design token system
- Inconsistent spacing and typography scales
- Missing component variants for financial data
- Insufficient accessibility considerations

### 1.2 Component Inventory

```typescript
// Current component structure
components/
├── ui/                     # shadcn/ui base components
│   ├── button.tsx         ✅ Well-implemented
│   ├── card.tsx           ✅ Good foundation
│   ├── input.tsx          ⚠️ Needs financial variants
│   ├── table.tsx          ⚠️ Needs advanced features
│   └── ...
├── cal-com-*.tsx          ✅ Specific to booking
├── forms/                 ⚠️ Needs standardization
├── icons/                 ✅ Custom service icons
└── optimized-image.tsx    ✅ Performance optimized
```

---

## 2. Enhanced Design Token System

### 2.1 Color Palette Expansion

```typescript
// Enhanced color system
export const colors = {
  // Brand colors
  brand: {
    navy: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#1e3a8a', // Primary brand navy
      700: '#1e40af',
      800: '#1e3a8a',
      900: '#1e3a8a',
    },
    bronze: {
      50: '#fdf8f3',
      100: '#faf0e6',
      200: '#f5e1cc',
      300: '#efcca3',
      400: '#e8b474',
      500: '#cd7f32', // Primary brand bronze
      600: '#b8722b',
      700: '#9c5f23',
      800: '#7c4c1c',
      900: '#5c3815',
    },
    forest: {
      50: '#f0f9f4',
      100: '#dcf2e4',
      200: '#b8e5ca',
      300: '#8cd4a6',
      400: '#5bbf7d',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
  },

  // Semantic colors for financial data
  financial: {
    positive: '#10b981', // Green for gains
    negative: '#ef4444', // Red for losses
    neutral: '#6b7280', // Gray for neutral
    warning: '#f59e0b', // Amber for warnings
    info: '#3b82f6', // Blue for information
  },

  // Status colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    pending: '#6b7280',
  },
} as const;

// Color utilities
export const getFinancialColor = (value: number): string => {
  if (value > 0) return colors.financial.positive;
  if (value < 0) return colors.financial.negative;
  return colors.financial.neutral;
};
```

### 2.2 Typography Scale Enhancement

```typescript
// Enhanced typography system
export const typography = {
  // Font families
  fontFamily: {
    sans: [
      'Pretendard Variable',
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      'system-ui',
      'sans-serif',
    ],
    mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
    financial: [
      'SF Pro Display',
      'Pretendard Variable',
      'system-ui',
      'sans-serif',
    ],
  },

  // Type scales
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],

    // Financial-specific sizes
    'financial-xs': ['0.6875rem', { lineHeight: '1rem', fontWeight: '500' }],
    'financial-sm': ['0.8125rem', { lineHeight: '1.25rem', fontWeight: '500' }],
    'financial-base': [
      '0.9375rem',
      { lineHeight: '1.5rem', fontWeight: '500' },
    ],
    'financial-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
    'financial-xl': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '600' }],
    'financial-2xl': ['1.75rem', { lineHeight: '2rem', fontWeight: '600' }],
    'financial-3xl': ['2.125rem', { lineHeight: '2.25rem', fontWeight: '700' }],
  },

  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;
```

### 2.3 Spacing and Layout System

```typescript
// Enhanced spacing system
export const spacing = {
  // Base spacing scale
  space: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // Component-specific spacing
  component: {
    cardPadding: '1.5rem',
    modalPadding: '2rem',
    sectionPadding: '3rem',
    containerPadding: '1rem',
    headerHeight: '4rem',
    footerHeight: '3rem',
    sidebarWidth: '16rem',
    dashboardGutter: '1.5rem',
  },

  // Layout breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;
```

---

## 3. Component System Enhancement

### 3.1 Financial Data Components

```typescript
// Enhanced financial metric component
interface FinancialMetricProps {
  label: string
  value: number | string
  change?: number
  changeType?: 'percentage' | 'absolute'
  format?: 'currency' | 'percentage' | 'number'
  size?: 'sm' | 'md' | 'lg'
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function FinancialMetric({
  label,
  value,
  change,
  changeType = 'percentage',
  format = 'currency',
  size = 'md',
  trend,
  className
}: FinancialMetricProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val)
      case 'percentage':
        return `${val}%`
      case 'number':
        return val.toLocaleString('ko-KR')
      default:
        return val
    }
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const valueSizeClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold',
    lg: 'text-2xl font-bold'
  }

  return (
    <div className={cn('space-y-1', className)}>
      <div className={cn('text-muted-foreground', sizeClasses[size])}>
        {label}
      </div>
      <div className={cn('font-financial', valueSizeClasses[size])}>
        {formatValue(value)}
      </div>
      {change !== undefined && (
        <div className={cn(
          'flex items-center gap-1 text-sm',
          change > 0 ? 'text-financial-positive' :
          change < 0 ? 'text-financial-negative' : 'text-financial-neutral'
        )}>
          {change > 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : change < 0 ? (
            <TrendingDown className="h-3 w-3" />
          ) : (
            <Minus className="h-3 w-3" />
          )}
          <span>
            {change > 0 ? '+' : ''}{change}
            {changeType === 'percentage' ? '%' : ''}
          </span>
        </div>
      )}
    </div>
  )
}
```

### 3.2 Enhanced Data Table Component

```typescript
// Professional data table with financial features
interface DataTableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  format?: 'currency' | 'percentage' | 'number' | 'date'
  align?: 'left' | 'center' | 'right'
  width?: string
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  searchable?: boolean
  sortable?: boolean
  filterable?: boolean
  pagination?: boolean
  pageSize?: number
  onRowClick?: (row: T) => void
  onRowSelect?: (rows: T[]) => void
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  sortable = true,
  filterable = false,
  pagination = true,
  pageSize = 10,
  onRowClick,
  onRowSelect,
  className
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns: columns.map(col => ({
      accessorKey: col.key,
      header: col.label,
      cell: ({ row }) => {
        const value = row.getValue(col.key as string)
        if (col.render) {
          return col.render(value, row.original)
        }

        // Format based on column type
        switch (col.format) {
          case 'currency':
            return new Intl.NumberFormat('ko-KR', {
              style: 'currency',
              currency: 'KRW',
              minimumFractionDigits: 0,
            }).format(value as number)
          case 'percentage':
            return `${value}%`
          case 'number':
            return (value as number).toLocaleString('ko-KR')
          case 'date':
            return new Date(value).toLocaleDateString('ko-KR')
          default:
            return value
        }
      },
      enableSorting: col.sortable,
      enableColumnFilter: col.filterable,
      meta: {
        align: col.align || 'left',
        width: col.width
      }
    })),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  })

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and filters */}
      {searchable && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10"
            />
          </div>
          {filterable && (
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      header.column.columnDef.meta?.align === 'center' && 'text-center',
                      header.column.columnDef.meta?.align === 'right' && 'text-right',
                    )}
                    style={{ width: header.column.columnDef.meta?.width }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          'flex items-center gap-2',
                          header.column.getCanSort() && 'cursor-pointer hover:bg-muted/50'
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {sortable && header.column.getCanSort() && (
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    onRowClick && "cursor-pointer hover:bg-muted/50",
                    "transition-colors"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.columnDef.meta?.align === 'center' && 'text-center',
                        cell.column.columnDef.meta?.align === 'right' && 'text-right',
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### 3.3 Enhanced Chart Components

```typescript
// Professional chart wrapper with consistent styling
interface ChartWrapperProps {
  title: string
  subtitle?: string
  data: any[]
  children: React.ReactNode
  actions?: React.ReactNode
  loading?: boolean
  error?: string
  className?: string
}

export function ChartWrapper({
  title,
  subtitle,
  data,
  children,
  actions,
  loading = false,
  error,
  className
}: ChartWrapperProps) {
  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-32" />
              {subtitle && <Skeleton className="h-4 w-48 mt-2" />}
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions}
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {actions}
        </div>
        <div className="h-64">
          {data.length > 0 ? (
            children
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No data available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
```

---

## 4. Design System Documentation

### 4.1 Component Library Structure

```
design-system/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
├── components/
│   ├── base/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   └── ...
│   ├── financial/
│   │   ├── FinancialMetric/
│   │   ├── DataTable/
│   │   ├── ChartWrapper/
│   │   └── ...
│   ├── layout/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── ...
│   └── composite/
│       ├── Dashboard/
│       ├── Portfolio/
│       ├── Analytics/
│       └── ...
├── patterns/
│   ├── forms/
│   ├── navigation/
│   ├── data-display/
│   └── feedback/
└── utils/
    ├── formatters.ts
    ├── validators.ts
    └── helpers.ts
```

### 4.2 Usage Guidelines

```typescript
// Component usage examples and guidelines
export const ComponentGuidelines = {
  // Color usage
  colors: {
    primary: 'Use navy for primary actions and brand elements',
    secondary: 'Use bronze for secondary actions and accents',
    financial: {
      positive: 'Use green for gains, profits, and positive changes',
      negative: 'Use red for losses, deficits, and negative changes',
      neutral: 'Use gray for neutral values and placeholders',
    },
  },

  // Typography guidelines
  typography: {
    headers: 'Use semibold to bold weights for headers',
    body: 'Use regular to medium weights for body text',
    financial: 'Use tabular numbers for financial data',
    emphasis: 'Use medium weight for emphasis, not bold',
  },

  // Spacing guidelines
  spacing: {
    components: 'Use consistent spacing between components',
    sections: 'Use larger spacing to separate major sections',
    forms: 'Use consistent spacing in forms for better usability',
  },
};
```

---

## 5. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)

- [ ] Implement design token system
- [ ] Create enhanced color palette
- [ ] Establish typography scale
- [ ] Set up spacing system
- [ ] Create component documentation

### Phase 2: Core Components (Weeks 3-4)

- [ ] Enhance existing shadcn/ui components
- [ ] Create financial-specific components
- [ ] Implement data table enhancements
- [ ] Add chart wrapper components
- [ ] Create loading and error states

### Phase 3: Advanced Features (Weeks 5-6)

- [ ] Implement advanced form components
- [ ] Create dashboard-specific components
- [ ] Add animation and micro-interactions
- [ ] Implement accessibility enhancements
- [ ] Create responsive design patterns

### Phase 4: Documentation & Testing (Weeks 7-8)

- [ ] Create comprehensive component documentation
- [ ] Implement automated testing
- [ ] Create design system guidelines
- [ ] Performance optimization
- [ ] Accessibility auditing

---

## 6. Success Metrics

### Design System Adoption

- Component reuse rate: Target 80%
- Design consistency score: Target 95%
- Development velocity: Target +30%
- Design-to-code time: Target -40%

### User Experience Impact

- User satisfaction: Target +25%
- Task completion rate: Target +35%
- Error reduction: Target -50%
- Accessibility compliance: Target 100%

### Technical Metrics

- Bundle size optimization: Target -20%
- Performance improvement: Target +15%
- Code maintainability: Target +40%
- Development efficiency: Target +25%

This design system enhancement plan provides a comprehensive foundation for creating a professional, scalable, and consistent user interface that reflects the premium nature of the FamilyOffice wealth management platform while maintaining excellent usability and accessibility standards.
