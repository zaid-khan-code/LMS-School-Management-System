'use client'

import { useState } from 'react'
import { Plus, Megaphone, CheckCheck, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

type Priority = 'low' | 'medium' | 'high' | 'urgent'

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  date: string
  priority: Priority
  read: boolean
}

const priorityConfig: Record<Priority, { label: string; class: string; dot: string }> = {
  low: { label: 'Low', class: 'bg-gray-100 text-gray-600 border-gray-200', dot: 'bg-gray-400' },
  medium: { label: 'Medium', class: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  high: { label: 'High', class: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  urgent: { label: 'Urgent', class: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
}

const initialAnnouncements: Announcement[] = [
  { id: '1', title: 'End of Year Examinations Schedule Released', content: 'The final examination timetable for the 2024 academic year has been published. Please check the Exams section for detailed information about dates, times, and venues.', author: 'Admin Office', date: '2024-12-10', priority: 'urgent', read: false },
  { id: '2', title: 'Holiday Break Announcement', content: 'School will be closed from December 24th to January 5th for the winter holiday break. Classes will resume on January 6th, 2025.', author: 'Principal', date: '2024-12-09', priority: 'high', read: false },
  { id: '3', title: 'Library Extended Hours', content: 'The school library will be open until 8:00 PM Monday through Thursday during the exam preparation period, starting December 11th.', author: 'Library Staff', date: '2024-12-08', priority: 'medium', read: true },
  { id: '4', title: 'Science Fair Registration Open', content: 'Students interested in participating in the Annual Science Fair (January 20th) can now register. See your science teacher for registration forms.', author: 'Science Dept.', date: '2024-12-07', priority: 'medium', read: true },
  { id: '5', title: 'Computer Lab Maintenance', content: 'Computer Lab 1 will be unavailable on December 13th for routine maintenance. Please use Lab 2 as an alternative during this period.', author: 'IT Department', date: '2024-12-06', priority: 'low', read: true },
  { id: '6', title: 'Parent-Teacher Meeting Reminder', content: 'The next Parent-Teacher Meeting is scheduled for December 15th from 3:00 PM to 6:00 PM. Please ensure parents are informed and attendance is noted.', author: 'Vice Principal', date: '2024-12-05', priority: 'high', read: false },
]

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all')
  const [formData, setFormData] = useState({ title: '', content: '', priority: 'medium' as Priority })

  const markAsRead = (id: string) => {
    setAnnouncements((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a))
  }

  const markAllRead = () => {
    setAnnouncements((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  const handleCreate = () => {
    if (!formData.title || !formData.content) return
    const newAnnouncement: Announcement = {
      id: String(Date.now()),
      title: formData.title,
      content: formData.content,
      priority: formData.priority,
      author: 'You',
      date: new Date().toISOString().split('T')[0],
      read: true,
    }
    setAnnouncements((prev) => [newAnnouncement, ...prev])
    setFormData({ title: '', content: '', priority: 'medium' })
    setDialogOpen(false)
  }

  const filtered = priorityFilter === 'all' ? announcements : announcements.filter((a) => a.priority === priorityFilter)
  const unreadCount = announcements.filter((a) => !a.read).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Stay updated with school news and notices</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as Priority | 'all')}>
            <SelectTrigger className="w-44">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {(['urgent', 'high', 'medium', 'low'] as Priority[]).map((p) => (
                <SelectItem key={p} value={p}>{priorityConfig[p].label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {unreadCount > 0 && (
            <span className="text-sm text-muted-foreground">{unreadCount} unread</span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead} className="gap-2 text-muted-foreground">
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Announcements List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((a) => {
            const p = priorityConfig[a.priority]
            return (
              <Card
                key={a.id}
                className={cn('transition-all hover:shadow-md', !a.read && 'border-l-4 border-l-primary')}
                onClick={() => markAsRead(a.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0', a.priority === 'urgent' ? 'bg-red-100' : a.priority === 'high' ? 'bg-amber-100' : 'bg-muted')}>
                      <Megaphone className={cn('h-4 w-4', a.priority === 'urgent' ? 'text-red-500' : a.priority === 'high' ? 'text-amber-500' : 'text-muted-foreground')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={cn('font-semibold text-sm', !a.read && 'font-bold')}>{a.title}</h3>
                          {!a.read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                        </div>
                        <Badge className={cn('text-xs border flex-shrink-0', p.class)}>{p.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{a.content}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                        <span>{a.author}</span>
                        <span>·</span>
                        <span>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        {a.read && <span className="flex items-center gap-1 text-muted-foreground/60"><CheckCheck className="h-3 w-3" /> Read</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Megaphone className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">No announcements</h3>
            <p className="text-muted-foreground mt-1">There are no announcements matching your filter.</p>
          </div>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>Post a new announcement to all students and staff.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                placeholder="Announcement title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Content *</Label>
              <textarea
                rows={4}
                placeholder="Write the announcement content..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v as Priority })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['low', 'medium', 'high', 'urgent'] as Priority[]).map((p) => (
                    <SelectItem key={p} value={p}>{priorityConfig[p].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={!formData.title || !formData.content}>
                Post Announcement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
