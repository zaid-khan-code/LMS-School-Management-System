"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Search, Send, Pencil, ChevronLeft, Star, StarOff,
  Trash2, Archive, Inbox, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  from: string;
  fromRole: string;
  initials: string;
  avatarColor: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  read: boolean;
  starred: boolean;
  archived: boolean;
  thread: { sender: string; body: string; time: string }[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    from: "Dr. Sarah Johnson",
    fromRole: "Mathematics Teacher",
    initials: "SJ",
    avatarColor: "bg-blue-500",
    subject: "Re: Question about integral assignment",
    preview: "Great question! For problem 3, you need to use the substitution method where u = sin(x)…",
    body: "Great question! For problem 3, you need to use the substitution method where u = sin(x), so du = cos(x) dx. This simplifies the integral to ∫ u du = u²/2 + C = sin²(x)/2 + C.\n\nLet me know if that helps!",
    time: "10:32 AM",
    read: false,
    starred: true,
    archived: false,
    thread: [
      { sender: "You", body: "Hi Dr. Johnson, I have a question about problem 3 on the integration assignment. Could you help me understand how to approach it?", time: "Yesterday 3:00 PM" },
      { sender: "Dr. Sarah Johnson", body: "Great question! For problem 3, you need to use the substitution method where u = sin(x), so du = cos(x) dx. This simplifies the integral to ∫ u du = u²/2 + C = sin²(x)/2 + C.\n\nLet me know if that helps!", time: "Today 10:32 AM" },
    ],
  },
  {
    id: "2",
    from: "Principal James Carter",
    fromRole: "School Principal",
    initials: "JC",
    avatarColor: "bg-purple-500",
    subject: "Winter Break Schedule & Important Reminders",
    preview: "Dear Students, I hope this message finds you well as we approach the end of the term…",
    body: "Dear Students,\n\nI hope this message finds you well as we approach the end of the term. A few important reminders:\n\n1. Last day of classes: December 20, 2025\n2. Exam period: December 15–19, 2025\n3. School reopens: January 6, 2026\n\nPlease ensure all outstanding assignments and fees are settled before the break.\n\nBest wishes,\nPrincipal Carter",
    time: "Yesterday",
    read: true,
    starred: false,
    archived: false,
    thread: [
      { sender: "Principal James Carter", body: "Dear Students,\n\nI hope this message finds you well as we approach the end of the term. A few important reminders:\n\n1. Last day of classes: December 20, 2025\n2. Exam period: December 15–19, 2025\n3. School reopens: January 6, 2026\n\nPlease ensure all outstanding assignments and fees are settled before the break.\n\nBest wishes,\nPrincipal Carter", time: "Yesterday 9:00 AM" },
    ],
  },
  {
    id: "3",
    from: "Ms. Emma Roberts",
    fromRole: "English Teacher",
    initials: "ER",
    avatarColor: "bg-green-500",
    subject: "Essay rubric clarification",
    preview: "The rubric has been updated on the portal. Main change: thesis clarity now carries 25% weight…",
    body: "The rubric has been updated on the portal. Main change: thesis clarity now carries 25% weight instead of 20%. Please make sure your essay has a clearly stated, arguable thesis in the introduction.\n\nIf you have further questions, office hours are Tuesday 2–4 PM, Room 203.",
    time: "Mon",
    read: true,
    starred: false,
    archived: false,
    thread: [
      { sender: "You", body: "Hi Ms. Roberts, could you clarify the grading rubric for the essay? Specifically around the thesis section.", time: "Sun 5:00 PM" },
      { sender: "Ms. Emma Roberts", body: "The rubric has been updated on the portal. Main change: thesis clarity now carries 25% weight instead of 20%. Please make sure your essay has a clearly stated, arguable thesis in the introduction.\n\nIf you have further questions, office hours are Tuesday 2–4 PM, Room 203.", time: "Mon 8:15 AM" },
    ],
  },
  {
    id: "4",
    from: "Mr. David Park",
    fromRole: "Computer Science Teacher",
    initials: "DP",
    avatarColor: "bg-cyan-500",
    subject: "Lab session postponed to Friday",
    preview: "Due to equipment maintenance in Lab 1, Thursday's practical session will move to Friday 3 PM…",
    body: "Due to equipment maintenance in Lab 1, Thursday's practical session will move to Friday 3 PM. The room will be Lab 2 instead.\n\nPlease bring your USB drives with your project files.\n\n— Mr. Park",
    time: "Mon",
    read: true,
    starred: false,
    archived: false,
    thread: [
      { sender: "Mr. David Park", body: "Due to equipment maintenance in Lab 1, Thursday's practical session will move to Friday 3 PM. The room will be Lab 2 instead.\n\nPlease bring your USB drives with your project files.\n\n— Mr. Park", time: "Mon 11:00 AM" },
    ],
  },
  {
    id: "5",
    from: "School Admin",
    fromRole: "Administration",
    initials: "SA",
    avatarColor: "bg-orange-500",
    subject: "Fee receipt — November 2025",
    preview: "Your payment of $850 has been received. Receipt #INV-2025-1104 attached.",
    body: "Your payment of $850 has been received and processed.\n\nReceipt: #INV-2025-1104\nDate: November 5, 2025\nAmount: $850.00\nMethod: Online Transfer\nStatus: Confirmed\n\nThank you.",
    time: "Nov 5",
    read: true,
    starred: true,
    archived: false,
    thread: [
      { sender: "School Admin", body: "Your payment of $850 has been received and processed.\n\nReceipt: #INV-2025-1104\nDate: November 5, 2025\nAmount: $850.00\nMethod: Online Transfer\nStatus: Confirmed\n\nThank you.", time: "Nov 5, 9:00 AM" },
    ],
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<string | null>("1");
  const [search, setSearch] = useState("");
  const [composing, setComposing] = useState(false);
  const [reply, setReply] = useState("");
  const [composeData, setComposeData] = useState({ to: "", subject: "", body: "" });
  const [filter, setFilter] = useState<"inbox" | "starred" | "archived">("inbox");

  const selectedMsg = messages.find((m) => m.id === selectedId) ?? null;
  const unreadCount = messages.filter((m) => !m.read && !m.archived).length;

  const visible = messages.filter((m) => {
    const inFilter =
      filter === "inbox" ? !m.archived :
      filter === "starred" ? m.starred :
      m.archived;
    const matchSearch =
      m.from.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    return inFilter && matchSearch;
  });

  const toggle = (id: string, field: "read" | "starred" | "archived") =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: !m[field] } : m))
    );

  const deleteMsg = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const sendReply = () => {
    if (!selectedId || !reply.trim()) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === selectedId
          ? {
              ...m,
              thread: [...m.thread, { sender: "You", body: reply.trim(), time: "Just now" }],
              preview: reply.trim().slice(0, 60) + "…",
            }
          : m
      )
    );
    setReply("");
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread` : "No unread messages"}
          </p>
        </div>
        <Button onClick={() => setComposing(true)}>
          <Pencil className="h-4 w-4" />
          Compose
        </Button>
      </div>

      <div className="flex flex-1 gap-0 rounded-xl border overflow-hidden min-h-0">
        {/* Sidebar */}
        <div className="w-72 shrink-0 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search…"
                className="pl-8 h-8 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex border-b text-xs">
            {([
              { key: "inbox", label: "Inbox", icon: Inbox },
              { key: "starred", label: "Starred", icon: Star },
              { key: "archived", label: "Archive", icon: Archive },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 py-2 font-medium transition-colors",
                  filter === key
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-3 w-3" />
                {label}
                {key === "inbox" && unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full px-1 text-xs">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y">
            {visible.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">No messages</div>
            ) : (
              visible.map((msg) => (
                <button
                  key={msg.id}
                  className={cn(
                    "w-full text-left px-3 py-3 hover:bg-accent transition-colors",
                    selectedId === msg.id && "bg-accent",
                    !msg.read && "bg-primary/5"
                  )}
                  onClick={() => {
                    setSelectedId(msg.id);
                    if (!msg.read) toggle(msg.id, "read");
                  }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <Avatar className="h-6 w-6 shrink-0">
                      <AvatarFallback className={cn("text-xs text-white", msg.avatarColor)}>
                        {msg.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className={cn("text-sm truncate flex-1", !msg.read && "font-semibold")}>
                      {msg.from}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">{msg.time}</span>
                  </div>
                  <p className={cn("text-xs truncate pl-8", !msg.read ? "font-medium" : "text-muted-foreground")}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-muted-foreground truncate pl-8 mt-0.5">{msg.preview}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message view */}
        <div className="flex-1 flex flex-col min-w-0">
          {composing ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold">New Message</h2>
                <Button variant="ghost" size="icon" onClick={() => setComposing(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 space-y-3 flex-1">
                <Input
                  placeholder="To: name@school.edu"
                  value={composeData.to}
                  onChange={(e) => setComposeData((p) => ({ ...p, to: e.target.value }))}
                />
                <Input
                  placeholder="Subject"
                  value={composeData.subject}
                  onChange={(e) => setComposeData((p) => ({ ...p, subject: e.target.value }))}
                />
                <Textarea
                  className="flex-1 resize-none h-56"
                  placeholder="Write your message…"
                  value={composeData.body}
                  onChange={(e) => setComposeData((p) => ({ ...p, body: e.target.value }))}
                />
              </div>
              <div className="p-4 border-t flex justify-end gap-2">
                <Button variant="outline" onClick={() => setComposing(false)}>Cancel</Button>
                <Button
                  disabled={!composeData.to.trim() || !composeData.body.trim()}
                  onClick={() => {
                    setComposing(false);
                    setComposeData({ to: "", subject: "", body: "" });
                  }}
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          ) : selectedMsg ? (
            <div className="flex flex-col h-full">
              {/* Message header */}
              <div className="p-4 border-b flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden shrink-0"
                    onClick={() => setSelectedId(null)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className={cn("text-sm text-white", selectedMsg.avatarColor)}>
                      {selectedMsg.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{selectedMsg.from}</p>
                    <p className="text-xs text-muted-foreground">{selectedMsg.fromRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggle(selectedMsg.id, "starred")}
                  >
                    {selectedMsg.starred
                      ? <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      : <StarOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggle(selectedMsg.id, "archived")}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:text-destructive"
                    onClick={() => deleteMsg(selectedMsg.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Subject */}
              <div className="px-5 pt-3 pb-1">
                <h2 className="text-base font-semibold">{selectedMsg.subject}</h2>
              </div>

              {/* Thread */}
              <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
                {selectedMsg.thread.map((t, i) => (
                  <div key={i} className={cn("flex gap-3", t.sender === "You" && "flex-row-reverse")}>
                    <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                      <AvatarFallback className={cn("text-xs", t.sender === "You" ? "bg-primary text-primary-foreground" : selectedMsg.avatarColor + " text-white")}>
                        {t.sender === "You" ? "Me" : selectedMsg.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn("max-w-[75%]", t.sender === "You" && "items-end flex flex-col")}>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                          t.sender === "You"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-muted rounded-tl-sm"
                        )}
                      >
                        {t.body}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">{t.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Reply box */}
              <div className="p-4 flex gap-2 items-end">
                <Textarea
                  placeholder={`Reply to ${selectedMsg.from}…`}
                  className="resize-none text-sm"
                  rows={2}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendReply();
                  }}
                />
                <Button size="icon" onClick={sendReply} disabled={!reply.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Inbox className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="font-medium">Select a message</p>
              <p className="text-sm text-muted-foreground mt-1">Choose a conversation from the list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
