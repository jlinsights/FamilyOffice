import { render, screen } from '@testing-library/react'
import { TestButton } from './utils/test-helpers'

// Basic test to verify Jest setup is working
describe('Basic Test Setup', () => {
  it('should render a simple component', () => {
    render(<TestButton>Click me</TestButton>)
    
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should handle onClick events', () => {
    const mockClick = jest.fn()
    render(<TestButton onClick={mockClick}>Click me</TestButton>)
    
    const button = screen.getByText('Click me')
    button.click()
    
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('should apply custom className', () => {
    render(<TestButton className="custom-class">Test</TestButton>)
    
    const button = screen.getByText('Test')
    expect(button).toHaveClass('custom-class')
  })
})

// Test environment verification
describe('Test Environment', () => {
  it('should have access to window object in JSDOM', () => {
    expect(window).toBeDefined()
    expect(window.document).toBeDefined()
  })

  it('should be able to mock functions', () => {
    const mockFn = jest.fn()
    mockFn('test')
    
    expect(mockFn).toHaveBeenCalledWith('test')
  })
})