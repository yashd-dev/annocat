"use client";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCapture } from "@/db/fetch";

export default function DeleteCapture({ captureId, projectId }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await deleteCapture(captureId);
            toast.success("Capture deleted!");
            setTimeout(() => {
                router.refresh();
            }, 1000);
        } catch (err) {
            toast.error("Failed to delete capture");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(true)}
                        disabled={loading}
                        className="inline-flex items-center"
                        aria-label="Delete Capture"
                    >
                        <Trash2 size={16} className="text-red-500 hover:text-red-600 cursor-pointer" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                    Delete
                </TooltipContent>
            </Tooltip>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <div className="mb-4">Are you sure you want to delete this capture? This action cannot be undone.</div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
