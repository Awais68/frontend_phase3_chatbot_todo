import { createAuthClient } from "better-auth/react"

// Use window.location.origin for dynamic port support in development
const getBaseURL = () => {
    if (typeof window !== 'undefined') {
        // In browser, use the current origin
        return window.location.origin;
    } else {
        // On server, use environment variable or fallback
        // This should match the frontend app URL
        return process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:3005";
    }
};

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
});

export const { signIn, signUp, signOut, useSession } = authClient
