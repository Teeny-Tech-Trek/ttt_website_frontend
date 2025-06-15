import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import { loginUser, registerUser, forgotPassword, googleLogin } from "../../services/authService";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgot) {
        const res = await forgotPassword(form.username);
        toast.success(res.data.message || "Reset link sent!");
        setIsForgot(false);
      } else if (isLogin) {
        const res = await loginUser(form.username, form.password);
        login(res.data.accessToken);
        toast.success("Login successful");
        navigate("/");
      } else {
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        await registerUser(form.username, form.email, form.password);

        toast.success("Account created. Please log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1f528c 0%, #3e6aa7 50%, #1f528c 100%)",
        backgroundSize: "200% 200%", // For subtle animation
        animation: "gradientShift 15s ease infinite",
      }}
    >
      {/* Subtle tech pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isForgot
              ? "Forgot Password"
              : isLogin
              ? "Welcome Back!"
              : "Create Account"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isForgot
              ? "Enter your username to reset password"
              : isLogin
              ? "Enter your credentials to access your account"
              : "Sign up to get started with Teeny Tech Trek"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="username"
                value={form.username}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="your_username"
              />
            </div>
          </div>

          {!isForgot && !isLogin && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}

          {!isForgot && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </div>
          )}

          {!isForgot && !isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium text-base shadow-md disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {loading
              ? "Processing..."
              : isForgot
              ? "Reset Password"
              : isLogin
              ? "Log In"
              : "Sign Up"}
          </motion.button>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse: CredentialResponse) => {
                if (credentialResponse.credential) {
                  try {
                    const res = await googleLogin(credentialResponse.credential);
                    const token = res.data.accessToken;
                    login(token);
                    toast.success("Google login successful");
                    navigate("/");
                  } catch (err: any) {
                    toast.error(
                      err.response?.data?.error || "Google login failed"
                    );
                  }
                }
              }}
              onError={() => {
                toast.error("Google login failed");
              }}
              useOneTap
            />
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 space-y-3">
          {!isForgot && (
            <motion.button
              onClick={() => setIsForgot(true)}
              className="text-blue-600 hover:underline font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Forgot password?
            </motion.button>
          )}

          {isForgot ? (
            <motion.button
              onClick={() => setIsForgot(false)}
              className="text-blue-600 hover:underline block font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Back to Login
            </motion.button>
          ) : (
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {isLogin ? "Sign up" : "Log in"}
              </motion.button>
            </p>
          )}
        </div>
      </motion.div>

      {/* Inline CSS for background animation */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AuthPage;