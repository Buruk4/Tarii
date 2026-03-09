import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <div className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/25 via-fuchsia-500/20 to-emerald-400/15 blur-3xl" />
          <div className="absolute bottom-[-14rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-gradient-to-tr from-rose-500/15 via-indigo-500/15 to-cyan-400/10 blur-3xl" />
        </div>

        <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/60 bg-zinc-950/40 px-3 py-1 text-xs text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Track trades. Learn faster. Trade better.
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Journal your trading journey with{" "}
            <span className="text-blue-400">TradeTracker</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base text-zinc-300 sm:text-lg">
            Keep your process consistent: log trades, review results, and let your
            stats tell the truth.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60 sm:w-auto"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-zinc-700/60 sm:w-auto"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-12 grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-3">
            <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
              <div className="text-sm font-medium text-zinc-300">Fast logging</div>
              <div className="mt-2 text-sm text-zinc-400">
                Record entries, stops, targets, and outcomes in seconds.
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
              <div className="text-sm font-medium text-zinc-300">Clean analytics</div>
              <div className="mt-2 text-sm text-zinc-400">
                Track win rate, PnL, and recent performance at a glance.
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
              <div className="text-sm font-medium text-zinc-300">Process first</div>
              <div className="mt-2 text-sm text-zinc-400">
                Notes and lessons help you improve beyond the numbers.
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
