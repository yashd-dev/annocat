"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchProjectDetailsById, updateCapture } from "@/db/fetch";
import { toast } from "sonner";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote, Code, Undo, Redo } from 'lucide-react';


export default function EditCapturePage({ params }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const awaitedParams = React.use(params);
    const projectId = awaitedParams.id;
    const captureId = searchParams.get("capture");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [initialData, setInitialData] = useState(null);
    const [formState, setFormState] = useState({});

    // Initialize editor without content first
    const editor = useEditor({
        extensions: [StarterKit],
        content: '', // Start empty
        editorProps: {
            attributes: {
                class: 'prose prose-sm focus:outline-none min-h-[200px] p-4 dark:prose-invert',
            },
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const project = await fetchProjectDetailsById(projectId);
                const capture = project.captures.find(c => c.id === captureId);
                if (!capture) throw new Error("Capture not found");

                setInitialData(capture);
                setFormState({
                    url: capture.url || "",
                    screenshotUrl: capture.screenshotUrl || "",
                    pageTitle: capture.pageTitle || "",
                    selector: capture.selector || "",
                });
            } catch (err) {
                setError(err.message || "Failed to load capture");
            }
        }
        fetchData();
    }, [projectId, captureId]);

    // Separate useEffect to set editor content after both editor and data are ready
    useEffect(() => {
        if (editor && initialData) {
            // Set content after editor is initialized and data is loaded
            editor.commands.setContent(initialData.notes || "");
        }
    }, [editor, initialData]);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!initialData) return;

        const notes = editor?.getHTML() || '';

        // Check for changes
        const hasChanges =
            formState.url !== initialData.url ||
            formState.screenshotUrl !== initialData.screenshotUrl ||
            formState.pageTitle !== initialData.pageTitle ||
            formState.selector !== initialData.selector ||
            notes !== (initialData.notes || '');

        if (!hasChanges) {
            toast.info("No changes to save");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await updateCapture(captureId, {
                url: formState.url,
                screenshotUrl: formState.screenshotUrl,
                pageTitle: formState.pageTitle,
                selector: formState.selector,
                notes,
            });
            toast.success("Capture updated!");
            setTimeout(() => {
                router.push(`/dashboard/${projectId}`);
            }, 1000);
        } catch (err) {
            setError(err?.message || "Failed to update capture");
            toast.error("Failed to update capture");
        } finally {
            setLoading(false);
        }
    };

    if (!initialData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background p-4">
                <Card className="w-full max-w-2xl shadow-lg border">
                    <CardHeader>
                        <CardTitle className="text-center">Edit Capture</CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-6 text-center">Loading...</CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-2xl shadow-lg border">
                <CardHeader>
                    <CardTitle className="text-center">Edit Capture</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium mb-1">Page URL</label>
                            <Input
                                id="url"
                                name="url"
                                value={formState.url}
                                onChange={handleChange}
                                required
                                className="bg-background"
                            />
                        </div>
                        <div>
                            <label htmlFor="screenshotUrl" className="block text-sm font-medium mb-1">Screenshot URL</label>
                            <Input
                                id="screenshotUrl"
                                name="screenshotUrl"
                                value={formState.screenshotUrl}
                                onChange={handleChange}
                                required
                                className="bg-background"
                            />
                        </div>
                        <div>
                            <label htmlFor="pageTitle" className="block text-sm font-medium mb-1">Page Title</label>
                            <Input
                                id="pageTitle"
                                name="pageTitle"
                                value={formState.pageTitle}
                                onChange={handleChange}
                                className="bg-background"
                            />
                        </div>
                        <div>
                            <label htmlFor="selector" className="block text-sm font-medium mb-1">CSS Selector</label>
                            <Input
                                id="selector"
                                name="selector"
                                value={formState.selector}
                                onChange={handleChange}
                                className="bg-background"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Notes</label>
                            <div className="border rounded-md bg-background">
                                {editor ? (
                                    <>
                                        <MenuBar editor={editor} />
                                        <EditorContent
                                            editor={editor}
                                            className="min-h-[200px] max-h-[400px] overflow-y-auto"
                                        />
                                    </>
                                ) : (
                                    <div className="p-4 text-muted-foreground">Loading editor...</div>
                                )}
                            </div>
                        </div>
                        {error && (
                            <div className="text-destructive text-sm font-medium">{error}</div>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b p-2 flex gap-1 flex-wrap">
            <Button
                type="button"
                variant={editor.isActive('bold') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive('italic') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive('code') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <Code className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <Button
                type="button"
                variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
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
