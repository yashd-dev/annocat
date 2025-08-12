import { Link as Linkie, Plus, Archive, MoreVertical, ExternalLink, Edit, Trash2, Folder, Globe, Code, Database, Settings, Briefcase, Image, FileText } from 'lucide-react';
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
import { fetchUserProjects, fetchAllCapturesForUser } from "@/db/fetch"
import CaptureCard from '@/components/cards';
import UrlInput from '@/components/urlinput';



export default async function Page() {
  const userProjects = await fetchUserProjects();
  const userCaptures = await fetchAllCapturesForUser();

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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <UrlInput userProjects={userProjects} />
              {userCaptures.map((project) => (
                <CaptureCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}