"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SubscriptionState {
    isPro: boolean;
    subscribe: () => void;
    cancelSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionState>({
    isPro: false,
    subscribe: () => { },
    cancelSubscription: () => { },
});

export const useSubscription = () => useContext(SubscriptionContext);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
    const [isPro, setIsPro] = useState(false);

    // Load subscription state from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("subscription");
        if (stored) {
            const data = JSON.parse(stored);
            setIsPro(data.isPro || false);
        }
    }, []);

    const subscribe = () => {
        setIsPro(true);
        localStorage.setItem("subscription", JSON.stringify({
            isPro: true,
        }));
    };

    const cancelSubscription = () => {
        setIsPro(false);
        localStorage.removeItem("subscription");
    };

    return (
        <SubscriptionContext.Provider value={{ isPro, subscribe, cancelSubscription }}>
            {children}
        </SubscriptionContext.Provider>
    );
}
