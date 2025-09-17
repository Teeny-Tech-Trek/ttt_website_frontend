  import React, { useState } from "react";
  import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
  import { toast } from "react-hot-toast";
  import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext";
  import { GoogleLogin } from "@react-oauth/google";
  import { CredentialResponse } from "@react-oauth/google";
  import { loginUser, registerUser, forgotPassword, googleLogin } from "../../services/authService";
  import Navbar from "../../components/layout/Navbar";

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
      <>
      <Navbar />
      <motion.div
        className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden font-sans bg-gray-50"
        style={{ opacity }}
      >
        {/* Animated background elements inspired by Hero section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute bg-blue-100 rounded-full top-1/4 left-1/5 w-80 h-80 blur-3xl opacity-20"
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
            className="absolute bg-blue-200 rounded-full bottom-1/3 right-1/5 w-96 h-96 blur-3xl opacity-15"
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
          className="relative z-10 w-full max-w-md p-10 border shadow-2xl bg-white/95 backdrop-blur-lg rounded-3xl border-gray-100/20"
        >
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-blue-900">
              {isForgot
                ? "Reset Password"
                : isLogin
                ? "Welcome Back"
                : "Get Started"}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-blue-900/70">
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
                className="block mb-2 text-sm font-semibold text-blue-900/80"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute w-5 h-5 text-blue-500 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  id="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full py-3 pl-10 pr-4 text-blue-900 transition-all border border-gray-200 bg-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-blue-900/50"
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
                    className="block mb-2 text-sm font-semibold text-blue-900/80"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-blue-500 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full py-3 pl-10 pr-4 text-blue-900 transition-all border border-gray-200 bg-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-blue-900/50"
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
                    className="block mb-2 text-sm font-semibold text-blue-900/80"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-blue-500 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full py-3 pl-10 pr-12 text-blue-900 transition-all border border-gray-200 bg-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-blue-900/50"
                      placeholder="Enter password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute text-blue-500 -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>

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
                    className="block mb-2 text-sm font-semibold text-blue-900/80"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-blue-500 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full py-3 pl-10 pr-4 text-blue-900 transition-all border border-gray-200 bg-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-blue-900/50"
                      placeholder="Confirm password"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base font-medium text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:shadow-xl hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              {/* <GoogleLogin
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
              /> */}
            </motion.div>
          </form>

          <div className="mt-8 space-y-4 text-sm text-center text-blue-900/70">
            <AnimatePresence>
              {!isForgot && (
                <motion.button
                  key="forgot"
                  onClick={() => setIsForgot(true)}
                  className="font-medium text-blue-600 transition-colors hover:text-blue-700"
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
                  className="block font-medium text-blue-600 transition-colors hover:text-blue-700"
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
                    className="font-medium text-blue-600 transition-colors hover:text-blue-700"
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
      </>
    );
  };

  export default AuthPage;