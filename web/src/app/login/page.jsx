"use client";
import HeroHeader from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Github } from "lucide-react";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
                errorCallbackURL: "/error",
            });
            toast.success("Login successful!");
        } catch {
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeroHeader />
            <section className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground relative overflow-hidden">
                {/* Background shapes */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] opacity-30">
                    <img src="/shapes/1.svg" alt="" className="hidden lg:block w-full" />
                    <img src="/shapes/2.svg" alt="" className="lg:hidden w-full" />
                </div>

                {/* Login Card */}
                <div className="relative z-10 w-full max-w-md bg-card rounded-2xl shadow-lg p-8 space-y-6 text-center border">
                    <h1 className="font-extrabold text-3xl md:text-4xl text-teal-500">
                        Welcome to Annocat 🐈
                    </h1>
                    <p className="text-muted-foreground">
                        Please login to continue your journey.
                    </p>

                    <Button
                        onClick={handleLogin}
                        size="lg"
                        className="w-full flex items-center justify-center gap-3 bg-black hover:bg-zinc-800 text-white"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            <>
                                <Github></Github>
                                Continue with GitHub
                            </>
                        )}
                    </Button>
                </div>
            </section>
        </>
    );
}
