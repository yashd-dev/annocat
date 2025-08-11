import { Link as Linkie, Plus, Archive } from 'lucide-react';
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DraftingCompass, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { fetchUserProjects } from "@/db/fetch"
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default async function Page() {
  const projects = []
  const tags = ["Mega", "Awesome"]
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">
              Your Links
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className={" flex flex-col h-full justify-center"}>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">
                    Quickly Save a Link
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    Paste a link, and we'll instantly fetch its title, preview, and details for you—quick like magic!
                  </CardDescription>
                  <CardContent className="space-y-6 py-6 px-0">
                    {/* URL Input Section */}
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Linkie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="url"
                            placeholder="Enter URL here"
                            className="pl-10"
                          />
                        </div>
                        <Button
                          className="px-6"
                          variant="default"
                        >
                          Add Link
                        </Button>
                      </div>

                      {/* Add to Lot Button */}
                      <Button
                        variant="ghost"
                        className="w-fit justify-start text-muted-foreground hover:text-foreground font-normal"
                      >
                        <Archive className="w-4 h-4 mr-2" />
                        Add to Report
                      </Button>
                    </div>

                    <Separator />

                    {/* Tags Section */}
                    <div className="space-y-3">
                      {/* Existing tags */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Add Tag Button */}
                      <Button
                        variant="ghost"
                        className="justify-start text-muted-foreground hover:text-foreground h-auto py-2 font-normal"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tag
                      </Button>
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="space-y-6">
            {/* Title with better typography */}
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your Reports!
            </h1>

            {/* Actions bar */}
            <div className="flex items-center gap-3">
              <Button asChild size="sm">
                <Link href="/dashboard/new">
                  <span className="truncate font-medium">New Project</span>
                </Link>
              </Button>

              {/* Search Input Container */}
              <div className="relative flex-1 max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map(project => (
                <Card
                  key={project.id}
                  className="group transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:border-primary/50 cursor-pointer"
                >
                  <CardHeader className="">
                    <div className="flex items-start gap-3">
                      <div className="bg-muted rounded-lg p-1.5 flex-shrink-0">
                        <DraftingCompass className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-medium text-foreground mb-1 truncate">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}