"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useAuthContext } from "@/context/AuthContext";
import { translations as T, tx } from "@/lib/translations";
import { User, Camera, Languages, Type, Check, X, LogOut } from "lucide-react";
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
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-[80px] bottom-[20px] w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[120] overflow-hidden flex flex-col"
                >
                    {/* Header / Avatar Section */}
                    <div className="bg-gradient-to-br from-[#001F3F]/5 to-[#0074D9]/5 p-5 border-b border-slate-100 relative">
                        <button onClick={onClose} className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 bg-white/50 hover:bg-white p-1 rounded-full transition-colors backdrop-blur-sm">
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
                                <h4 className="font-bold text-slate-800 leading-tight">
                                    {user?.email?.split('@')[0] || "User"}
                                </h4>
                                <p className="text-xs text-slate-500">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 flex flex-col gap-1">
                        {/* Language Selection */}
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase">
                                <Languages className="w-3.5 h-3.5" />
                                {lang === 'en' ? "Language" : "Tilni tanlash"}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setLang("en")}
                                    className={`flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-all ${lang === 'en' ? 'bg-[#0074D9] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                                >
                                    English {lang === 'en' && <Check className="w-3.5 h-3.5 ml-1.5" />}
                                </button>
                                <button
                                    onClick={() => setLang("uz")}
                                    className={`flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-all ${lang === 'uz' ? 'bg-[#0074D9] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                                >
                                    O'zbek {lang === 'uz' && <Check className="w-3.5 h-3.5 ml-1.5" />}
                                </button>
                            </div>
                        </div>

                        {/* Font Size Selection */}
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase">
                                <Type className="w-3.5 h-3.5" />
                                {lang === 'en' ? "Text Size" : "Shrift o'lchami"}
                            </div>
                            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden relative">
                                <div
                                    className="absolute inset-y-0 bg-[#FF851B] transition-all duration-300 ease-out"
                                    style={{
                                        left: fontSize === 'small' ? '0%' : fontSize === 'medium' ? '33.33%' : '66.66%',
                                        width: '33.33%'
                                    }}
                                />
                                {[
                                    { id: 'small', label: '14px', icon: 'text-sm' },
                                    { id: 'medium', label: '16px', icon: 'text-base' },
                                    { id: 'large', label: '18px', icon: 'text-lg' }
                                ].map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setFontSize(size.id as any)}
                                        className={`flex-1 py-2 text-center relative z-10 transition-colors ${fontSize === size.id ? 'text-white font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        <span className={size.icon}>A</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Sign Out */}
                    <div className="p-3 border-t border-slate-100 mt-2 bg-rose-50/50">
                        <button
                            onClick={() => signOut()}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors font-medium text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            {lang === 'en' ? "Sign Out" : "Tizimdan chiqish"}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
