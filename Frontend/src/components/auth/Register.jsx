import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import logo from "../../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/dashboard");
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter an email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await register("", email, password);
      if (res?.token) localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/25 via-fuchsia-500/20 to-emerald-400/15 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 sm:px-6">
        <Link to="/" className="mx-auto flex items-center gap-3">
          <img alt="TradeTracker logo" src={logo} className="h-10 w-10 rounded" />
          <div className="leading-tight">
            <div className="text-base font-semibold text-white">TradeTracker</div>
            <div className="text-xs text-zinc-400">Create your account</div>
          </div>
        </Link>

        <div className="mt-8 rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Get started
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Create an account to start tracking your trades.
          </p>

          {error ? (
            <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-zinc-800/70 bg-zinc-950/50 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-400/60"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="mt-2 w-full rounded-xl border border-zinc-800/70 bg-zinc-950/50 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-400/60"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-200">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="mt-2 w-full rounded-xl border border-zinc-800/70 bg-zinc-950/50 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-400/60"
                placeholder="Repeat password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-5 text-sm text-zinc-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
