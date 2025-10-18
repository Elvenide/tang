import React from 'react';

export default function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold leading-tight text-white opacity-80 my-4">
      {children}
    </h2>
  );
}