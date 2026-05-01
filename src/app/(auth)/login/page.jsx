import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F3F3] py-12 px-4">
      <div className="max-w-2xl w-full bg-white p-10 md:p-20 rounded-lg shadow-sm">
        <h2 className="text-4xl font-bold text-center text-[#403F3F] mb-12">
          Login your account
        </h2>

        <hr className="mb-12 border-gray-200" />

        <form className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-xl text-[#403F3F]">
                Email address
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="input w-full bg-[#F3F3F3] border-none focus:outline-none p-6 rounded-md"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-xl text-[#403F3F]">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input w-full bg-[#F3F3F3] border-none focus:outline-none p-6 rounded-md"
              required
            />
          </div>

          <div className="form-control mt-8">
            <button className="btn w-full bg-[#403F3F] hover:bg-black text-white py-4 rounded-md text-xl font-semibold border-none">
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-[#706F6F] font-semibold">
          Don't Have An Account?{" "}
          <Link href="/register" className="text-[#F75B5F] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
