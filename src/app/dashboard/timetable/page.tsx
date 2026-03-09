'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TimetableEntry {
  id: string
  subject: string
  teacher: string
  room: string
  day: number // 0=Mon, 4=Fri
  startSlot: number // 0=7am
  endSlot: number
  color: string
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const HOURS = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

const timetableData: TimetableEntry[] = [
  // Monday
  { id: '1', subject: 'Mathematics', teacher: 'Dr. S. Johnson', room: 'R-101', day: 0, startSlot: 1, endSlot: 2, color: 'bg-blue-500' },
  { id: '2', subject: 'Physics', teacher: 'Prof. M. Chen', room: 'Lab-2', day: 0, startSlot: 3, endSlot: 4, color: 'bg-purple-500' },
  { id: '3', subject: 'English', teacher: 'Ms. E. Parker', room: 'R-205', day: 0, startSlot: 5, endSlot: 6, color: 'bg-pink-500' },
  { id: '4', subject: 'History', teacher: 'Mr. D. Kim', room: 'R-301', day: 0, startSlot: 7, endSlot: 8, color: 'bg-amber-500' },
  // Tuesday
  { id: '5', subject: 'Biology', teacher: 'Dr. A. Patel', room: 'Lab-3', day: 1, startSlot: 1, endSlot: 2, color: 'bg-green-500' },
  { id: '6', subject: 'Computer Sci', teacher: 'Mr. J. Wright', room: 'Lab-1', day: 1, startSlot: 3, endSlot: 4, color: 'bg-cyan-500' },
  { id: '7', subject: 'Mathematics', teacher: 'Dr. S. Johnson', room: 'R-101', day: 1, startSlot: 5, endSlot: 6, color: 'bg-blue-500' },
  { id: '8', subject: 'Physics', teacher: 'Prof. M. Chen', room: 'Lab-2', day: 1, startSlot: 7, endSlot: 8, color: 'bg-purple-500' },
  // Wednesday
  { id: '9', subject: 'English', teacher: 'Ms. E. Parker', room: 'R-205', day: 2, startSlot: 1, endSlot: 2, color: 'bg-pink-500' },
  { id: '10', subject: 'History', teacher: 'Mr. D. Kim', room: 'R-301', day: 2, startSlot: 2, endSlot: 3, color: 'bg-amber-500' },
  { id: '11', subject: 'Biology', teacher: 'Dr. A. Patel', room: 'Lab-3', day: 2, startSlot: 5, endSlot: 6, color: 'bg-green-500' },
  { id: '12', subject: 'Computer Sci', teacher: 'Mr. J. Wright', room: 'Lab-1', day: 2, startSlot: 7, endSlot: 8, color: 'bg-cyan-500' },
  // Thursday
  { id: '13', subject: 'Mathematics', teacher: 'Dr. S. Johnson', room: 'R-101', day: 3, startSlot: 0, endSlot: 1, color: 'bg-blue-500' },
  { id: '14', subject: 'Physics', teacher: 'Prof. M. Chen', room: 'Lab-2', day: 3, startSlot: 2, endSlot: 3, color: 'bg-purple-500' },
  { id: '15', subject: 'English', teacher: 'Ms. E. Parker', room: 'R-205', day: 3, startSlot: 4, endSlot: 5, color: 'bg-pink-500' },
  { id: '16', subject: 'History', teacher: 'Mr. D. Kim', room: 'R-301', day: 3, startSlot: 6, endSlot: 7, color: 'bg-amber-500' },
  // Friday
  { id: '17', subject: 'Biology', teacher: 'Dr. A. Patel', room: 'Lab-3', day: 4, startSlot: 1, endSlot: 2, color: 'bg-green-500' },
  { id: '18', subject: 'Computer Sci', teacher: 'Mr. J. Wright', room: 'Lab-1', day: 4, startSlot: 3, endSlot: 4, color: 'bg-cyan-500' },
  { id: '19', subject: 'Mathematics', teacher: 'Dr. S. Johnson', room: 'R-101', day: 4, startSlot: 5, endSlot: 6, color: 'bg-blue-500' },
  { id: '20', subject: 'English', teacher: 'Ms. E. Parker', room: 'R-205', day: 4, startSlot: 7, endSlot: 8, color: 'bg-pink-500' },
]

