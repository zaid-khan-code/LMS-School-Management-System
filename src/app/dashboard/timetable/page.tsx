import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

const schedule: Record<string, Record<string, { subject: string; teacher: string; room: string; color: string } | null>> = {
  "08:00": {
    Monday: { subject: "Mathematics", teacher: "Dr. Johnson", room: "Room 101", color: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-400" },
    Tuesday: { subject: "Physics", teacher: "Mr. Kim", room: "Lab 2", color: "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-400" },
    Wednesday: { subject: "Mathematics", teacher: "Dr. Johnson", room: "Room 101", color: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-400" },
    Thursday: { subject: "English", teacher: "Ms. Roberts", room: "Room 203", color: "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-400" },
    Friday: { subject: "History", teacher: "Ms. Chen", room: "Room 305", color: "bg-green-500/15 border-green-500/30 text-green-700 dark:text-green-400" },
  },
  "09:00": {
    Monday: { subject: "English Literature", teacher: "Ms. Roberts", room: "Room 203", color: "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-400" },
    Tuesday: { subject: "Computer Science", teacher: "Mr. Park", room: "Lab 1", color: "bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-400" },
    Wednesday: null,
    Thursday: { subject: "Physics", teacher: "Mr. Kim", room: "Lab 2", color: "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-400" },
    Friday: { subject: "Mathematics", teacher: "Dr. Johnson", room: "Room 101", color: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-400" },
  },
  "10:00": {
    Monday: null,
    Tuesday: { subject: "History", teacher: "Ms. Chen", room: "Room 305", color: "bg-green-500/15 border-green-500/30 text-green-700 dark:text-green-400" },
    Wednesday: { subject: "English Literature", teacher: "Ms. Roberts", room: "Room 203", color: "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-400" },
    Thursday: null,
    Friday: { subject: "Computer Science", teacher: "Mr. Park", room: "Lab 1", color: "bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-400" },
  },
  "11:00": {
    Monday: { subject: "Chemistry", teacher: "Dr. Patel", room: "Lab 3", color: "bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-400" },
    Tuesday: { subject: "Mathematics", teacher: "Dr. Johnson", room: "Room 101", color: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-400" },
    Wednesday: { subject: "Chemistry", teacher: "Dr. Patel", room: "Lab 3", color: "bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-400" },
    Thursday: { subject: "Computer Science", teacher: "Mr. Park", room: "Lab 1", color: "bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-400" },
    Friday: null,
  },
  "12:00": { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null },
  "13:00": {
    Monday: { subject: "History", teacher: "Ms. Chen", room: "Room 305", color: "bg-green-500/15 border-green-500/30 text-green-700 dark:text-green-400" },
    Tuesday: { subject: "English Literature", teacher: "Ms. Roberts", room: "Room 203", color: "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-400" },
    Wednesday: { subject: "Physics", teacher: "Mr. Kim", room: "Lab 2", color: "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-400" },
    Thursday: { subject: "Mathematics", teacher: "Dr. Johnson", room: "Room 101", color: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-400" },
    Friday: { subject: "Chemistry", teacher: "Dr. Patel", room: "Lab 3", color: "bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-400" },
  },
  "14:00": {
    Monday: { subject: "Computer Science", teacher: "Mr. Park", room: "Lab 1", color: "bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-400" },
    Tuesday: null,
    Wednesday: { subject: "History", teacher: "Ms. Chen", room: "Room 305", color: "bg-green-500/15 border-green-500/30 text-green-700 dark:text-green-400" },
    Thursday: { subject: "Chemistry", teacher: "Dr. Patel", room: "Lab 3", color: "bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-400" },
    Friday: { subject: "English Literature", teacher: "Ms. Roberts", room: "Room 203", color: "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-400" },
  },
  "15:00": { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null },
};

export default function TimetablePage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Timetable</h1>
        <p className="text-sm text-muted-foreground">Weekly class schedule — Grade 10A</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Week of Dec 9–13, 2025</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase w-20">Time</th>
                {days.map((day) => (
                  <th key={day} className={`text-left px-3 py-3 text-xs font-semibold uppercase ${day === today ? "text-primary" : "text-muted-foreground"}`}>
                    {day}
                    {day === today && <Badge variant="default" className="ml-2 text-xs">Today</Badge>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((period, i) => (
                <tr key={period} className={`border-b ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                  <td className="px-4 py-2 text-xs font-medium text-muted-foreground">{period}</td>
                  {period === "12:00" ? (
                    <td colSpan={5} className="px-3 py-2 text-center text-xs text-muted-foreground italic bg-muted/30">
                      Lunch Break (12:00 – 13:00)
                    </td>
                  ) : (
                    days.map((day) => {
                      const cls = schedule[period]?.[day];
                      return (
                        <td key={day} className="px-2 py-1.5">
                          {cls ? (
                            <div className={`rounded-lg border p-2 ${cls.color}`}>
                              <p className="font-semibold text-xs leading-tight">{cls.subject}</p>
                              <p className="text-xs opacity-70 mt-0.5">{cls.teacher}</p>
                              <p className="text-xs opacity-60">{cls.room}</p>
                            </div>
                          ) : (
                            <div className="h-14 rounded-lg border border-dashed opacity-30" />
                          )}
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
