import React, { useState } from 'react';

interface LuxeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatioClass?: string;
  containerClassName?: string;
}

export const LuxeImage: React.FC<LuxeImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  aspectRatioClass = 'aspect-4/3',
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#FAF8F5] ${aspectRatioClass} ${containerClassName}`}
    >
      {/* Skeleton / Blur placeholder shimmer while loading */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-[#EBD9CF]/40 animate-pulse"
          aria-hidden="true"
        />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-luxe ${
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-102'
          } ${className}`}
          {...rest}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#FAF8F5] text-[#8C6F66] text-xs">
          <span>{alt || 'Image unavailable'}</span>
        </div>
      )}
    </div>
  );
};
