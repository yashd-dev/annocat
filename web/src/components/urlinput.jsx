// components/UrlInput.jsx
"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link as LinkIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addCaptureFromUrl } from "@/lib/firecrawl"; // server action (use server)
import { Folder } from "lucide-react";

export default function UrlInput({ userProjects = [] }) {
  const router = useRouter();
  const [storedUrl, setStoredUrl] = useLocalStorage("lastUrl", "");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [loading, setLoading] = useState(false);

  // auto-select first project if available
  useEffect(() => {
    if (userProjects.length && !selectedProjectId) {
      setSelectedProjectId(userProjects[0].id);
    }
  }, [userProjects, selectedProjectId]);

  const colorClasses = [
    "fill-pink text-pink",
    "fill-orange text-orange",
    "fill-green text-green",
    "fill-blue text-blue",
    "fill-light-blue text-light-blue",
    "fill-purple text-purple",
    "fill-yellow text-yellow",
  ];

  const handleAdd = async () => {
    if (!storedUrl) {
      return; // or show toast
    }
    if (!selectedProjectId) {
      return; // or show toast
    }

    setLoading(true);
    try {
      await addCaptureFromUrl(storedUrl, selectedProjectId);
      setStoredUrl("");
      router.refresh(); // reload to show new capture
    } catch (err) {
      console.error("add capture error:", err);
      // optionally show toast / UI error
      alert(err?.message || "Failed to add capture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full justify-center">
      <CardHeader className="py-4">
        <CardTitle className="text-lg">Quickly Save a Link</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          Paste a link and choose a project/tag to save it into.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 py-6">
        {/* URL input + Add button */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1 ">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="url"
                placeholder="Enter URL here"
                className="pl-10"
                value={storedUrl}
                onChange={(e) => setStoredUrl(e.target.value)}
              />
            </div>

            <Button
              className="px-6"
              variant="default"
              onClick={handleAdd}
              disabled={!storedUrl || !selectedProjectId || loading}
            >
              {loading ? "Adding..." : "Add Link"}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Tags / project selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="text-sm text-muted-foreground">Save into</div>
            <a href="/dashboard/new">
              <Button variant="ghost" className="h-auto py-2 font-normal">
                <Plus className="w-4 h-4 mr-2" />
                Add Tag
              </Button>
            </a>
          </div>

          {userProjects.length === 0 ? (
            <div className="text-sm text-muted-foreground">No projects yet — create one first.</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userProjects.map((p, idx) => {
                const isSelected = selectedProjectId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer border transition-all ${isSelected
                      ? "ring-2 ring-offset-1 ring-foreground/40 border-transparent"
                      : "border-transparent hover:scale-[1.02]"
                      }`}
                  >
                    <Folder className={`w-4 h-4  ${colorClasses[idx % colorClasses.length]}`} />
                    <span className="text-sm font-medium">{p.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
