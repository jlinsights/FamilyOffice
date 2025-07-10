// 브랜드 컬러 타입
export interface BrandColor {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
}

export interface BrandColorSystem {
  primary: BrandColor[];
  neutral: BrandColor[];
  accent: BrandColor[];
  status: BrandColor[];
}

// 타이포그라피 타입
export interface TypographyVariant {
  name: string;
  font: string;
  weight: string;
  size: string;
  lineHeight: string;
  usage: string;
}

export interface TypographyCategory {
  category: string;
  variants: TypographyVariant[];
}

// 브랜드 가치 타입
export interface BrandValue {
  title: string;
  description: string;
  icon: string;
}
