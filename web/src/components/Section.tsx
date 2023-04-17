import { ReactNode } from "react";

interface SectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}
export function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 md:px-8">
      <div className="mb-10">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="mt-2 font-medium text-gray-500">{subtitle}</p>
      </div>

      {children}
    </section>
  );
}
