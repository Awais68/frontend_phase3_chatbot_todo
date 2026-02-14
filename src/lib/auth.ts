import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "@prisma/client"

// Skip database initialization during build
const isBuilding = process.env.NEXT_PHASE === 'phase-production-build'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Only initialize Prisma if not building and DATABASE_URL is set
let prisma: PrismaClient | null = null;

if (!isBuilding && process.env.DATABASE_URL) {
    prisma = globalForPrisma.prisma ?? new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });

    if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = prisma;
    }
}

// Get production URLs
const getBaseURL = () => {
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
    }
    return process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
}

// Determine database provider based on PRISMA_DB_PROVIDER environment variable
const getDatabaseProvider = (): "sqlite" | "postgresql" | "mysql" | "cockroachdb" | "sqlserver" | "mongodb" => {
    const provider = process.env.PRISMA_DB_PROVIDER || "sqlite";
    // Only return valid Prisma provider types
    if (provider === "postgresql" || provider === "mysql" || provider === "sqlite" ||
        provider === "cockroachdb" || provider === "sqlserver" || provider === "mongodb") {
        return provider;
    }
    return "sqlite"; // fallback
}

export const auth = betterAuth({
    database: prisma ? prismaAdapter(prisma, {
        provider: getDatabaseProvider(),
    }) : undefined as any,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        sendEmailVerification: false, // Disable email verification for easier signup
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    secret: process.env.BETTER_AUTH_SECRET || "development-secret-change-in-production",
    baseURL: getBaseURL(),
    trustedOrigins: [
        "http://localhost:3005", // Current development port
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://192.168.100.7:3000", // Local network IP
        "http://192.168.100.7:3001",
        "http://192.168.100.7:3002",
        "http://192.168.100.7:3003",
        "http://192.168.100.7:3004",
        "http://192.168.100.7:3005",
        "https://todo-frontend.vercel.app", // Updated to match actual deployment URL
        "https://*.vercel.app",
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
        process.env.NEXT_PUBLIC_APP_URL || "",
    ].filter(Boolean),
})
