"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useAuthContext } from "@/context/AuthContext";
import { translations as T, tx } from "@/lib/translations";
import { User, Camera, Languages, Type, Check, X, LogOut, Crown, Zap, ChevronRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import Image from "next/image";

interface UserSettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserSettingsPanel({ isOpen, onClose }: UserSettingsPanelProps) {
    const { lang, setLang } = useLanguage();
    const { user, signOut } = useAuthContext();
    const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Apply font size globally
    useEffect(() => {
        const root = document.documentElement;
        if (fontSize === "small") root.style.fontSize = "14px";
        else if (fontSize === "large") root.style.fontSize = "18px";
        else root.style.fontSize = "16px";
    }, [fontSize]);

    // Fetch avatar URL if exists
    useEffect(() => {
        async function loadProfile() {
            if (!user) return;
            const { data } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single();
            if (data?.avatar_url) {
                setAvatarUrl(data.avatar_url);
            }
        }
        loadProfile();
    }, [user, supabase]);


    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = event.target.files?.[0];
            if (!file || !user) return;

            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            const newAvatarUrl = data.publicUrl;

            // Update profile
            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({ id: user.id, avatar_url: newAvatarUrl });

            if (updateError) throw updateError;

            setAvatarUrl(newAvatarUrl);
            toast.success(lang === 'en' ? 'Profile picture updated!' : 'Profil rasmi yangilandi!');
        } catch (error) {
            toast.error(lang === 'en' ? 'Error uploading image' : 'Rasm yuklashda xatolik yuz berdi');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={panelRef}
                    initial={{ opacity: 0, x: -30, y: -20, scale: 0.8, transformOrigin: 'top left' }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, y: -20, scale: 0.8 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute left-[70px] top-[70px] w-72 bg-white/40 backdrop-blur-[40px] backdrop-saturate-150 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60 z-[120] overflow-hidden flex flex-col ring-1 ring-white/50"
                >
                    {/* Header / Avatar Section */}
                    <div className="bg-white/40 p-5 border-b border-white/50 relative">
                        <button onClick={onClose} className="absolute right-3 top-3 text-slate-500 hover:text-slate-800 bg-white/60 hover:bg-white p-1 rounded-full transition-all backdrop-blur-md shadow-sm border border-white/60">
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col items-center gap-3">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 to-blue-500 p-[2px] shadow-md">
                                    <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center relative">
                                        {avatarUrl ? (
                                            <Image src={avatarUrl} alt="Avatar" width={60} height={60} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="text-slate-400 w-8 h-8" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            {uploading ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Camera className="text-white w-5 h-5" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                            </div>
                            <div className="text-center">
                                <h4 className="font-extrabold text-slate-900 text-lg leading-tight tracking-tight drop-shadow-sm">
                                    {user?.email?.split('@')[0] || "User"}
                                </h4>
                                <p className="text-xs text-slate-600 font-semibold mt-0.5">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 flex flex-col gap-1">
                        {/* Language Selection */}
                        <div className="p-3 bg-white/50 backdrop-blur-xl rounded-2xl shadow-sm border border-white/60">
                            <div className="flex items-center gap-2 mb-2.5 text-[11px] font-black tracking-wider text-slate-700 uppercase">
                                <Languages className="w-4 h-4 text-slate-500" />
                                {lang === 'en' ? "Language" : "Tilni tanlash"}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setLang("en")}
                                    className={`flex items-center justify-center py-2 px-3 rounded-xl text-sm font-medium transition-all ${lang === 'en' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md border border-blue-400' : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-white/60 shadow-sm backdrop-blur-sm'}`}
                                >
                                    English {lang === 'en' && <Check className="w-3.5 h-3.5 ml-1.5" />}
                                </button>
                                <button
                                    onClick={() => setLang("uz")}
                                    className={`flex items-center justify-center py-2 px-3 rounded-xl text-sm font-medium transition-all ${lang === 'uz' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md border border-blue-400' : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-white/60 shadow-sm backdrop-blur-sm'}`}
                                >
                                    O'zbek {lang === 'uz' && <Check className="w-3.5 h-3.5 ml-1.5" />}
                                </button>
                            </div>
                        </div>

                        {/* Font Size Selection */}
                        <div className="p-3 bg-white/50 backdrop-blur-xl rounded-2xl shadow-sm border border-white/60">
                            <div className="flex items-center gap-2 mb-2.5 text-[11px] font-black tracking-wider text-slate-700 uppercase">
                                <Type className="w-4 h-4 text-slate-500" />
                                {lang === 'en' ? "Text Size" : "Shrift o'lchami"}
                            </div>
                            <div className="flex bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl overflow-hidden relative shadow-inner">
                                <div
                                    className="absolute inset-y-0 bg-gradient-to-r from-orange-400/90 to-orange-500/90 shadow-md backdrop-blur-md transition-all duration-300 ease-out border border-white/20"
                                    style={{
                                        left: fontSize === 'small' ? '0%' : fontSize === 'medium' ? '33.33%' : '66.66%',
                                        width: '33.33%',
                                        borderRadius: '0.75rem'
                                    }}
                                />
                                {[
                                    { id: 'small', label: 'A-' },
                                    { id: 'medium', label: 'A' },
                                    { id: 'large', label: 'A+' }
                                ].map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setFontSize(size.id as any)}
                                        className={`flex-1 py-1.5 text-center relative z-10 transition-colors duration-300 ${fontSize === size.id ? 'text-white font-bold drop-shadow-md' : 'text-slate-700 hover:bg-white/60'} text-base font-semibold font-serif`}
                                    >
                                        <span>{size.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Premium / Upgrade Section (Moved to bottom) */}
                        <div className="mt-1 p-3 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden group">
                            <div className="flex items-center justify-between gap-3 relative z-10">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <div className="p-1 bg-indigo-500 rounded-md">
                                            <Crown className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-[9px] font-bold tracking-widest text-indigo-600 uppercase">PRO PLAN</span>
                                    </div>
                                    <h5 className="text-slate-800 font-bold text-[13px] tracking-tight">Expand Learning</h5>
                                </div>
                                <button className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-sm">
                                    {lang === 'en' ? "Upgrade" : "Yangilash"}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
