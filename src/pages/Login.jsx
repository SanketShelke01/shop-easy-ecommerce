import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error(result.payload || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            Welcome
          </h1>
          <p className="text-white/80 mt-1">
            Login to continue shopping
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-white/60" size={18} />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-2.5 bg-transparent text-white placeholder-white/60 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/60 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-white/60" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2.5 bg-transparent text-white placeholder-white/60 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/60 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-gray-100 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-white/80">
          Don’t have an account?
          <Link
            to="/register"
            className="text-white font-medium ml-1 underline hover:text-white/90"
          >
            Register
          </Link>
        </p>

        {error && (
          <p className="text-center mt-4 text-red-300 text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
