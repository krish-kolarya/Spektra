import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import { SparklesIcon, LogInIcon } from "lucide-react";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-200"
      data-theme="dark"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row-reverse w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-6 flex items-center justify-start gap-2">
            <SparklesIcon className="size-9" style={{ color: "#4892FF" }} />
            <span
              className="text-4xl font-extrabold font-sans tracking-tight"
              style={{
                backgroundImage: "linear-gradient(to right, #4892FF, #7F56D9)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Spektra
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome Back 👋</h2>
              <p className="text-sm text-gray-400">
                Log in to continue your language journey
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="input input-primary input-bordered w-full focus:ring-2 focus:ring-primary/50 shadow-sm"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-primary input-bordered w-full focus:ring-2 focus:ring-primary/50 shadow-sm"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full gap-2 hover:scale-[1.02] transition-transform duration-200"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogInIcon className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary font-semibold hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full rounded-lg shadow-lg"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="text-sm text-gray-400">
                Practice conversations, make friends, and improve your language
                skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;