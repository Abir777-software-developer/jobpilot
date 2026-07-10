import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      setRotation({ x: xAxis, y: yAxis });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-md bg-background">
      <main className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container rounded-xl mb-md organic-shadow">
            <span className="material-symbols-outlined text-on-primary text-[32px]">
              flight_takeoff
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight mb-xs">
            JobPilot
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[280px] mx-auto">
            Your AI co-pilot for job applications
          </p>
        </div>

        <section
          className="bg-surface-container-lowest rounded-xl p-lg organic-shadow border border-outline-variant/10 transition-transform duration-500 ease-out"
          style={{
            transform: `rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
          }}
          onMouseLeave={() => setRotation({ x: 0, y: 0 })}
        >
          <div className="space-y-md">
            <button
              onClick={() =>
                (window.location.href = "http://localhost:5000/api/auth/google")
              }
              className="w-full h-14 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-sm transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center py-sm">
              <div className="flex-grow border-t border-outline-variant/30"></div>
              <span className="flex-shrink mx-md font-label-sm text-label-sm text-outline uppercase tracking-widest">
                or
              </span>
              <div className="flex-grow border-t border-outline-variant/30"></div>
            </div>

            <div className="space-y-base">
              <label className="block font-label-sm text-label-sm text-on-surface-variant ml-xs">
                Professional Email
              </label>
              <input
                className="w-full h-12 px-md bg-white border border-outline-variant/40 rounded-lg focus:ring-0 focus:border-primary transition-colors outline-none font-body-md text-body-md text-on-surface"
                placeholder="name@company.com"
                type="email"
              />
            </div>

            <Link
              to="/"
              className="w-full h-12 flex items-center justify-center border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors duration-200"
            >
              Sign in with email
            </Link>
          </div>

          <div className="mt-lg pt-md border-t border-outline-variant/10 text-center">
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Don't have an account?{" "}
              <a className="text-primary font-bold hover:underline" href="#">
                Request early access
              </a>
            </p>
          </div>
        </section>

        <div className="mt-xl flex flex-col items-center gap-md">
          <div className="w-full h-32 rounded-xl bg-surface-variant overflow-hidden organic-shadow relative flex items-center justify-center">
            <span className="material-symbols-outlined text-outline text-[48px] opacity-20">
              landscape
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          </div>
          <div className="flex gap-lg items-center text-outline">
            <span className="font-label-sm text-label-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">
                lock
              </span>
              Secure & Private
            </span>
            <span className="font-label-sm text-label-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">
                auto_awesome
              </span>
              AI Optimized
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
