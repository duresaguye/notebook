"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Book,
  FileText,
  FolderOpen,
  Hash,
  Menu,
  PlusCircle,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllTags } from "@/lib/notes-storage";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const loadTags = async () => {
      const allTags = await getAllTags();
      setTags(allTags);
    };
    loadTags();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    router.push(`/notes?search=${e.target.value}`);
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300",
          isOpen ? "left-0 w-72" : "-left-72 md:left-0 md:w-20"
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className={cn("flex items-center gap-2", !isOpen && "md:w-full md:justify-center")}>
            <Book className="h-6 w-6 shrink-0" />
            <span className={cn("font-semibold truncate", !isOpen && "md:hidden")}>
              Notebook
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* New Note Button */}
        <div className="p-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/notes/new" className={cn(!isOpen && "md:w-full md:justify-center")}>
                <Button className={cn("w-full transition-all", !isOpen && "md:w-10 md:px-0")}>
                  <PlusCircle className="mr-2 h-4 w-4 md:mr-0" />
                  <span className={cn("truncate", !isOpen && "md:hidden")}>New Note</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className={cn(isOpen && "md:hidden")}>
              New Note
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Search */}
        <div className={cn("px-4 py-2", !isOpen && "md:px-2")}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={cn("h-8 transition-all", !isOpen && "md:w-0 md:opacity-0 md:pointer-events-none")}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className={cn(isOpen && "md:hidden")}>
              Search Notes
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 overflow-auto">
          <nav className="flex flex-col gap-1 p-2">
            {[
              { href: "/notes", icon: FileText, label: "All Notes" },
              { href: "/notes?view=folders", icon: FolderOpen, label: "Folders" },
            ].map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant={pathname === item.href.split("?")[0] ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start transition-all",
                        !isOpen && "md:justify-center md:px-0"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                      <span className={cn("truncate", !isOpen && "md:hidden")}>
                        {item.label}
                      </span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn(isOpen && "md:hidden")}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ))}

            <Separator className={cn("my-2", !isOpen && "md:my-1")} />

            {/* Tags Section */}
            <div className={cn("px-2 text-xs font-medium text-muted-foreground", !isOpen && "md:hidden")}>
              Tags
            </div>
            {tags.map((tag) => (
              <Tooltip key={tag}>
                <TooltipTrigger asChild>
                  <Link href={`/notes?tag=${tag}`}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start transition-all",
                        !isOpen && "md:justify-center md:px-0"
                      )}
                    >
                      <Hash className={cn("h-4 w-4", isOpen && "mr-2")} />
                      <span className={cn("truncate", !isOpen && "md:hidden")}>{tag}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn(isOpen && "md:hidden")}>
                  {tag}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>

          {/* Theme Indicator */}
          <div className={cn("p-2 text-xs text-muted-foreground", !isOpen && "md:hidden")}>
            Theme: {theme}
          </div>
        </ScrollArea>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed left-4 top-3 z-40 transition-all",
          isOpen ? "md:left-72" : "md:left-20"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <Menu className="h-5 w-5 rotate-90" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
    </>
  );
}