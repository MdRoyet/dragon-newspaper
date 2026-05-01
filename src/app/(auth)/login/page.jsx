"use client";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      alert(error.message || "Invalid Login");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F3F3] py-12 px-4">
      <div className="max-w-2xl w-full bg-white p-10 md:p-20 rounded-none shadow-sm">
        <h2 className="text-3xl font-bold text-center text-[#403F3F] mb-10">
          Login your account
        </h2>
        <hr className="mb-10" />
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="form-control">
            <label className="label font-bold text-[#403F3F]">
              Email address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              className="input w-full bg-[#F3F3F3] p-5 rounded-md outline-none"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-bold text-[#403F3F]">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              className="input w-full bg-[#F3F3F3] p-5 rounded-md outline-none"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#403F3F] text-white py-4 mt-4 font-semibold"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-8 font-semibold text-[#706F6F]">
          Don't Have An Account?{" "}
          <Link href="/register" className="text-[#F75B5F]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
