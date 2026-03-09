import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem("token");

  const navigation = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Trades", to: "/trades" },
    { name: "Add Trade", to: "/trade-journal" },
  ];

  const onLogout = () => {
    localStorage.removeItem("token");
    setMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/70 backdrop-blur">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
      >
        <Link to="/" className="flex items-center gap-3">
          <img alt="TradeTracker logo" src={logo} className="h-9 w-9 rounded" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-white">
              Tarii
            </div>
            <div className="text-xs text-zinc-400">Journal & analytics</div>
          </div>
        </Link>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-2 text-zinc-100 hover:bg-zinc-900/40"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "text-sm font-semibold transition",
                  isActive ? "text-white" : "text-zinc-300 hover:text-white",
                ].join(" ")
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500"
              >
                Open app
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900/40"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-zinc-300 hover:text-white"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/40" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-zinc-950 p-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-800/70">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <img
                alt="TradeTracker logo"
                src={logo}
                className="h-8 w-8 rounded"
              />
              <span className="text-sm font-semibold text-white">
                TradeTracker
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-2 text-zinc-100 hover:bg-zinc-900/40"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "block rounded-xl px-3 py-2 text-base font-semibold",
                    isActive
                      ? "bg-zinc-900/60 text-white"
                      : "text-zinc-200 hover:bg-zinc-900/40",
                  ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-6 border-t border-zinc-800/70 pt-6">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onLogout}
                className="w-full rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-4 py-2 text-left text-sm font-semibold text-zinc-100 hover:bg-zinc-900/40"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-4 py-2 text-center text-sm font-semibold text-zinc-100 hover:bg-zinc-900/40"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
