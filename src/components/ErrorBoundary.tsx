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
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FB] p-6 text-center">
                    <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 flex flex-col items-center">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        
                        <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Something went wrong</h2>
                        <p className="text-slate-500 mb-4 font-medium text-sm leading-relaxed">
                            We've encountered an unexpected error. Don't worry, your progress is likely safe.
                        </p>
                        
                        {this.state.error && (
                            <div className="w-full bg-red-50 text-red-600 text-xs p-4 rounded-lg mb-8 text-left overflow-auto max-h-32 font-mono">
                                {this.state.error.toString()}
                            </div>
                        )}

                        <div className="flex flex-col w-full gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                            >
                                <RefreshCcw className="w-4 h-4" />
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
