import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  Squares2X2Icon,
  PlusCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: Squares2X2Icon },
  { label: "Trades", to: "/trades", icon: CalendarDaysIcon },
  { label: "Add Trade", to: "/trade-journal", icon: PlusCircleIcon },
];

const getTitle = (pathname) => {
  if (pathname.startsWith("/trade-journal")) return "Add Trade";
  if (pathname.startsWith("/trades")) return "Trades";
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  return "TradeTracker";
};

const AppShell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = getTitle(location.pathname);

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex">
        <aside className="hidden md:flex md:w-64 md:flex-col md:gap-6 md:border-r md:border-zinc-800/70 md:bg-zinc-950/60 md:px-5 md:py-6">
          <div className="flex items-center gap-3 px-2">
            <img src={logo} alt="Logo" className="h-9 w-9 rounded" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">Tarii</div>
              <div className="text-xs text-zinc-400">Journal & analytics</div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-zinc-900/70 text-white ring-1 ring-zinc-800"
                      : "text-zinc-300 hover:bg-zinc-900/40 hover:text-white",
                  ].join(" ")
                }
              >
                <Icon className="h-5 w-5 text-zinc-400 group-hover:text-zinc-200" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-4">
            <div className="text-xs text-zinc-400">Tip</div>
            <div className="mt-1 text-sm text-zinc-200">
              Keep risk consistent to make your stats meaningful.
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-zinc-800/70 bg-zinc-950/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="md:hidden">
                  <img src={logo} alt="Logo" className="h-8 w-8 rounded" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Overview</div>
                  <div className="text-xl font-semibold tracking-tight">
                    {title}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <NavLink
                  to="/trade-journal"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  Add trade
                </NavLink>
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-zinc-700/60"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
