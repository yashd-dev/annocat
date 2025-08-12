"use client";
import HeroHeader from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Github } from "lucide-react";

export default function Login() {
    const [loadingGithub, setLoadingGithub] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);

    const handleGithubLogin = async () => {
        setLoadingGithub(true);
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
            setLoadingGithub(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoadingGoogle(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
                errorCallbackURL: "/error",
            });
            toast.success("Login successful!");
        } catch {
            toast.error("Login failed. Please try again.");
        } finally {
            setLoadingGoogle(false);
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

                    {/* Google Login Button */}
                    <Button
                        onClick={handleGoogleLogin}
                        size="lg"
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                        disabled={loadingGoogle}
                    >
                        {loadingGoogle ? (
                            <>
                                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>

                    {/* GitHub Login Button */}
                    <Button
                        onClick={handleGithubLogin}
                        size="lg"
                        className="w-full flex items-center justify-center gap-3 bg-black hover:bg-zinc-800 text-white"
                        disabled={loadingGithub}
                    >
                        {loadingGithub ? (
                            <>
                                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            <>
                                <Github />
                                Continue with GitHub
                            </>
                        )}
                    </Button>
                </div>
            </section>
        </>
    );
}