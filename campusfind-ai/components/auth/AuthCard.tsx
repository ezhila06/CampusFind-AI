import { ReactNode } from "react";
import Logo from "../Logo";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-slate-200">

      <div className="mb-8 flex justify-center">
        <Logo />
      </div>

      <h1 className="text-center text-3xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-center text-slate-500">
        {subtitle}
      </p>

      <div className="mt-8">
        {children}
      </div>

    </div>
  );
}