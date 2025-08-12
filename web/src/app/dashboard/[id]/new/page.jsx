"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createCapture } from "@/db/fetch";
import { toast } from "sonner";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Code,
    Undo,
    Redo,
} from "lucide-react";
import { useUploadFiles } from "better-upload/client";
import { UploadDropzoneProgress } from "@/components/ui/upload-dropzone-progress";

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="border-b p-2 flex gap-1 flex-wrap">
            <Button
                type="button"
                variant={editor.isActive("bold") ? "default" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive("italic") ? "default" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive("code") ? "default" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <Code className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <Button
                type="button"
                variant={editor.isActive("bulletList") ? "default" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive("orderedList") ? "default" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive("blockquote") ? "default" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
            >
                <Undo className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
            >
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default function NewCapturePage({ params }) {
    const { id: projectId } = React.use(params);
    const [errorr, setError] = useState("");
    const [useFileUpload, setUseFileUpload] = useState(false);
    const [uploadedFileUrl, setUploadedFileUrl] = useState("");
    const router = useRouter();

    const s3 = useUploadFiles({
        route: "demo",
        onUploaded: (files) => {
            console.log("onUploaded received files:", files);
            if (!files?.length) {
                console.warn("No files data received after upload!");
                return;
            }
            console.log("Uploaded file object:", files[0]);
        },
    });
    ``



    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm focus:outline-none min-h-[200px] p-4 dark:prose-invert",
            },
        },
        immediatelyRender: false,
    });

    const handleSubmit = async (formData) => {
        setError("");
        try {
            const url = formData.get("url");
            const pageTitle = formData.get("pageTitle");
            const selector = formData.get("selector");
            const notes = editor?.getHTML() || "";

            let screenshotUrl = "";

            if (useFileUpload) {
                // ✅ Ensure upload finished
                if (s3.isPending) {
                    toast.error("File upload is still in progress. Please wait.");
                    return;
                }

                if (!s3.isSettled || !s3.allSucceeded) {
                    toast.error("File upload failed or not completed.");
                    return;
                }

                if (!s3.uploadedFiles?.length) {
                    toast.error("No file found after upload.");
                    return;
                }

                const file = s3.uploadedFiles[0];
                if (!file.objectKey) {
                    toast.error("Uploaded file does not have an object key.");
                    return;
                }

                // Build public S3 URL
                screenshotUrl = `https://annocat.s3.ap-south-1.amazonaws.com/${file.objectKey}`;
            } else {
                screenshotUrl = formData.get("screenshotUrl");
                if (!screenshotUrl) {
                    toast.error("Screenshot URL is required.");
                    return;
                }
            }

            // ✅ Insert into DB
            const result = await createCapture({
                projectId,
                url,
                screenshotUrl,
                pageTitle,
                selector,
                notes,
            });

            if (!result || result.error) {
                throw new Error(result?.error || "Unknown error from DB");
            }

            toast.success("Capture added!");
            setTimeout(() => {
                router.push(`/dashboard/${projectId}`);
            }, 1000);
        } catch (err) {
            console.error("handleSubmit error:", err);
            setError(err?.message || "Something went wrong");
            toast.error("Failed to add capture");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-2xl shadow-lg border">
                <CardHeader>
                    <CardTitle className="text-center">Add New Capture</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-6">
                    <form className="space-y-6" action={handleSubmit}>
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium mb-1">
                                Page URL
                            </label>
                            <Input
                                id="url"
                                name="url"
                                placeholder="Enter page URL"
                                required
                                className="bg-background"
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    id="useFileUpload"
                                    checked={useFileUpload}
                                    onChange={(e) => setUseFileUpload(e.target.checked)}
                                />
                                <label
                                    htmlFor="useFileUpload"
                                    className="text-sm select-none cursor-pointer"
                                >
                                    I want to upload a screenshot instead of providing a URL
                                </label>
                            </div>

                            {!useFileUpload ? (
                                <div>
                                    <label
                                        htmlFor="screenshotUrl"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Screenshot URL
                                    </label>
                                    <Input
                                        id="screenshotUrl"
                                        name="screenshotUrl"
                                        placeholder="Enter screenshot URL"
                                        className="bg-background"
                                    />
                                </div>
                            ) : (
                                <UploadDropzoneProgress
                                    control={s3.control}
                                    accept="image/*"
                                    description={{
                                        maxFiles: 1,
                                        maxFileSize: "5MB",
                                        fileTypes: "JPEG, PNG, GIF",
                                    }}
                                />
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="pageTitle"
                                className="block text-sm font-medium mb-1"
                            >
                                Page Title
                            </label>
                            <Input
                                id="pageTitle"
                                name="pageTitle"
                                placeholder="Enter page title"
                                className="bg-background"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="selector"
                                className="block text-sm font-medium mb-1"
                            >
                                CSS Selector
                            </label>
                            <Input
                                id="selector"
                                name="selector"
                                placeholder="Enter CSS selector"
                                className="bg-background"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Notes</label>
                            <div className="border rounded-md bg-background">
                                <MenuBar editor={editor} />
                                <EditorContent
                                    editor={editor}
                                    className="min-h-[200px] max-h-[400px] overflow-y-auto"
                                />
                            </div>
                        </div>

                        {errorr && (
                            <div className="text-destructive text-sm font-medium">{errorr}</div>
                        )}

                        <Button type="submit" className="w-full">
                            Add Capture
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
