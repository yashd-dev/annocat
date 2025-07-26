import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import DeleteCapture from "@/components/deleteCapture";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchProjectDetailsById } from "@/db/fetch";
import SanitizedHTML from "@/components/SanitizedHTML";
import OpenLinks from "@/components/openLinks";

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
                    <OpenLinks captures={project.captures} projectId={project.id} />
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
                                        <div className="flex items-center justify-between mb-3 group">
                                            <h2 className="text-lg font-semibold text-foreground truncate flex-1 mr-3">
                                                {capture.pageTitle || capture.url || `Capture ${index + 1}`}
                                            </h2>
                                            <div className="flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <a
                                                            href={`/dashboard/${project.id}/edit?capture=${capture.id}`}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted/80 transition-colors duration-200 group/edit"
                                                        >
                                                            <Pencil size={14} className="text-muted-foreground group-hover/edit:text-blue-600 transition-colors duration-200" />
                                                        </a>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" align="center">
                                                        <p className="text-xs">Edit capture</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <DeleteCapture captureId={capture.id} projectId={project.id} />
                                            </div>
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