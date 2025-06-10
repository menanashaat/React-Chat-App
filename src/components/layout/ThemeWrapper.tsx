// src/components/ThemeWrapper.tsx (updated)
import { useEffect, useState } from 'react';
import { useTheme } from '../../store/context/ThemeContext';

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme, isInitialized } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-800">
        {/* Loading spinner or skeleton */}
        <div className="animate-pulse">Loading theme...</div>
      </div>
    );
  }

  return <>{children}</>;
};