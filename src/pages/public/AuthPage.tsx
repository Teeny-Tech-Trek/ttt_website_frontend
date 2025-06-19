import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

  // Scroll-based effects for background elements
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

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
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans bg-gray-50"
      style={{ opacity }}
    >
      {/* Animated background elements inspired by Hero section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 70, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-blue-200 blur-3xl opacity-15"
          animate={{
            x: [0, -40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ y: y2 }}
        />
        {/* Subtle tech pattern overlay */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2390cdf4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-10 relative z-10 border border-gray-100/20"
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-blue-900 tracking-tight">
            {isForgot
              ? "Reset Password"
              : isLogin
              ? "Welcome Back"
              : "Get Started"}
          </h1>
          <p className="text-blue-900/70 text-base mt-3 leading-relaxed">
            {isForgot
              ? "Enter your username to reset your password"
              : isLogin
              ? "Sign in to access Teeny Tech Trek"
              : "Create an account to join Teeny Tech Trek"}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-blue-900/80 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 h-5 w-5" />
              <input
                type="text"
                id="username"
                value={form.username}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-3 w-full bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-blue-900/50 text-blue-900"
                placeholder="Your username"
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {!isForgot && !isLogin && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-blue-900/80 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-3 w-full bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-blue-900/50 text-blue-900"
                    placeholder="you@example.com"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isForgot && (
              <motion.div
                key="password"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-blue-900/80 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-12 py-3 w-full bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-blue-900/50 text-blue-900"
                    placeholder="Enter password"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isForgot && !isLogin && (
              <motion.div
                key="confirmPassword"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-blue-900/80 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-3 w-full bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-blue-900/50 text-blue-900"
                    placeholder="Confirm password"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-medium text-base shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {loading
              ? "Processing..."
              : isForgot
              ? "Reset Password"
              : isLogin
              ? "Log In"
              : "Sign Up"}
          </motion.button>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
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
          </motion.div>
        </form>

        <div className="mt-8 text-center text-sm text-blue-900/70 space-y-4">
          <AnimatePresence>
            {!isForgot && (
              <motion.button
                key="forgot"
                onClick={() => setIsForgot(true)}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                Forgot password?
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isForgot ? (
              <motion.button
                key="back"
                onClick={() => setIsForgot(false)}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                Back to Login
              </motion.button>
            ) : (
              <motion.p
                key="toggle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <motion.button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isLogin ? "Sign up" : "Log in"}
                </motion.button>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;