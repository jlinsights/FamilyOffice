# 프로그램 관리 시스템 컴포넌트 아키텍처

## 🏗️ 컴포넌트 구조 개요

프로그램 관리 시스템의 컴포넌트는 Atomic Design 원칙을 기반으로 설계되어 재사용성과 유지보수성을 극대화합니다.

```
components/
├── ui/                    # Atoms (기본 UI 컴포넌트)
├── forms/                 # Molecules (폼 관련 컴포넌트)
├── program/              # Organisms (프로그램 관련 복합 컴포넌트)
├── admin/                # Organisms (관리자 전용 컴포넌트)
├── layout/               # Templates (레이아웃 컴포넌트)
└── pages/                # Pages (페이지 레벨 컴포넌트)
```

## 🧩 컴포넌트 분류

### 1. Atoms (ui/)
기본적인 UI 요소들로 다른 컴포넌트의 기반이 됩니다.

```typescript
// components/ui/
├── badge.tsx              # 상태 표시용 배지
├── button.tsx             # 버튼 컴포넌트
├── card.tsx               # 카드 컨테이너
├── input.tsx              # 입력 필드
├── select.tsx             # 선택 드롭다운
├── textarea.tsx           # 텍스트 영역
├── dialog.tsx             # 모달 다이얼로그
├── toast.tsx              # 알림 토스트
├── loading-spinner.tsx    # 로딩 스피너
├── pagination.tsx         # 페이지네이션
├── search-input.tsx       # 검색 입력
└── date-picker.tsx        # 날짜 선택기
```

### 2. Molecules (forms/)
여러 atoms을 조합한 기능적 단위입니다.

```typescript
// components/forms/
├── program-search-form.tsx    # 프로그램 검색 폼
├── registration-form.tsx      # 등록 신청 폼
├── program-create-form.tsx    # 프로그램 생성 폼 (관리자)
├── profile-edit-form.tsx      # 프로필 수정 폼
├── feedback-form.tsx          # 피드백 폼
└── filter-form.tsx            # 필터링 폼
```

### 3. Organisms (program/)
비즈니스 로직을 포함한 복합 컴포넌트입니다.

```typescript
// components/program/
├── ProgramCard.tsx            # 프로그램 카드
├── ProgramList.tsx            # 프로그램 목록
├── ProgramDetail.tsx          # 프로그램 상세
├── ProgramSchedule.tsx        # 일정 표시
├── RegistrationStatus.tsx     # 등록 상태
├── ProgramStats.tsx           # 통계 표시
├── AttendanceTracker.tsx      # 출석 추적
└── ProgramRecommendations.tsx # 추천 프로그램
```

## 📋 핵심 컴포넌트 명세

### ProgramCard 컴포넌트

```typescript
// components/program/ProgramCard.tsx
interface ProgramCardProps {
  program: Program
  variant?: 'default' | 'compact' | 'featured'
  showRegistrationButton?: boolean
  onRegister?: (programId: string) => void
  className?: string
}

export function ProgramCard({
  program,
  variant = 'default',
  showRegistrationButton = true,
  onRegister,
  className
}: ProgramCardProps) {
  const isRegistrationOpen = program.status === 'registration_open'
  const isFull = program.approvedRegistrations >= program.capacity
  
  return (
    <Card className={cn('program-card', className)}>
      {/* 프로그램 이미지 */}
      <div className="program-image">
        <Image
          src={program.featuredImage}
          alt={program.title}
          fill
          className="object-cover"
        />
        <Badge variant={getStatusVariant(program.status)}>
          {getStatusText(program.status)}
        </Badge>
      </div>
      
      {/* 프로그램 정보 */}
      <CardContent className="program-content">
        <div className="program-category">
          <Badge variant="outline">{program.category}</Badge>
        </div>
        
        <h3 className="program-title">{program.title}</h3>
        <p className="program-summary">{program.summary}</p>
        
        <div className="program-meta">
          <div className="program-capacity">
            <Users className="h-4 w-4" />
            <span>{program.approvedRegistrations}/{program.capacity}</span>
          </div>
          <div className="program-price">
            {program.price > 0 ? (
              <span>{formatPrice(program.price)}</span>
            ) : (
              <span>무료</span>
            )}
          </div>
        </div>
        
        {/* 다음 일정 */}
        {program.nextSessionDate && (
          <div className="next-session">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(program.nextSessionDate)}</span>
          </div>
        )}
        
        {/* 등록 버튼 */}
        {showRegistrationButton && (
          <Button
            onClick={() => onRegister?.(program.id)}
            disabled={!isRegistrationOpen || isFull}
            className="w-full"
          >
            {getRegistrationButtonText(program)}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
```

