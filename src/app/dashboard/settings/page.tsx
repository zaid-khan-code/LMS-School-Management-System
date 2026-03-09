"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, Palette, Key, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile"><User className="h-3.5 w-3.5 mr-1.5" />Profile</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1.5" />Alerts</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-3.5 w-3.5 mr-1.5" />Security</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="h-3.5 w-3.5 mr-1.5" />Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Profile Information</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-primary/10 text-primary font-bold">SA</AvatarFallback>
                </Avatar>
                <div>
                  <Button size="sm" variant="outline">Change Photo</Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>First Name</Label><Input defaultValue="Sarah" /></div>
                <div className="space-y-1.5"><Label>Last Name</Label><Input defaultValue="Johnson" /></div>
              </div>
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue="s.johnson@greenfield.edu" /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input type="tel" defaultValue="+1 (555) 234-5678" /></div>
              <div className="space-y-1.5"><Label>Bio</Label><textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none h-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" defaultValue="Mathematics teacher at Greenfield Academy with 8+ years of experience." /></div>
              <Button><Save className="h-4 w-4" />Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle><CardDescription>Choose what you want to be notified about</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Assignment submissions", desc: "When students submit assignments", defaultChecked: true },
                { label: "New messages", desc: "Direct messages from teachers or parents", defaultChecked: true },
                { label: "Fee reminders", desc: "Payment due date alerts", defaultChecked: false },
                { label: "Attendance alerts", desc: "When students are absent", defaultChecked: true },
                { label: "Grade updates", desc: "When grades are posted or changed", defaultChecked: true },
                { label: "Announcements", desc: "School-wide announcements", defaultChecked: true },
                { label: "System updates", desc: "Platform maintenance and updates", defaultChecked: false },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between p-3 rounded-lg border">
                  <div><p className="text-sm font-medium">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                  <Switch defaultChecked={n.defaultChecked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" className="text-xs">Enabled</Badge>
                  <Switch defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-sm font-semibold flex items-center gap-2"><Key className="h-4 w-4" />Change Password</h4>
                <div className="space-y-1.5"><Label>Current Password</Label><Input type="password" placeholder="••••••••" /></div>
                <div className="space-y-1.5"><Label>New Password</Label><Input type="password" placeholder="Min. 12 characters" /></div>
                <div className="space-y-1.5"><Label>Confirm New Password</Label><Input type="password" placeholder="Repeat password" /></div>
                <Button><Save className="h-4 w-4" />Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Appearance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: "Light", bg: "bg-white border-2", text: "text-gray-900" }, { label: "Dark", bg: "bg-gray-900 border-2", text: "text-white" }, { label: "System", bg: "bg-gradient-to-br from-white to-gray-900 border-2", text: "text-gray-600" }].map((t) => (
                    <button key={t.label} className={`rounded-xl p-4 text-center ${t.bg} border-primary/30 hover:border-primary transition-colors`}>
                      <div className={`text-sm font-medium ${t.text}`}>{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div><p className="text-sm font-medium">Compact Mode</p><p className="text-xs text-muted-foreground">Reduce spacing in the dashboard</p></div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div><p className="text-sm font-medium">Animations</p><p className="text-xs text-muted-foreground">Enable page transition animations</p></div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
