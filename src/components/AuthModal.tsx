"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import styles from "./AuthModal.module.css";
import { cn } from "@/lib/utils";

export function AuthModal() {
    const { isOpen, closeModal } = useModal();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent, type: 'login' | 'register') => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        await supabase.auth.signOut();

        try {
            if (type === 'login') {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Welcome back!");
                router.push("/dashboard");
                closeModal();
            } else {
                const { data: { user, session }, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                        data: {
                            full_name: email.split('@')[0],
                        }
                    },
                });

                if (error) {
                    if (error.message.includes("User already registered")) {
                        toast.info("Account exists. Logging you in...");
                        const { error: loginError } = await supabase.auth.signInWithPassword({
                            email,
                            password,
                        });
                        if (loginError) throw loginError;
                        router.push("/dashboard");
                        closeModal();
                        return;
                    }
                    throw error;
                }

                if (user) {
                    toast.success("Account created! Redirecting...");
                    if (session) {
                        router.push("/welcome");
                        closeModal();
                    } else {
                        toast.info("Please check your email to verify your account.");
                    }
                }
            }
        } catch (err: any) {
            console.error("Auth Exception:", err);
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={cn(
                        styles.container,
                        !isLogin && styles.active,
                        "relative z-10 w-full max-w-[850px] shadow-2xl"
                    )}
                >
                    <button
                        onClick={closeModal}
                        className="absolute right-6 top-6 z-50 rounded-full p-2 text-black/20 hover:text-black transition-all"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Login Form */}
                    <div className={cn(styles.form_box, styles.login)}>
                        <form onSubmit={(e) => handleAuth(e, 'login')} className="w-full px-4 md:px-12">
                            <h1 className="text-4xl font-black uppercase tracking-tighter text-black mb-8 italic">Wisdom</h1>

                            <div className="relative mb-6">
                                <input
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/5 rounded-full py-4 pl-14 pr-4 text-black focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/20 text-sm font-medium"
                                    required
                                />
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                            </div>

                            <div className="relative mb-2">
                                <input
                                    type="password"
                                    id="login-password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/5 rounded-full py-4 pl-14 pr-4 text-black focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/20 text-sm font-medium"
                                    required
                                />
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                            </div>

                            <div className="text-right mb-8">
                                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={styles.btn_form}
                            >
                                {loading && isLogin ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Sign In"}
                            </button>
                        </form>
                    </div>

                    {/* Registration Form */}
                    <div className={cn(styles.form_box, styles.register)}>
                        <form onSubmit={(e) => handleAuth(e, 'register')} className="w-full px-4 md:px-12">
                            <h1 className="text-4xl font-black uppercase tracking-tighter text-black mb-8 italic">Wisdom</h1>

                            <div className="relative mb-6">
                                <input
                                    type="email"
                                    id="register-email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/5 rounded-full py-4 pl-14 pr-4 text-black focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/20 text-sm font-medium"
                                    required
                                />
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                            </div>

                            <div className="relative mb-6">
                                <input
                                    type="password"
                                    id="register-password"
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/5 rounded-full py-4 pl-14 pr-4 text-black focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/20 text-sm font-medium"
                                    required
                                />
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={styles.btn_form}
                            >
                                {loading && !isLogin ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Create Account"}
                            </button>
                        </form>
                    </div>

                    {/* Sliding Toggle Overlay */}
                    <div className={styles.toggle_box}>
                        <div className={cn(styles.toggle_panel, styles.toggle_left)}>
                            <h1 className="text-4xl font-serif italic mb-2">Hello, Friend!</h1>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-12">New to the logic?</p>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={styles.btn_toggle}
                            >
                                Register
                            </button>
                        </div>

                        <div className={cn(styles.toggle_panel, styles.toggle_right)}>
                            <h1 className="text-4xl font-serif italic mb-2">Welcome Back!</h1>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-12">Ready to master?</p>
                            <button
                                onClick={() => setIsLogin(true)}
                                className={styles.btn_toggle}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

