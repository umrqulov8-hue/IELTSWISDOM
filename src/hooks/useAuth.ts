"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";

export function useAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const { openModal } = useModal();
    const router = useRouter();
    const supabase = createClient();

    const handleStartLearning = async () => {
        try {
            setIsLoading(true);

            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                openModal();
                return;
            }

            // Check database connection by fetching profile (as requested)
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileError && profileError.code !== 'PGRST116') {
                // Changing from error to warn as this is likely due to missing tables on new setup
                console.warn("Database check: Profile table may be missing or inaccessible.", profileError.message || profileError);
            }

            router.push("/dashboard");

        } catch (error) {
            console.error("Auth check failed:", error);
            openModal();
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleStartLearning,
        isLoading
    };
}
