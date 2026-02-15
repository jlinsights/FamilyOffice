import React from 'react';
import Image from 'next/image';

interface SVGLogoDisplayProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const SVGLogoDisplay: React.FC<SVGLogoDisplayProps> = ({
  src,
  alt,
  width = 200,
  height = 60,
  className = '',
  priority = false,
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
};

interface LogoVariantCardProps {
  title: string;
  description: string;
  logoSrc: string;
  width?: number;
  height?: number;
  darkModeSrc?: string;
}

export const LogoVariantCard: React.FC<LogoVariantCardProps> = ({
  title,
  description,
  logoSrc,
  width = 160,
  height = 48,
  darkModeSrc,
}) => {
  return (
    <div className="border rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
      <div className="font-bold text-base text-gray-900 dark:text-white mb-1">
        {title}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300 mb-4">
        {description}
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center min-h-[80px]">
        {darkModeSrc ? (
          <>
            <div className="block dark:hidden">
              <SVGLogoDisplay
                src={logoSrc}
                alt={`${title} - Light`}
                width={width}
                height={height}
              />
            </div>
            <div className="hidden dark:block">
              <SVGLogoDisplay
                src={darkModeSrc}
                alt={`${title} - Dark`}
                width={width}
                height={height}
              />
            </div>
          </>
        ) : (
          <SVGLogoDisplay
            src={logoSrc}
            alt={title}
            width={width}
            height={height}
          />
        )}
      </div>
    </div>
  );
};
