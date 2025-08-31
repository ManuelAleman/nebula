import { useAuth } from "@clerk/clerk-react";
import { createContext, useCallback, useEffect, useState, type ReactNode, type SetStateAction } from "react";
import { apiEndpoints } from "@/utils/apiEndpoints";
import { useApi } from "@/utils/api";
import toast from "react-hot-toast";

import type { Dispatch } from "react";

interface UserCreditsContextType {
    credits: number;
    loading: boolean;
    setCredits: Dispatch<SetStateAction<number>>;
    fetchUserCredits: () => Promise<void>;
    updateCredits:(newCredits: number) => void;
}
export const UserCreditsContext = createContext<UserCreditsContextType | undefined>(undefined);

interface UserCreditsProviderProps {
    children: ReactNode;
}
export const UserCreditsProvider = ({ children }: UserCreditsProviderProps) => {
    const [credits, setCredits] = useState(5);
    const [loading, setLoading] = useState(false);
    const { isSignedIn } = useAuth();

    const { apiPrivate } = useApi();

    const fetchUserCredits = useCallback(async () => {
        if (!isSignedIn) return;
        setLoading(true);
        try {
            const response = await apiPrivate.get(apiEndpoints.GET_CREDITS);
            if(response.status === 200) setCredits(response.data.credits);
            else toast.error('Unable to get the credits');
        } catch (err) {
            console.error('Error fetching the user credits', err);
        } finally {
            setLoading(false);
        }
    }, [isSignedIn, apiPrivate]);

    useEffect(() => {
        if(isSignedIn) fetchUserCredits();
    },[fetchUserCredits, isSignedIn]);

    const updateCredits = useCallback((newCredits : number) => {
        console.log('Updating credits', newCredits);
        setCredits(newCredits);
    },[])

    const contextValue: UserCreditsContextType = {
        credits,
        loading,
        setCredits,
        fetchUserCredits,
        updateCredits
    };
    return (
        <UserCreditsContext.Provider value={contextValue}>
            {children}
        </UserCreditsContext.Provider>
    )
}