### ProgramList 컴포넌트

```typescript
// components/program/ProgramList.tsx
interface ProgramListProps {
  programs: Program[]
  loading?: boolean
  error?: string
  onLoadMore?: () => void
  hasMore?: boolean
  variant?: 'grid' | 'list'
  showFilters?: boolean
  onRegister?: (programId: string) => void
}

export function ProgramList({
  programs,
  loading,
  error,
  onLoadMore,
  hasMore,
  variant = 'grid',
  showFilters = true,
  onRegister
}: ProgramListProps) {
  const [filters, setFilters] = useState<ProgramFilters>({})
  const [searchTerm, setSearchTerm] = useState('')
  
  if (error) {
    return <ErrorState message={error} />
  }
  
  return (
    <div className="program-list">
      {/* 검색 및 필터 */}
      {showFilters && (
        <div className="program-filters">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="프로그램 검색..."
          />
          <FilterForm
            filters={filters}
            onChange={setFilters}
          />
        </div>
      )}
      
      {/* 프로그램 목록 */}
      <div className={cn(
        'program-grid',
        variant === 'grid' ? 'grid-layout' : 'list-layout'
      )}>
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onRegister={onRegister}
            variant={variant === 'list' ? 'compact' : 'default'}
          />
        ))}
      </div>
      
      {/* 로딩 상태 */}
      {loading && <LoadingSpinner />}
      
      {/* 더 보기 버튼 */}
      {hasMore && !loading && (
        <Button onClick={onLoadMore} variant="outline" className="w-full">
          더 보기
        </Button>
      )}
      
      {/* 빈 상태 */}
      {programs.length === 0 && !loading && (
        <EmptyState
          title="프로그램이 없습니다"
          description="조건에 맞는 프로그램을 찾을 수 없습니다."
        />
      )}
    </div>
  )
}
```

### RegistrationForm 컴포넌트

```typescript
// components/forms/RegistrationForm.tsx
interface RegistrationFormProps {
  program: Program
  onSubmit: (data: RegistrationFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function RegistrationForm({
  program,
  onSubmit,
  onCancel,
  loading
}: RegistrationFormProps) {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema)
  })
  
  const handleSubmit = async (data: RegistrationFormData) => {
    try {
      await onSubmit(data)
      toast.success('등록 신청이 완료되었습니다.')
    } catch (error) {
      toast.error('등록 신청 중 오류가 발생했습니다.')
    }
  }
  
  return (
    <Card className="registration-form">
      <CardHeader>
        <CardTitle>프로그램 등록 신청</CardTitle>
        <CardDescription>
          {program.title} 프로그램에 참가 신청합니다.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* 프로그램 정보 요약 */}
            <div className="program-summary">
              <h4>{program.title}</h4>
              <p>{program.summary}</p>
              <div className="program-details">
                <span>정원: {program.capacity}명</span>
                <span>참가비: {formatPrice(program.price)}</span>
                <span>기간: {program.duration}분</span>
              </div>
            </div>
            
            {/* 신청자 정보 */}
            <div className="applicant-info">
              <FormField
                control={form.control}
                name="applicationNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>신청 동기</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="프로그램 참가 동기를 간략히 작성해주세요."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>특별 요청사항</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="특별한 요청사항이 있으시면 작성해주세요."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* 약관 동의 */}
            <div className="terms-agreement">
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>
                      <Link href="/terms" className="underline">
                        이용약관
                      </Link>에 동의합니다.
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            
            {/* 버튼 */}
            <div className="form-actions">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                취소
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={!form.formState.isValid}
              >
                등록 신청
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
```

