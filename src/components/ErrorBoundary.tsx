"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Something went wrong</h1>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            We've encountered an unexpected error. Don't worry, your progress is likely safe.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                            >
                                <RefreshCcw className="w-5 h-5" />
                                Refresh Page
                            </button>

                            <Link href="/dashboard" className="w-full">
                                <button className="w-full py-4 rounded-xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-[0.98]">
                                    <Home className="w-5 h-5" />
                                    Back to Dashboard
                                </button>
                            </Link>
                        </div>

                        {process.env.NODE_ENV === "development" && (
                            <div className="mt-8 p-4 bg-red-50 rounded-xl text-left overflow-auto max-h-40">
                                <p className="text-xs font-mono text-red-700 whitespace-pre">
                                    {this.state.error?.stack}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
