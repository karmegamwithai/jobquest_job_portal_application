import React, { useActionState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const initialState = {
  error: "",
  success: "",
};
export default function LoginForm() {
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const visibleRef = useRef(false);

  async function loginAction(_, formData) {
    const userData = {
      username: formData.get("username")?.trim(),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        return {
          error:
            data.error ||
            data.detail ||
            data.message ||
            "Invalid username or password.",
          success: "",
        };
      }

      return {
        error: "",
        success: "Login successful!",
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        error: "Unable to connect to the server.",
        success: "",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  const togglePassword = () => {
    const input = passwordRef.current;

    if (!input) return;

    visibleRef.current = !visibleRef.current;
    input.type = visibleRef.current ? "text" : "password";

    const button = document.getElementById("toggle-password");
    if (button) {
      button.setAttribute(
        "aria-label",
        visibleRef.current ? "Hide password" : "Show password",
      );
    }
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-gray-200 bg-white " +
    "px-4 text-sm text-gray-900 outline-none " +
    "placeholder:text-gray-400 focus:border-violet-500 " +
    "focus:ring-2 focus:ring-violet-100";

  const labelClass = "mb-1.5 block text-xs font-bold text-gray-700";

  return (
    <main className="h-dvh w-full overflow-hidden bg-white font-urbanist">
      <div className="grid h-full w-full lg:grid-cols-2">
        {/* LEFT SECTION */}
        <section className="relative hidden h-full min-h-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-purple-950 p-8 text-white lg:flex xl:p-12">
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full border-[50px] border-white/5" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-2xl font-black text-violet-700">
              ✦
            </div>

            <span className="text-2xl font-black">
              JobQuest<span className="text-violet-300">.</span>
            </span>
          </div>

          <div className="relative z-10">
            <h1 className="max-w-md text-3xl font-black leading-tight xl:text-6xl">
              Welcome back to your career journey.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-violet-200 xl:text-base">
              Sign in to explore exciting opportunities, connect with employers,
              and take your next step toward your dream career.
            </p>

            <div className="mt-6 max-w-md rounded-2xl border border-white/20 bg-white/10 p-4">
              <h3 className="text-sm font-bold">
                ✨ Your next opportunity awaits
              </h3>

              <p className="mt-1 text-xs text-violet-200">
                Continue where you left off.
              </p>
            </div>
          </div>

          <p className="relative z-10 text-xs text-violet-300">
            © {new Date().getFullYear()} JobQuest. All rights reserved.
          </p>
        </section>

        {/* RIGHT SECTION */}
        <section className="flex h-full min-h-0 flex-col items-center overflow-y-auto px-5 py-5 sm:px-8 lg:px-10">
          <div className="my-auto w-full max-w-[410px] shrink-0 py-2">
            {/* Mobile Logo */}
            <div className="mb-4 flex items-center gap-2 lg:hidden">
              <span className="text-2xl text-violet-700">✦</span>
              <span className="text-xl font-black text-violet-700">
                JobQuest.
              </span>
            </div>

            <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-700">
              Career Portal
            </span>

            <h2 className="mt-6 text-3xl font-black text-gray-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to access your JobQuest account.
            </p>

            {/* LOGIN FORM */}
            <form action={formAction} className="mt-7 space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className={labelClass}>
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <input
                    ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    id="toggle-password"
                    type="button"
                    onClick={togglePassword}
                    aria-label="Show password"
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-violet-50 hover:text-violet-600"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {state.error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-xs text-red-600"
                >
                  {state.error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white transition hover:bg-violet-700 disabled:opacity-60"
              >
                {isPending ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-bold text-violet-700 hover:underline"
              >
                Sign Up
              </a>
            </p>

            <div className="mt-6 border-t border-gray-100 pt-4 text-center">
              <p className="text-xs text-gray-400">
                Secure access to your JobQuest account.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
