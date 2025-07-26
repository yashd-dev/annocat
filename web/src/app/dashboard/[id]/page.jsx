import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchProjectDetailsById } from "@/db/fetch";
import Link from "next/link";
import SanitizedHTML from "@/components/SanitizedHTML";

export default async function ProjectDetailsPage({ params }) {
    const awaitedParams = await params;
    const { id } = awaitedParams;
    const project = await fetchProjectDetailsById(id);
    // Sort captures oldest to newest
    if (project.captures && project.captures.length > 0) {
        project.captures.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="mb-16">
                    <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                        {project.name}
                    </h1>
                    {project.description && (
                        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                            {project.description}
                        </p>
                    )}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                        <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                    {/* Add Capture Button */}
                    <div className="flex justify-end">
                        <Link href={`/dashboard/${project.id}/new`}>
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                                Add Capture
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Captures Section */}
                <div className="space-y-12">
                    {project.captures && project.captures.length > 0 ? (
                        project.captures.map((capture, index) => (
                            <Card key={capture.id} className="border-0 shadow-none bg-transparent p-0">
                                <CardContent className="p-0">
                                    {/* Capture Image */}
                                    <div className="mb-6">
                                        {capture.screenshotUrl ? (
                                            <img
                                                src={capture.screenshotUrl}
                                                alt={capture.pageTitle || 'Capture screenshot'}
                                                className="w-full rounded-lg border border-muted shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-full h-64 bg-muted border border-muted rounded-lg flex items-center justify-center">
                                                <div className="text-center text-muted-foreground">
                                                    <div className="text-4xl mb-2">📸</div>
                                                    <div className="text-sm">Screenshot not available</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Capture Metadata */}
                                    <div className="mb-4">
                                        {/* Small muted capture number above title */}
                                        <div className="text-xs text-muted-foreground mb-1">Capture {index + 1}</div>
                                        <div className="flex items-center mb-2">
                                            <h2 className="text-lg font-semibold text-foreground mr-2">
                                                {capture.pageTitle || capture.url || `Capture ${index + 1}`}
                                            </h2>
                                            <a href={`/dashboard/${project.id}/edit?capture=${capture.id}`}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <a href={`/dashboard/${project.id}/edit?capture=${capture.id}`} className="inline-flex items-center">
                                                            <Pencil size={10} className="text-blue-500 hover:text-blue-600 cursor-pointer" />
                                                        </a>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" align="center">
                                                        Edit
                                                    </TooltipContent>
                                                </Tooltip>
                                            </a>
                                        </div>
                                        <div className="text-sm text-muted-foreground mb-4">
                                            {capture.createdAt && new Date(capture.createdAt).toLocaleString()}
                                            {capture.url && (
                                                <>
                                                    <span className="mx-2">•</span>
                                                    <a href={capture.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                        {capture.url}
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Annotation */}
                                    {capture.notes && (
                                        <SanitizedHTML
                                            content={capture.notes}
                                            className="prose max-w-none text-foreground leading-relaxed whitespace-pre-wrap dark:prose-invert prose-teal"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-medium text-foreground mb-2">No captures yet</h3>
                            <p className="text-muted-foreground mb-6">Start capturing screenshots to build your project documentation.</p>
                            <a href={`/dashboard/${project.id}/new`}>
                                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                                    Create First Capture
                                </button>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}