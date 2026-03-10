import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIRequestSchema = z.object({
  type: z.enum(["tutor", "lesson_plan", "quiz_generate", "grade_essay", "study_plan"]),
  message: z.string().min(1).max(4000),
  context: z.object({
    subject: z.string().optional(),
    grade: z.string().optional(),
    student_id: z.string().optional(),
  }).optional(),
});

const systemPrompts: Record<string, string> = {
  tutor: "You are an AI tutor for students. Provide clear, step-by-step explanations. Use examples and analogies to help students understand concepts.",
  lesson_plan: "You are an educational curriculum designer. Create detailed, structured lesson plans with objectives, activities, and assessment criteria.",
  quiz_generate: "You are a quiz generator for students. Create relevant quiz questions with multiple choice options and indicate the correct answers.",
  grade_essay: "You are an essay grading assistant. Provide constructive feedback including strengths, areas for improvement, and a suggested grade.",
  study_plan: "You are a study plan creator. Create personalized, week-by-week study plans with clear milestones and recommended resources.",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = AIRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { type, message, context } = parsed.data;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured. Set GEMINI_API_KEY in environment variables." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemPrompt = systemPrompts[type] || systemPrompts.tutor;
    const contextInfo = context
      ? `\nContext: Subject: ${context.subject || "General"}, Grade: ${context.grade || "Not specified"}`
      : "";

    const prompt = `${systemPrompt}${contextInfo}\n\nStudent's request: ${message}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json({
      type,
      response,
      generated_at: new Date().toISOString(),
      model: "gemini-2.0-flash",
    });
  } catch (error: unknown) {
    console.error("AI API error:", error);
    const message =
      error instanceof Error && error.message.includes("API_KEY")
        ? "Invalid Gemini API key. Please check your GEMINI_API_KEY configuration."
        : error instanceof Error && error.message.includes("quota")
          ? "Gemini API quota exceeded. Please try again later."
          : "Failed to generate AI response. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
