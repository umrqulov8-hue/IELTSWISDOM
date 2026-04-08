'use client';

import { useState, useRef } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export default function AvatarUploadPage() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<{ url: string } | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <DashboardLayout title="Upload Avatar" description="Upload a custom avatar image to your profile.">
            <div className="max-w-xl mx-auto bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-lg mt-10">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                        <UploadCloud className="w-10 h-10 text-orange-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">Upload Your Avatar</h1>
                <p className="text-center text-slate-500 mb-8">Choose an image from your computer to use as your profile picture.</p>

                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        setError(null);

                        if (!inputFileRef.current?.files) {
                            setError("No file selected.");
                            return;
                        }

                        const file = inputFileRef.current.files[0];
                        if (!file) {
                            setError("Please select a valid file.");
                            return;
                        }

                        setIsUploading(true);

                        try {
                            const response = await fetch(
                                `/api/avatar/upload?filename=\${file.name}`,
                                {
                                    method: 'POST',
                                    body: file,
                                },
                            );

                            if (!response.ok) {
                                throw new Error("Upload failed. Please try again.");
                            }

                            const newBlob = (await response.json());
                            setBlob(newBlob);
                        } catch (err: any) {
                            setError(err.message || "An error occurred during upload.");
                        } finally {
                            setIsUploading(false);
                        }
                    }}
                    className="flex flex-col gap-6"
                >
                    <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-orange-400 transition-colors bg-white hover:bg-orange-50/50 flex flex-col items-center justify-center cursor-pointer group">
                        <input
                            id="avatar-file-input"
                            name="file"
                            autoComplete="off"
                            ref={inputFileRef}
                            type="file"
                            required
                            accept="image/jpeg, image/png, image/webp"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <UploadCloud className="w-8 h-8 text-slate-600 group-hover:text-orange-500 transition-colors mb-2" />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">
                            Click to browse or drag & drop
                        </span>
                        <span className="text-xs text-slate-600 mt-1">JPEG, PNG, WEBP files up to 4.5MB</span>
                    </div>

                    {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 text-center">{error}</div>}

                    <button
                        type="submit"
                        disabled={isUploading}
                        className="bg-[#FF8C00] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isUploading ? "Uploading..." : "Upload Avatar"}
                    </button>
                </form>

                {blob && (
                    <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center">
                        <CheckCircle2 className="w-12 h-12 text-emerald-700 mb-2" />
                        <h3 className="font-bold text-emerald-800 mb-1">Upload Successful!</h3>
                        <p className="text-sm text-emerald-600 mb-4">Your avatar has been safely stored.</p>

                        <a
                            href={blob.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs break-all bg-white px-3 py-2 rounded-lg border border-emerald-200 text-emerald-700 hover:text-emerald-800 underline block"
                        >
                            {blob.url}
                        </a>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
