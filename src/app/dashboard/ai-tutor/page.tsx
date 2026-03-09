"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Sparkles, BookOpen, Calculator, FlaskConical, Globe } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestions = [
  "Explain integration by parts with an example",
  "What is Newton's second law?",
  "Help me understand photosynthesis",
  "Summarize the causes of WWI",
];

const subjects = [
  { icon: Calculator, label: "Mathematics", color: "text-blue-500" },
  { icon: FlaskConical, label: "Science", color: "text-green-500" },
  { icon: BookOpen, label: "English", color: "text-purple-500" },
  { icon: Globe, label: "History", color: "text-orange-500" },
];

const aiResponses: Record<string, string> = {
  default: "I'm here to help you learn! Ask me any question about your subjects and I'll explain it step by step.",
  integration: "**Integration by Parts** is used when integrating a product of two functions.\n\nThe formula is: **∫ u·dv = u·v − ∫ v·du**\n\nExample: ∫ x·eˣ dx\n- Let u = x → du = dx\n- Let dv = eˣ dx → v = eˣ\n- ∫ x·eˣ dx = x·eˣ − ∫ eˣ dx = x·eˣ − eˣ + C = eˣ(x − 1) + C ✓",
  newton: "**Newton's Second Law of Motion** states:\n\n**F = ma** (Force = mass × acceleration)\n\nKey points:\n• Force is directly proportional to acceleration\n• The more massive an object, the more force needed\n• Units: Force in Newtons (N), mass in kg, acceleration in m/s²\n\nExample: A 5 kg object accelerates at 3 m/s² → F = 5 × 3 = **15 N**",
};

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("integrat")) return aiResponses.integration;
  if (lower.includes("newton") || lower.includes("second law")) return aiResponses.newton;
  return `Great question! Let me help you understand: "${msg}"\n\nIn a fully connected system, this would call the GPT-4o API to give you a detailed, personalized explanation based on your current curriculum and learning history. The response would include:\n\n• Step-by-step explanation\n• Worked examples\n• Related concepts\n• Practice problems\n\nConnect your OpenAI API key in Settings to activate the AI tutor!`;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: "👋 Hi! I'm your AI tutor powered by GPT-4o. I know your curriculum, your past performance, and I'm here to help you understand any topic. What would you like to learn today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [subject, setSubject] = useState("Mathematics");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1200));
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getAIResponse(msg), timestamp: new Date() };
    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              AI Tutor <Badge variant="secondary"><Sparkles className="h-3 w-3 mr-1" />GPT-4o</Badge>
            </h1>
            <p className="text-xs text-muted-foreground">Personalized to your curriculum & learning style</p>
          </div>
        </div>
        <div className="flex gap-1">
          {subjects.map((s) => (
            <button
              key={s.label}
              onClick={() => setSubject(s.label)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full border transition-colors ${subject === s.label ? "border-primary bg-primary/10 text-primary" : "hover:bg-muted"}`}
            >
              <s.icon className={`h-3 w-3 ${s.color}`} />{s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 shrink-0">
                  {msg.role === "assistant"
                    ? <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs"><Bot className="h-4 w-4" /></AvatarFallback>
                    : <AvatarFallback className="bg-primary text-primary-foreground text-xs">SA</AvatarFallback>}
                </Avatar>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                  <pre className="whitespace-pre-wrap font-sans leading-relaxed">{msg.content}</pre>
                  <div className={`text-xs mt-1 opacity-60 ${msg.role === "user" ? "text-right" : ""}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white"><Bot className="h-4 w-4" /></AvatarFallback></Avatar>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-xs border rounded-full px-3 py-1.5 hover:bg-accent transition-colors text-left">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t p-3 flex gap-2">
          <Input
            placeholder={`Ask me anything about ${subject}…`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            className="flex-1"
          />
          <Button onClick={() => send()} disabled={!input.trim() || isTyping} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
