import { BookOpenCheck, Map, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-sky-600 text-white">
              <BookOpenCheck size={22} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-semibold">软件测试学习路线</span>
              <span className="block text-sm text-slate-500">从零基础开始，一步一步学</span>
            </span>
          </NavLink>

          <nav className="flex items-center gap-2 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 ${
                  isActive ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Map size={17} aria-hidden="true" />
              路线
            </NavLink>
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 ${
                  isActive ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <TrendingUp size={17} aria-hidden="true" />
              进度
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
