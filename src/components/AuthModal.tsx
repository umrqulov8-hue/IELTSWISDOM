"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { Button } from "./Button";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function AuthModal() {
    const { isOpen, closeModal } = useModal();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log("Starting authentication process...", { isLogin, email });

        // Force Session Refresh: Clear any old session remnants
        await supabase.auth.signOut();

        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) {
                    // Smart Recovery: If login fails, try to sign up (if user doesn't exist)
                    if (error.message.includes("Invalid login credentials")) {
                        // Optional: could prompt user to sign up, but for now just error
                        console.error("Login Check Failed:", error);
                        toast.error(error.message);
                        throw error;
                    }
                    throw error;
                }
                console.log("Login Successful:", data);
                toast.success("Welcome back!");
                router.push("/dashboard");
                closeModal();
            } else {
                const { data: { user, session }, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                        // Force metadata to help with profile creation triggers
                        data: {
                            full_name: email.split('@')[0],
                        }
                    },
                });

                if (error) {
                    // Smart Recovery: If user already exists, try to log them in
                    if (error.message.includes("User already registered")) {
                        console.log("User exists, shedding to login...", error);
                        toast.info("Account exists. Logging you in...");

                        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                            email,
                            password,
                        });
                        if (loginError) {
                            toast.error("Could not log in automatically. Please check password.");
                            throw loginError;
                        }
                        router.push("/dashboard");
                        closeModal();
                        return;
                    }

                    console.error("Sign Up Check Failed:", error);
                    toast.error(error.message);
                    throw error;
                }

                // BYPASS LOGIC: Even if session is null (email confirm needed), we treat it as success if we can
                // Note: Supabase might block login until confirmed, but we can't force bypass without admin api.
                // However, we can improve the UX.

                if (user) {
                    console.log("User created:", user.id);

                    // Optimistic redirection - assumes profile trigger handles creation
                    toast.success("Account created! Redirecting...");

                    // If session exists, we are good. If not, we might be blocked by email confirm.
                    // But user asked to "Bypass". We can't strictly bypass Supabase security on client.
                    // Best effort: Redirect to welcome/dashboard. If middleware kicks them out, so be it, 
                    // but often local session is established if "Enable Email Confirm" is off in Supabase.

                    if (session) {
                        router.push("/welcome");
                        closeModal();
                    } else {
                        // If no session, they MUST confirm email. We can't hack this client side.
                        toast.info("Please check your email to verify your account.");
                        // Ideally, we'd auto-login here, but we can't without the token.
                    }
                }
            }
        } catch (err: any) {
            console.error("Auth Exception:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                    className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900/40"
                >
                    <button
                        onClick={closeModal}
                        className="absolute right-4 top-4 rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {isLogin ? "Welcome Back" : "Start Your Journey"}
                        </h2>
                        <p className="text-slate-200 text-sm">
                            {isLogin
                                ? "Enter your details to access your dashboard."
                                : "Create an account to start learning English today."}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 text-white placeholder:text-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 text-white placeholder:text-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-500/20 p-3 text-sm text-red-200 border border-red-500/30 text-center">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-secondary/20"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            ) : isLogin ? (
                                "Sign In"
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-300">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-bold text-secondary hover:underline"
                        >
                            {isLogin ? "Sign Up" : "Log In"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
