"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createProject } from "@/db/fetch"; // must be 'use server' and take FormData
import { toast } from "sonner";

export default function ProjectForm() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (formData) => {
        try {
            const name = formData.get("name");
            const description = formData.get("description");

            await createProject({ name, description });

            toast.success("Project created successfully!");
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        } catch (err) {
            setError(err?.message || "Something went wrong");
            toast.error("Failed to create project");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md shadow-lg border">
                <CardHeader>
                    <CardTitle className="text-center">Let’s Create New Project</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <form
                        className="space-y-6"
                        action={handleSubmit}
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Project Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter project name"
                                required
                                className="bg-background"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Enter project description"
                                className="bg-background"
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm font-medium">{error}</div>
                        )}
                        <Button type="submit" className="w-full">
                            Create Project
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
