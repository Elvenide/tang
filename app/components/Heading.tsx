import React from 'react';

export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl font-bold leading-tight text-white opacity-90 my-2.5 w-fit border-b border-white/20 pb-1">
      {children}
    </h2>
  );
}
