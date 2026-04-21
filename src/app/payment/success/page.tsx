"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/dashboard");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="mb-10 relative inline-block"
                >
                    <div className="absolute inset-0 bg-black/5 blur-3xl rounded-full" />
                    <div className="relative bg-white rounded-full p-6 shadow-2xl">
                        <CheckCircle2 size={120} strokeWidth={1} className="text-black" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40 mb-6">Payment Confirmed</h1>
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-6 leading-none">
                        To'lov muvaffaqiyatli qabul qilindi.
                    </h2>
                    <p className="text-xl text-black/50 font-medium mb-12 leading-relaxed">
                        To'lovingiz uchun rahmat! <br />
                        Sizning obunangiz 30 kunga faollashtirildi.
                    </p>

                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-black rounded-full text-white text-[11px] font-black uppercase tracking-[0.3em]">
                        <span>Dashboardga o'tilmoqda... {countdown}s</span>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>

                    <button 
                        onClick={() => router.push("/dashboard")}
                        className="block w-full mt-6 text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors"
                    >
                        Hozir o'tish
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
