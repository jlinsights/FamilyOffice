import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Simple Button component for testing
export const TestButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  className?: string
}> = ({ children, onClick, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
)

// Test utility functions
export const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
}

// Custom render function that includes providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <div data-testid="test-wrapper">{children}</div>
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

export { customRender as render }
export * from '@testing-library/react'