import React, { useActionState, useRef } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";

const initialState = {
  error: "",
  success: "",
};

async function registerAction(_, formData) {
  const userData = {
    username: formData.get("username")?.trim(),
    email: formData.get("email")?.trim(),
    password: formData.get("password"),
    agreeTerms: formData.get("agreeTerms") === "on",
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      const firstError = Object.values(data)[0];

      return {
        error: Array.isArray(firstError)
          ? firstError[0]
          : String(firstError || "Registration failed."),
        success: "",
      };
    }

    return {
      error: "",
      success: "Account created successfully!",
    };
  } catch {
    return {
      error: "Unable to connect to the server.",
      success: "",
    };
  }
}

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  const termsRef = useRef(null);
  const privacyRef = useRef(null);
  const checkboxRef = useRef(null);

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
              Your career journey starts here.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-violet-200 xl:text-base">
              Discover exciting opportunities, connect with top employers, and
              take the next big step toward your dream career.
            </p>

            <div className="mt-6 max-w-md rounded-2xl border border-white/20 bg-white/10 p-4">
              <h3 className="text-sm font-bold">✨ Find your perfect match</h3>

              <p className="mt-1 text-xs text-violet-200">
                Your next opportunity is one step away.
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
              Create your account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Join JobQuest and discover your next opportunity.
            </p>

            {/* REGISTER FORM */}
            <form action={formAction} className="mt-7 space-y-4">
              <div>
                <label htmlFor="username" className={labelClass}>
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  minLength={3}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className={inputClass}
                />
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-2">
                <input
                  ref={checkboxRef}
                  id="agreeTerms"
                  type="checkbox"
                  name="agreeTerms"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-violet-600"
                />

                <div className="text-xs leading-5 text-gray-500">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => termsRef.current?.showModal()}
                    className="font-bold text-violet-700 hover:underline"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => privacyRef.current?.showModal()}
                    className="font-bold text-violet-700 hover:underline"
                  >
                    Privacy Policy
                  </button>
                  .
                </div>
              </div>

              {state.error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-xs text-red-600"
                >
                  {state.error}
                </p>
              )}

              {state.success && (
                <p
                  role="status"
                  className="rounded-lg bg-violet-50 p-3 text-xs text-violet-700"
                >
                  {state.success}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white transition hover:bg-violet-700 disabled:opacity-60"
              >
                {isPending ? "Registering..." : "Create Account →"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="font-bold text-violet-700 hover:underline"
              >
                Login In
              </Link>
            </p>

            <div className="mt-6 border-t border-gray-100 pt-4 text-center">
              <p className="text-xs text-gray-400">
                Secure access to your JobQuest account.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* TERMS MODAL */}
      <dialog
        ref={termsRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            termsRef.current?.close();
          }
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/60"
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">Terms & Conditions</h2>

          <button
            type="button"
            onClick={() => termsRef.current?.close()}
            className="text-2xl text-gray-500"
            aria-label="Close terms"
          >
            ×
          </button>
        </div>

        <div className="max-h-[55dvh] space-y-4 overflow-y-auto p-5 text-sm leading-6 text-gray-600">
          <p>
            By using JobQuest, you agree to provide accurate account information
            and follow applicable laws.
          </p>

          <p>You are responsible for keeping your login credentials secure.</p>

          <p>
            JobQuest helps users discover job opportunities but does not
            guarantee employment.
          </p>

          <p>
            Fraudulent applications, impersonation, and misuse of the platform
            are prohibited.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button
            type="button"
            onClick={() => termsRef.current?.close()}
            className="rounded-lg border px-4 py-2 text-sm font-semibold"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              if (checkboxRef.current) {
                checkboxRef.current.checked = true;
              }
              termsRef.current?.close();
            }}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
          >
            I Agree & Continue
          </button>
        </div>
      </dialog>

      {/* PRIVACY MODAL */}
      <dialog
        ref={privacyRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            privacyRef.current?.close();
          }
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/60"
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">Privacy Policy</h2>

          <button
            type="button"
            onClick={() => privacyRef.current?.close()}
            className="text-2xl text-gray-500"
            aria-label="Close privacy policy"
          >
            ×
          </button>
        </div>

        <div className="max-h-[55dvh] space-y-4 overflow-y-auto p-5 text-sm leading-6 text-gray-600">
          <p>
            JobQuest may collect your username, email, resume information, and
            application activity.
          </p>

          <p>
            This information may be used to manage your account and provide
            job-related services.
          </p>

          <p>
            Application details may be shared with employers when you apply for
            jobs.
          </p>

          <p>
            Users may request access to, correction of, or deletion of their
            personal information, subject to applicable law.
          </p>
        </div>

        <div className="flex justify-end border-t p-5">
          <button
            type="button"
            onClick={() => privacyRef.current?.close()}
            className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white"
          >
            Close
          </button>
        </div>
      </dialog>
    </main>
  );
}
