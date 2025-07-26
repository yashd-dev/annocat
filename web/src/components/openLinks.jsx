"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Share2, ExternalLink } from "lucide-react";

export default function OpenLinks({ captures, projectId }) {
    // Get all unique URLs
    const urls = captures?.map(c => c.url).filter(Boolean) || [];
    const uniqueUrls = Array.from(new Set(urls));

    const handleOpenAll = () => {
        uniqueUrls.forEach(url => {
            window.open(url, '_blank');
        });
    };

    return (
        <div className="flex flex-wrap gap-2 justify-start">
            <Link href={`/dashboard/${projectId}/new`}>
                <Button variant="default">
                    <Plus size={16} className="mr-2" /> Add Capture
                </Button>
            </Link>
            <Link href={`/share/${projectId}`}>
                <Button variant="secondary">
                    <Share2 size={16} className="mr-2" /> Share Report
                </Button>
            </Link>
            <Button variant="outline" onClick={handleOpenAll} disabled={uniqueUrls.length === 0}>
                <ExternalLink size={16} className="mr-2" /> Open All Links
            </Button>
        </div>
    );
}
