"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
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
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={cn(
                        "relative z-10 w-full max-w-[850px] shadow-2xl bg-white rounded-[2rem] overflow-hidden flex min-h-[580px]",
                        "before:content-[''] before:absolute before:w-[1500px] before:h-[1500px] lg:before:h-[2000px] lg:before:w-[2000px] before:top-[-10%] before:right-[48%] before:z-[6] before:rounded-[50%] before:-translate-y-1/2 before:bg-black before:transition-all before:duration-[1.8s] ease-in-out",
                        !isLogin ? "before:translate-x-full before:right-[52%]" : ""
                    )}
                >
                    <button
                        onClick={closeModal}
                        className="absolute right-6 top-6 z-[70] rounded-full p-2 text-black/20 hover:text-black transition-all"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* --- FORMS SIDE --- */}
                    <div className="absolute w-full h-full top-0 left-0">
                        <div className={cn(
                            "absolute top-1/2 left-1/2 grid grid-cols-1 z-[5] -translate-x-1/2 -translate-y-1/2 w-1/2 transition-all duration-700 ease-in-out",
                            !isLogin ? "left-1/4" : "left-3/4"
                        )}>
                            
                            {/* Sign In Form */}
                            <div className={cn(
                                "flex items-center justify-center flex-col transition-all duration-200 delay-700 col-start-1 col-end-2 row-start-1 row-end-2 px-12 z-20",
                                !isLogin ? "opacity-0 z-10" : "opacity-100"
                            )}>
                                <form onSubmit={(e) => handleAuth(e, 'login')} className="w-full max-w-sm space-y-6">
                                    <h1 className="text-3xl font-playfair italic text-black mb-1 text-center">Welcome Back</h1>
                                    <p className="text-xs text-black/40 text-center mb-8 uppercase tracking-widest">Sign in to your account</p>
                                    
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/5 rounded-xl py-4 pt-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/20 transition-all" required />
                                        </div>
                                        <div className="relative">
                                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/5 rounded-xl py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/20 transition-all" required />
                                        </div>
                                        <div className="text-center pt-2">
                                            <button type="button" className="text-[9px] text-black/20 hover:text-black uppercase tracking-[0.3em] font-bold transition-colors">Forgot your password?</button>
                                        </div>
                                        <button type="submit" disabled={loading} className="w-full bg-black text-white rounded-xl py-4 font-bold uppercase tracking-widest text-[10px] hover:shadow-xl hover:translate-y-[-1px] active:translate-y-0 transition-all disabled:opacity-50 mt-4">Sign In</button>
                                    </div>
                                </form>
                            </div>

                            {/* Sign Up Form */}
                            <div className={cn(
                                "flex items-center justify-center flex-col transition-all duration-200 delay-700 col-start-1 col-end-2 row-start-1 row-end-2 px-12 z-10 opacity-0",
                                !isLogin ? "opacity-100 z-20" : ""
                            )}>
                                <form onSubmit={(e) => handleAuth(e, 'register')} className="w-full max-w-sm space-y-6">
                                    <h1 className="text-3xl font-playfair italic text-black mb-1 text-center">Create Account</h1>
                                    <p className="text-xs text-black/40 text-center mb-8 uppercase tracking-widest">Sign up to get started</p>
                                    
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/5 rounded-xl py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/20 transition-all" required />
                                        </div>
                                        <div className="relative">
                                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/5 rounded-xl py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/20 transition-all" required />
                                        </div>
                                        <div className="flex items-start text-[10px] text-black/40 px-2 uppercase tracking-widest font-bold leading-relaxed pt-2">
                                            <label className="flex items-start gap-3 cursor-pointer hover:text-black underline underline-offset-4 decoration-black/10">
                                                <input type="checkbox" className="rounded mt-0.5" required />
                                                Agree to terms & privacy
                                            </label>
                                        </div>
                                        <button type="submit" disabled={loading} className="w-full bg-black text-white rounded-xl py-4 font-bold uppercase tracking-widest text-[10px] hover:shadow-xl hover:translate-y-[-1px] active:translate-y-0 transition-all disabled:opacity-50">Create Account</button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>

                    {/* --- TOGGLE PANELS --- */}
                    <div className="absolute h-full w-full top-0 left-0 grid grid-cols-2 pointer-events-none">
                        
                        {/* New here Panel */}
                        <div className={cn(
                            "flex flex-col items-center justify-center text-center z-[7] px-12 transition-all duration-[1.1s] ease-in-out delay-400",
                            !isLogin ? "translate-x-[-800px] opacity-0" : "translate-x-0 opacity-100"
                        )}>
                            <div className="max-w-[280px]">
                                <h3 className="text-3xl font-playfair italic text-white mb-4">New here?</h3>
                                <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] leading-relaxed mb-10">Sign up and discover<br/>the master English experience</p>
                                <button
                                    className="pointer-events-auto border-2 border-white/10 px-12 py-3 rounded-full hover:bg-white hover:text-black transition-all font-bold uppercase text-[10px] tracking-[0.4em] text-white"
                                    onClick={() => setIsLogin(false)}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>

                        {/* One of us Panel */}
                        <div className={cn(
                            "flex flex-col items-center justify-center text-center z-[7] px-12 transition-all duration-[1.1s] ease-in-out delay-400",
                            isLogin ? "translate-x-[800px] opacity-0" : "translate-x-0 opacity-100"
                        )}>
                            <div className="max-w-[280px]">
                                <h3 className="text-3xl font-playfair italic text-white mb-4">One of us?</h3>
                                <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] leading-relaxed mb-10">Sign in to your account<br/>to continue your journey</p>
                                <button
                                    className="pointer-events-auto border-2 border-white/10 px-12 py-3 rounded-full hover:bg-white hover:text-black transition-all font-bold uppercase text-[10px] tracking-[0.4em] text-white"
                                    onClick={() => setIsLogin(true)}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}


