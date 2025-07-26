import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DraftingCompass, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { fetchUserProjects } from "@/db/fetch"

export default async function Page() {
  const projects = await fetchUserProjects();
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
            {/* Title with better typography */}
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your Projects
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