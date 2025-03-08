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
import { Skeleton } from "@/components/ui/skeleton";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const loadTags = async () => {
      try {
        const allTags = await getAllTags();
        setTags(allTags);
      } catch (error) {
        console.error("Failed to load tags:", error);
      } finally {
        setIsLoadingTags(false);
      }
    };
    loadTags();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    router.push(`/notes?search=${encodeURIComponent(e.target.value)}`);
  };

  const isActive = (href: string) => {
    return pathname === href.split("?")[0];
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 z-20 flex h-full flex-col border-r bg-background/95 backdrop-blur-sm transition-[width] duration-300 ease-in-out",
          isOpen ? "left-0 w-72" : "-left-72 md:left-0 md:w-20"
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className={cn("flex items-center gap-2", !isOpen && "md:w-full md:justify-center")}>
            <Book className="h-6 w-6 shrink-0 text-primary" />
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
                <Button 
                  className={cn(
                    "w-full transition-all gap-2 hover:bg-primary/90",
                    !isOpen && "md:w-10 md:px-0"
                  )}
                  variant="default"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className={cn("truncate", !isOpen && "md:hidden")}>New Note</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className={cn(isOpen && "md:hidden")}>
              Create new note
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Search */}
        <div className={cn("px-4 py-2", !isOpen && "md:px-2")}>
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={cn(
                "h-9 pl-9 pr-3 transition-all",
                !isOpen && "md:w-0 md:opacity-0 md:pointer-events-none"
              )}
            />
          </div>
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
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start transition-all hover:bg-accent/50",
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

            <Separator className="my-2" />

            {/* Tags Section */}
            <div className={cn("px-2 text-xs font-medium text-muted-foreground mb-2", !isOpen && "md:hidden")}>
              Tags
            </div>
            {isLoadingTags ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full rounded-md mx-2" />
              ))
            ) : tags.length > 0 ? (
              tags.map((tag) => (
                <Tooltip key={tag}>
                  <TooltipTrigger asChild>
                    <Link href={`/notes?tag=${encodeURIComponent(tag)}`}>
                      <Button
                        variant={isActive(`/notes?tag=${tag}`) ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start transition-all hover:bg-accent/50",
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
              ))
            ) : (
              <div className={cn(
                "px-4 py-2 text-sm text-muted-foreground",
                !isOpen && "md:hidden"
              )}>
                No tags found
              </div>
            )}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-2">
          <div className={cn(
            "flex items-center justify-between text-xs text-muted-foreground px-2",
            !isOpen && "md:hidden"
          )}>
            <span>Theme:</span>
            <span className="capitalize">{theme}</span>
          </div>
        </div>
      </div>

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed left-4 top-3 z-40 transition-all hover:bg-accent",
          isOpen ? "md:left-72" : "md:left-20"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className={cn(
          "h-5 w-5 transition-transform",
          isOpen ? "rotate-90" : "rotate-0"
        )} />
      </Button>
    </>
  );
}