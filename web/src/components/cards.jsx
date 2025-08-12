"use client";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Link as Linkie, Plus, Archive, MoreVertical, ExternalLink, Edit, Trash2, Folder, Globe, Code, Database, Settings, Briefcase, Image, FileText } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// Helper function to get random color for project
const getRandomColor = () => {
    const colorClasses = [
        "fill-pink text-pink",
        "fill-orange text-orange",
        "fill-green text-green",
        "fill-blue text-blue",
        "fill-light-blue text-light-blue",
        "fill-purple text-purple",
        "fill-yellow text-yellow",
    ];

    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
};

// Client component for interactive features
const CaptureCard = ({ project }) => {
    "use client";
    const colorClass = getRandomColor();

    const handleEdit = () => {
        console.log('Edit capture:', project.id);
        // Add your edit logic here
    };

    const handleDelete = () => {
        console.log('Delete capture:', project.id);
        // Add your delete logic here
    };

    const handleOpenLink = () => {
        window.open(project.url, '_blank');
    };

    return (
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            {/* URL Bar Header */}
            <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
                {/* Three dots menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* URL Display - Fixed Width */}
                <div className="flex-1 mx-3">
                    <div className="bg-white rounded-md px-3 py-1 border border-gray-200 text-sm text-gray-600 font-mono truncate max-w-[300px] mx-auto text-center ">
                        {project.url}
                    </div>
                </div>

                {/* External link icon */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    onClick={handleOpenLink}
                >
                    <ExternalLink className="h-4 w-4 text-gray-600" />
                </Button>
            </div>

            {/* Project Info */}
            <div className="px-4 py-2 bg-gray-25 border-b flex items-center gap-2">
                <Folder className={`h-4 w-4 ${colorClass}`} />
                <span className="text-sm font-medium text-gray-700">{project.projectName}</span>
            </div>

            {/* Screenshot */}
            {project.screenshotUrl && (
                <div className="relative overflow-hidden">
                    <img
                        src={project.screenshotUrl}
                        alt={project.pageTitle}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                </div>
            )}

            {/* Content */}
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {project.pageTitle}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-2">
                    {project.notes}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default CaptureCard;