"use client";
import HeroHeader from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Login() {

    return (
        <>
            <HeroHeader></HeroHeader>
            <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4">
                <div className="w-full max-w-sm space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-2">
                        <h1 className="font-medium text-2xl leading-tight font-most text-teal-500">
                            Welcome To Annocat 🐈
                        </h1>
                        <h3 className="text-muted-foreground">Please Login To Continue :)</h3>
                    </div>

                    {/* Button Section */}
                    <div className="space-y-4">
                        <Button
                            // variant="outline"
                            onClick={async () => {
                                await authClient.signIn.social({
                                    provider: "github",
                                    callbackURL: "/dashboard",
                                    errorCallbackURL: "/error",
                                });
                            }}
                            size={"lg"}
                            className={"w-full "}
                        // className="w-full py-6 px-4 text-base font-medium "
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="mr-3 bg-white rounded-full"
                            >
                                <path
                                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.848-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                    fill="#181717"
                                />
                            </svg>
                            Continue with GitHub
                        </Button>

                        <Button
                            variant="outline"
                            size={"lg"}
                            className="w-full py-6 px-4 text-base font-medium bg-white hover:bg-gray-50"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" className="mr-3">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
