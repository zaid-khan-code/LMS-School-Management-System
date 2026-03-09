"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Pin, Plus, Megaphone } from "lucide-react";
import { formatDate } from "@/lib/utils";

const announcements = [
  { id: "1", title: "School Winter Break Dates", content: "Dear students and parents, please note that winter break will be from December 21 to January 5. Classes resume January 6, 2026. Have a wonderful holiday season!", author: "Principal Williams", role: "Principal", priority: "high" as const, date: "2025-12-08", pinned: true },
  { id: "2", title: "Science Fair Registration Open", content: "Annual Science Fair registration is now open for all Grade 8-12 students. Submit your project proposals by December 15. This year's theme is 'Sustainability & Innovation'.", author: "Ms. Thompson", role: "Science Dept.", priority: "medium" as const, date: "2025-12-07", pinned: false },
  { id: "3", title: "Parent-Teacher Conferences — Dec 14", content: "Parent-teacher conferences are scheduled for December 14 from 3:00 PM to 7:00 PM. Please book your 15-minute slots via the parent portal.", author: "Administration", role: "Admin", priority: "high" as const, date: "2025-12-06", pinned: false },
  { id: "4", title: "New Library Books Available", content: "The school library has received 150 new books across all subjects. Students can now browse and borrow the new collection from the library portal.", author: "Mr. Anderson", role: "Librarian", priority: "low" as const, date: "2025-12-05", pinned: false },
  { id: "5", title: "Upcoming Basketball Tournament", content: "Our school basketball team will be competing in the Regional Tournament on December 18-20. Come show your support! Home games are free admission for students.", author: "Coach Davis", role: "Sports Dept.", priority: "medium" as const, date: "2025-12-04", pinned: false },
];

const priorityConfig = {
  high: { label: "Important", variant: "destructive" as const },
  medium: { label: "General", variant: "default" as const },
  low: { label: "Info", variant: "secondary" as const },
};

export default function AnnouncementsPage() {
  const [open, setOpen] = useState(false);
  const pinned = announcements.filter((a) => a.pinned);
  const rest = announcements.filter((a) => !a.pinned);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-sm text-muted-foreground">Stay updated with school news and events</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4" />New Announcement</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Announcement</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-1.5"><Label>Title</Label><Input placeholder="Announcement title…" /></div>
              <div className="space-y-1.5"><Label>Content</Label><textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none h-28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Write your announcement…" /></div>
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}><Megaphone className="h-4 w-4" />Publish</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <Pin className="h-3 w-3" />Pinned
          </div>
          {pinned.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} pinned />
          ))}
        </div>
      )}

      {/* All */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <Bell className="h-3 w-3" />Recent
        </div>
        {rest.map((a) => <AnnouncementCard key={a.id} announcement={a} />)}
      </div>
    </div>
  );
}

function AnnouncementCard({ announcement: a, pinned = false }: { announcement: typeof announcements[0]; pinned?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = priorityConfig[a.priority];

  return (
    <Card className={`cursor-pointer hover:shadow-sm transition-shadow ${pinned ? "border-primary/30 bg-primary/3" : ""}`} onClick={() => setExpanded(!expanded)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {a.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm">{a.title}</h3>
              <Badge variant={cfg.variant} className="text-xs">{cfg.label}</Badge>
              {pinned && <Badge variant="outline" className="text-xs"><Pin className="h-2.5 w-2.5 mr-1" />Pinned</Badge>}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span className="font-medium">{a.author}</span>
              <span>·</span>
              <span>{a.role}</span>
              <span>·</span>
              <span>{formatDate(a.date)}</span>
            </div>
            <p className={`text-sm text-muted-foreground mt-2 leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}>
              {a.content}
            </p>
            {!expanded && <button className="text-xs text-primary mt-1">Read more</button>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
