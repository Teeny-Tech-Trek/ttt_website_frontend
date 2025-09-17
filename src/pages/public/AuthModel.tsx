import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, User, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext.tsx";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import { loginUser, registerUser, forgotPassword, googleLogin } from "../../services/authService.ts";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const [isForgot, setIsForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setIsLogin(defaultMode === 'login');
      setIsForgot(false);
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isOpen, defaultMode]);

  // Handle escape key and body scroll
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
        onClose(); // Close modal on successful login
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

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const res = await googleLogin(credentialResponse.credential);
        const token = res.data.accessToken;
        login(token);
        toast.success("Google login successful");
        onClose(); // Close modal on successful login
      } catch (err: any) {
        toast.error(err.response?.data?.error || "Google login failed");
      }
    }
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Close function called'); // Debug log
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not child elements
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 cursor-pointer bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-gray-100/20 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Prevent backdrop close when clicking modal content
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute z-50 p-2 transition-all duration-200 bg-gray-100 rounded-full top-4 right-4 hover:bg-gray-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-200"
            type="button"
            aria-label="Close modal"
            style={{ pointerEvents: 'auto' }} // Ensure it's clickable
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
            <motion.div
              className="absolute w-32 h-32 bg-blue-100 rounded-full top-1/4 left-1/5 blur-2xl opacity-30"
              animate={{
                x: [0, 30, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-40 h-40 bg-blue-200 rounded-full bottom-1/3 right-1/5 blur-2xl opacity-20"
              animate={{
                x: [0, -20, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.div
            className="relative z-10 mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-blue-900">
              {isForgot
                ? "Reset Password"
                : isLogin
                ? "Welcome Back"
                : "Get Started"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-900/70">
              {isForgot
                ? "Enter your username to reset your password"
                : isLogin
                ? "Sign in to access Teeny Tech Trek"
                : "Create an account to join Teeny Tech Trek"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-semibold text-blue-900/80"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute w-4 h-4 text-blue-500 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  id="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="pl-9 pr-4 py-2.5 w-full bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-blue-900/50 text-blue-900 text-sm"
                  placeholder="Your username"
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {!isForgot && !isLogin && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-semibold text-blue-900/80"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute w-4 h-4 text-blue-500 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="pl-9 pr-4 py-2.5 w-full bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-blue-900/50 text-blue-900 text-sm"
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-semibold text-blue-900/80"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 text-blue-500 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="pl-9 pr-11 py-2.5 w-full bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-blue-900/50 text-blue-900 text-sm"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute text-blue-500 -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isForgot && !isLogin && (
                <motion.div
                  key="confirmPassword"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-semibold text-blue-900/80"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 text-blue-500 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="pl-9 pr-4 py-2.5 w-full bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-blue-900/50 text-blue-900 text-sm"
                      placeholder="Confirm password"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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

            {/* Google Login */}
            {!isForgot && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {/* Uncomment when you want to enable Google login */}
                {/* <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    toast.error("Google login failed");
                  }}
                  useOneTap
                /> */}
              </motion.div>
            )}
          </form>

          <div className="relative z-10 mt-6 space-y-3 text-sm text-center text-blue-900/70">
            <AnimatePresence>
              {!isForgot && (
                <motion.button
                  key="forgot"
                  onClick={() => setIsForgot(true)}
                  className="block mx-auto font-medium text-blue-600 transition-colors hover:text-blue-700"
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
                  className="block mx-auto font-medium text-blue-600 transition-colors hover:text-blue-700"
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
    </AnimatePresence>
  );
};

export default AuthModal;