## 🎨 스타일링 시스템

### CSS 변수 및 테마
```css
/* globals.css - 프로그램 관련 CSS 변수 */
:root {
  /* Program Status Colors */
  --program-draft: hsl(210 40% 60%);
  --program-published: hsl(142 76% 36%);
  --program-registration-open: hsl(217 91% 60%);
  --program-full: hsl(25 95% 53%);
  --program-in-progress: hsl(262 83% 58%);
  --program-completed: hsl(142 76% 36%);
  --program-cancelled: hsl(0 84% 60%);
  
  /* Program Category Colors */
  --category-ceo-education: hsl(217 91% 60%);
  --category-asset-management: hsl(142 76% 36%);
  --category-networking: hsl(25 95% 53%);
  --category-cultural: hsl(262 83% 58%);
  --category-investment: hsl(173 58% 39%);
}
```

### 컴포넌트별 스타일 클래스
```css
/* 프로그램 카드 스타일 */
.program-card {
  @apply relative overflow-hidden transition-all duration-300;
  @apply hover:shadow-lg hover:-translate-y-1;
}

.program-card.featured {
  @apply ring-2 ring-primary;
}

.program-image {
  @apply relative aspect-video overflow-hidden;
}

.program-content {
  @apply p-6 space-y-4;
}

.program-title {
  @apply text-xl font-semibold line-clamp-2;
}

.program-summary {
  @apply text-muted-foreground line-clamp-3;
}

.program-meta {
  @apply flex justify-between items-center text-sm;
}

/* 프로그램 리스트 스타일 */
.program-grid.grid-layout {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.program-grid.list-layout {
  @apply space-y-4;
}

.program-filters {
  @apply flex flex-col sm:flex-row gap-4 mb-8;
}

/* 등록 폼 스타일 */
.registration-form {
  @apply max-w-2xl mx-auto;
}

.program-summary {
  @apply bg-muted/30 p-4 rounded-lg;
}

.form-actions {
  @apply flex justify-end gap-4;
}
```

## 🔄 상태 관리

### 컴포넌트 상태 패턴
```typescript
// hooks/usePrograms.ts
export function usePrograms(filters?: ProgramFilters) {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  
  const fetchPrograms = useCallback(async (reset = false) => {
    try {
      setLoading(true)
      const response = await api.programs.list({
        ...filters,
        page: reset ? 1 : page
      })
      
      if (reset) {
        setPrograms(response.data)
        setPage(1)
      } else {
        setPrograms(prev => [...prev, ...response.data])
      }
      
      setHasMore(response.pagination.hasMore)
      setError(null)
    } catch (err) {
      setError('프로그램을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [filters, page])
  
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1)
    }
  }, [loading, hasMore])
  
  const refresh = useCallback(() => {
    fetchPrograms(true)
  }, [fetchPrograms])
  
  useEffect(() => {
    fetchPrograms(true)
  }, [filters])
  
  useEffect(() => {
    if (page > 1) {
      fetchPrograms()
    }
  }, [page])
  
  return {
    programs,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  }
}
```

### 등록 상태 관리
```typescript
// hooks/useRegistration.ts
export function useRegistration() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  
  const register = useCallback(async (
    programId: string,
    data: Omit<RegistrationFormData, 'programId'>
  ) => {
    setLoading(true)
    try {
      const response = await api.registrations.create({
        programId,
        ...data
      })
      
      setRegistrations(prev => [...prev, response.data])
      toast.success('등록 신청이 완료되었습니다.')
      return response.data
    } catch (error) {
      toast.error('등록 신청 중 오류가 발생했습니다.')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])
  
  const cancel = useCallback(async (registrationId: string) => {
    try {
      await api.registrations.cancel(registrationId)
      setRegistrations(prev => 
        prev.filter(reg => reg.id !== registrationId)
      )
      toast.success('등록이 취소되었습니다.')
    } catch (error) {
      toast.error('등록 취소 중 오류가 발생했습니다.')
      throw error
    }
  }, [])
  
  return {
    registrations,
    loading,
    register,
    cancel
  }
}
```

