import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser, fetchUserProjects } from "@/db/fetch";

export default async function DashboardLayout({ children }) {
    const user = await getCurrentUser();
    const projects = await fetchUserProjects();
    // const user = []
    // const projects = []
    return (
        <SidebarProvider>
            <AppSidebar user={user} projects={projects} />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
