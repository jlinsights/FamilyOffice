'use client';

import { 
  FileText,
  Globe,
  BarChart3,
  Target,
  Users,
  TrendingUp,
  Cpu,
  Building,
  Scale,
  Briefcase,
  Play,
  Headphones
} from 'lucide-react';

/**
 * Props for the CategoryIcon component
 * @interface CategoryIconProps
 */
interface CategoryIconProps {
  /** Name of the icon to render */
  iconName: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Dynamic icon component for blog categories and UI elements.
 * Provides lazy-loaded Lucide React icons with fallback support.
 * 
 * Supported icons:
 * - Target, BarChart3, TrendingUp, FileText, Users
 * - Cpu, Building, Scale, Globe, Briefcase
 * - Play, Headphones
 * 
 * @example
 * ```tsx
 * <CategoryIcon iconName="Target" className="h-6 w-6 text-blue-500" />
 * <CategoryIcon iconName="Play" />
 * ```
 * 
 * @param props - The component props
 * @returns JSX element with the specified icon or fallback div
 */
export default function CategoryIcon({ iconName, className = "h-5 w-5 text-primary" }: CategoryIconProps) {
  const iconMap = {
    Target,
    BarChart3,
    TrendingUp,
    FileText,
    Users,
    Cpu,
    Building,
    Scale,
    Globe,
    Briefcase,
    Play,
    Headphones
  };

  const IconComponent = iconMap[iconName as keyof typeof iconMap];
  
  if (!IconComponent) {
    return <div className={className} />;
  }

  return <IconComponent className={className} />;
}