const legend = [
  { subject: 'Mathematics', color: 'bg-blue-500' },
  { subject: 'Physics', color: 'bg-purple-500' },
  { subject: 'English', color: 'bg-pink-500' },
  { subject: 'History', color: 'bg-amber-500' },
  { subject: 'Biology', color: 'bg-green-500' },
  { subject: 'Computer Sci', color: 'bg-cyan-500' },
]

const TOTAL_SLOTS = 10 // 7am to 5pm

export default function TimetablePage() {
  const [view, setView] = useState<'week' | 'day'>('week')
  const [selectedDay, setSelectedDay] = useState(0)

  const daysToShow = view === 'week' ? DAYS : [DAYS[selectedDay]]
  const dayIndexes = view === 'week' ? [0, 1, 2, 3, 4] : [selectedDay]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
        <p className="text-muted-foreground">Your weekly class schedule</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg border overflow-hidden">
          <button
            onClick={() => setView('week')}
            className={cn('px-4 py-2 text-sm font-medium transition-colors', view === 'week' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted')}
          >
            Week View
          </button>
          <button
            onClick={() => setView('day')}
            className={cn('px-4 py-2 text-sm font-medium transition-colors', view === 'day' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted')}
          >
            Day View
          </button>
        </div>
        {view === 'day' && (
          <div className="flex gap-1">
            {DAY_SHORT.map((d, i) => (
              <button
                key={d}
                onClick={() => setSelectedDay(i)}
                className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', selectedDay === i ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80')}
              >
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Timetable Grid */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Header row */}
              <div className={cn('grid border-b bg-muted/40')} style={{ gridTemplateColumns: `80px repeat(${daysToShow.length}, 1fr)` }}>
                <div className="p-3 text-xs font-semibold text-muted-foreground uppercase">Time</div>
                {daysToShow.map((d) => (
                  <div key={d} className="p-3 text-xs font-semibold text-center uppercase tracking-wide text-muted-foreground border-l">
                    <div className="flex items-center justify-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {d}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {Array.from({ length: TOTAL_SLOTS }, (_, slotIdx) => (
                <div
                  key={slotIdx}
                  className={cn('grid border-b last:border-0', slotIdx % 2 === 0 ? 'bg-background' : 'bg-muted/10')}
                  style={{ gridTemplateColumns: `80px repeat(${daysToShow.length}, 1fr)`, minHeight: '64px' }}
                >
                  {/* Time label */}
                  <div className="p-2 flex items-start justify-center">
                    <span className="text-xs text-muted-foreground font-mono pt-1">{HOURS[slotIdx]}</span>
                  </div>

                  {dayIndexes.map((dayIdx) => {
                    const entries = timetableData.filter((e) => e.day === dayIdx && e.startSlot === slotIdx)
                    return (
                      <div key={dayIdx} className="border-l p-1 relative">
                        {entries.map((entry) => {
                          const height = (entry.endSlot - entry.startSlot) * 64 - 4
                          return (
                            <div
                              key={entry.id}
                              className={cn('absolute left-1 right-1 rounded-lg px-2 py-1.5 text-white shadow-sm', entry.color)}
                              style={{ height: `${height}px`, zIndex: 1 }}
                            >
                              <p className="text-xs font-semibold leading-tight truncate">{entry.subject}</p>
                              <p className="text-xs opacity-80 truncate mt-0.5">{entry.teacher}</p>
                              <div className="flex items-center gap-1 mt-0.5 opacity-80">
                                <MapPin className="h-2.5 w-2.5" />
                                <span className="text-xs">{entry.room}</span>
                              </div>
                              {entry.endSlot - entry.startSlot >= 2 && (
                                <div className="flex items-center gap-1 mt-0.5 opacity-80">
                                  <Clock className="h-2.5 w-2.5" />
                                  <span className="text-xs">{HOURS[entry.startSlot]} – {HOURS[entry.endSlot]}</span>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {legend.map((item) => (
          <div key={item.subject} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className={cn('h-3 w-3 rounded-sm flex-shrink-0', item.color)} />
            {item.subject}
          </div>
        ))}
      </div>
    </div>
  )
}
