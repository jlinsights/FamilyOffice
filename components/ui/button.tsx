import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md hover:scale-[1.05] transition-all duration-300",
        secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-input shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300",
        tertiary: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] transition-all duration-300",
        link: "text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors duration-300",
        default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md hover:scale-[1.05] transition-all duration-300",
        destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm hover:shadow-md hover:scale-[1.05] transition-all duration-300",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] transition-all duration-300",
        subtle: "bg-muted hover:bg-muted/80 text-muted-foreground hover:scale-[1.02] transition-all duration-300",
        emerald: "bg-emerald-luxury hover:bg-emerald-luxury/90 text-white shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300",
        consultation: "bg-consultation hover:bg-consultation/90 text-white shadow-lg hover:shadow-xl hover:scale-[1.05] font-semibold transition-all duration-300",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    if (asChild) {
      // asChild일 때는 children을 그대로 전달 (Slot은 단일 React 엘리먼트만 허용)
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* 컨텐츠 */}
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
        
        {/* 글래스 샤인 효과 */}
        {variant !== "link" && variant !== "ghost" && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full"
            style={{ transition: 'transform 0.7s cubic-bezier(0.19, 1, 0.22, 1)' }}
          />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
