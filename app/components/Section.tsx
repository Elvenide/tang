import React from 'react';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`relative z-20 py-6 lg:py-20 px-10 lg:px-24 w-full mx-auto ${className}`}>
      {children}
    </section>
  );
};
