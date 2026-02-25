"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SubscriptionState {
    isPro: boolean;
    isTrialing: boolean;
    trialDaysLeft: number;
    trialEndDate: Date | null;
    subscribe: () => void;
    cancelSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionState>({
    isPro: false,
    isTrialing: false,
    trialDaysLeft: 0,
    trialEndDate: null,
    subscribe: () => { },
    cancelSubscription: () => { },
});

export const useSubscription = () => useContext(SubscriptionContext);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
    const [isPro, setIsPro] = useState(false);
    const [isTrialing, setIsTrialing] = useState(false);
    const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
    const [trialDaysLeft, setTrialDaysLeft] = useState(0);

    // Load subscription state from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("subscription");
        if (stored) {
            const data = JSON.parse(stored);
            setIsPro(data.isPro || false);
            setIsTrialing(data.isTrialing || false);
            if (data.trialEndDate) {
                const endDate = new Date(data.trialEndDate);
                setTrialEndDate(endDate);
                const now = new Date();
                const diff = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                if (diff <= 0) {
                    // Trial ended — auto-convert to paid Pro
                    setIsTrialing(false);
                    setIsPro(true);
                    setTrialDaysLeft(0);
                    localStorage.setItem("subscription", JSON.stringify({
                        isPro: true,
                        isTrialing: false,
                        trialEndDate: data.trialEndDate,
                    }));
                } else {
                    setTrialDaysLeft(diff);
                }
            }
        }
    }, []);

    const subscribe = () => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 5);
        setIsPro(true);
        setIsTrialing(true);
        setTrialEndDate(endDate);
        setTrialDaysLeft(5);
        localStorage.setItem("subscription", JSON.stringify({
            isPro: true,
            isTrialing: true,
            trialEndDate: endDate.toISOString(),
        }));
    };

    const cancelSubscription = () => {
        setIsPro(false);
        setIsTrialing(false);
        setTrialEndDate(null);
        setTrialDaysLeft(0);
        localStorage.removeItem("subscription");
    };

    return (
        <SubscriptionContext.Provider value={{ isPro, isTrialing, trialDaysLeft, trialEndDate, subscribe, cancelSubscription }}>
            {children}
        </SubscriptionContext.Provider>
    );
}
