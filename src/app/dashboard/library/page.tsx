"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Clock, CheckCircle2 } from "lucide-react";

const books = [
  { id: "1", title: "Calculus: Early Transcendentals", author: "James Stewart", isbn: "978-0-538-49790-9", subject: "Mathematics", available: true, copies: 3 },
  { id: "2", title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0-14-143951-8", subject: "English", available: false, copies: 2 },
  { id: "3", title: "Physics for Scientists & Engineers", author: "Serway & Jewett", isbn: "978-1-285-07163-7", subject: "Physics", available: true, copies: 4 },
  { id: "4", title: "A Brief History of Time", author: "Stephen Hawking", isbn: "978-0-553-38016-3", subject: "Science", available: true, copies: 2 },
  { id: "5", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", subject: "English", available: true, copies: 5 },
  { id: "6", title: "Introduction to Algorithms", author: "Cormen et al.", isbn: "978-0-262-03384-8", subject: "Computer Science", available: false, copies: 1 },
];

const borrowed = [
  { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", borrowedDate: "Nov 20", dueDate: "Dec 10", status: "due-soon" },
  { id: "2", title: "World History: Patterns", author: "Ellis & Esler", borrowedDate: "Nov 28", dueDate: "Dec 18", status: "ok" },
];

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Library</h1>
        <p className="text-sm text-muted-foreground">Browse and borrow books from the school library</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Books", value: "2,840", color: "text-blue-500" },
          { label: "Available Now", value: "2,340", color: "text-green-500" },
          { label: "My Borrowed", value: borrowed.length.toString(), color: "text-orange-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="catalog">
        <TabsList><TabsTrigger value="catalog">Book Catalog</TabsTrigger><TabsTrigger value="borrowed">My Books ({borrowed.length})</TabsTrigger></TabsList>

        <TabsContent value="catalog" className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title, author, or subject…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {filtered.map((book) => (
              <Card key={book.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-16 rounded-md bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm leading-tight">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">{book.subject}</Badge>
                        <Badge variant={book.available ? "success" : "secondary"} className="text-xs">
                          {book.available ? `${book.copies} available` : "Checked out"}
                        </Badge>
                      </div>
                      <Button size="sm" variant={book.available ? "default" : "outline"} disabled={!book.available} className="mt-2 h-7 text-xs">
                        {book.available ? "Borrow" : "Join Waitlist"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="borrowed" className="mt-4">
          <div className="space-y-3">
            {borrowed.map((book) => (
              <Card key={book.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${book.status === "due-soon" ? "bg-orange-500/10" : "bg-green-500/10"}`}>
                        {book.status === "due-soon" ? <Clock className="h-5 w-5 text-orange-500" /> : <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{book.title}</p>
                        <p className="text-xs text-muted-foreground">{book.author} · Borrowed {book.borrowedDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={book.status === "due-soon" ? "warning" : "success"} className="text-xs">
                        Due {book.dueDate}
                      </Badge>
                      <div className="mt-2"><Button size="sm" variant="outline" className="h-7 text-xs">Renew</Button></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