## 📱 반응형 디자인

### 브레이크포인트 전략
```typescript
// 반응형 브레이크포인트
const breakpoints = {
  sm: '640px',   // 모바일 가로
  md: '768px',   // 태블릿
  lg: '1024px',  // 데스크톱
  xl: '1280px'   // 와이드 데스크톱
}

// 컴포넌트별 반응형 적용
// ProgramCard: sm(1열) → md(2열) → lg(3열)
// Navigation: sm(햄버거) → md(풀메뉴)
// Forms: sm(세로) → md(가로 배치)
```

## ♿ 접근성 고려사항

### ARIA 및 시멘틱 마크업
```typescript
// ProgramCard 접근성 개선
<Card role="article" aria-labelledby={`program-title-${program.id}`}>
  <h3 id={`program-title-${program.id}`}>{program.title}</h3>
  <Button
    aria-label={`${program.title} 프로그램 등록 신청`}
    aria-describedby={`program-desc-${program.id}`}
  >
    등록 신청
  </Button>
  <p id={`program-desc-${program.id}`}>{program.description}</p>
</Card>
```

### 키보드 네비게이션
- Tab/Shift+Tab으로 순차 탐색
- Enter/Space로 버튼 활성화
- Escape로 모달 닫기
- 화면 리더기 지원

## 🧪 테스트 전략

### 컴포넌트 테스트 예시
```typescript
// __tests__/ProgramCard.test.tsx
describe('ProgramCard', () => {
  const mockProgram: Program = {
    id: '1',
    title: 'Test Program',
    status: 'registration_open',
    capacity: 50,
    approvedRegistrations: 25
  }
  
  it('displays program information correctly', () => {
    render(<ProgramCard program={mockProgram} />)
    
    expect(screen.getByText('Test Program')).toBeInTheDocument()
    expect(screen.getByText('25/50')).toBeInTheDocument()
  })
  
  it('calls onRegister when button is clicked', async () => {
    const onRegister = jest.fn()
    render(
      <ProgramCard program={mockProgram} onRegister={onRegister} />
    )
    
    const button = screen.getByRole('button', { name: /등록 신청/ })
    await user.click(button)
    
    expect(onRegister).toHaveBeenCalledWith('1')
  })
})
```

## 🚀 성능 최적화

### 메모이제이션 전략
```typescript
// React.memo로 불필요한 리렌더링 방지
export const ProgramCard = memo(function ProgramCard(props: ProgramCardProps) {
  // 컴포넌트 로직
}, (prevProps, nextProps) => {
  // 커스텀 비교 함수
  return prevProps.program.id === nextProps.program.id &&
         prevProps.program.updatedAt === nextProps.program.updatedAt
})

// useMemo로 무거운 계산 최적화
const filteredPrograms = useMemo(() => {
  return programs.filter(program => 
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [programs, searchTerm])
```

### 가상화 및 지연 로딩
```typescript
// 큰 목록에 대한 가상화
import { FixedSizeList as List } from 'react-window'

const VirtualizedProgramList = ({ programs }: { programs: Program[] }) => (
  <List
    height={600}
    itemCount={programs.length}
    itemSize={200}
    itemData={programs}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <ProgramCard program={data[index]} />
      </div>
    )}
  </List>
)
```

이 컴포넌트 아키텍처는 확장성, 재사용성, 유지보수성을 고려하여 설계되었으며, 프로그램 관리 시스템의 모든 UI 요구사항을 체계적으로 충족합니다.