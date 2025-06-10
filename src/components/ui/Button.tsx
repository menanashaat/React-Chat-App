// components/common/Button.tsx
import React from 'react';

type Props = {
  type?: 'button' | 'submit';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export default function Button({ type = 'button', isLoading, disabled, children }: Props) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
