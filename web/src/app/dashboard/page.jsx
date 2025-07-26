import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
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
export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        <div className="flex flex-1 flex-col  gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          <div className="space-y-6 w-full md:max-w-7xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-xl font-medium tracking-tight">
                Your Projects
              </h2>
              <div className="flex items-center gap-x-2 md:gap-x-3">
                {/* New Organization Button */}
                <Button
                  asChild
                  size={"sm"}
                >
                  <Link href="/dashboard/new">
                    <span className="truncate">New Project</span>
                  </Link>
                </Button>

                {/* Search Input Container */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </div>
                  <Input
                    placeholder="Search for an Project"
                    className={"pl-10 w-full flex-1 md:w-64 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:opacity-80"}
                  />
                </div>
              </div>

              <div className="mx-auto grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                <Card>
                  <div className="flex flex-row gap-3 justify-around items-center w-full mx-auto px-4">
                    <div className="bg-white dark:bg-black rounded-full p-2 flex-shrink-0">
                      <DraftingCompass className="size-4" />
                    </div>
                    <CardHeader className="flex-1 p-0">
                      <CardTitle>
                        Adeon
                      </CardTitle>
                      <CardDescription>
                        A Developer Suite
                      </CardDescription>
                    </CardHeader>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
