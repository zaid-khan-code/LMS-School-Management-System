import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const AIRequestSchema = z.object({
  type: z.enum(["tutor", "lesson_plan", "quiz_generate", "grade_essay", "study_plan"]),
  message: z.string().min(1).max(4000),
  context: z.object({
    subject: z.string().optional(),
    grade: z.string().optional(),
    student_id: z.string().optional(),
  }).optional(),
});

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

    const { type, message } = parsed.data;

    // In production: call OpenAI API
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({...});

    const responses: Record<string, string> = {
      tutor: `As your AI tutor, here is help with: "${message}"\n\nThis is a demo response. Connect your OpenAI API key in environment variables (OPENAI_API_KEY) to activate GPT-4o powered responses.`,
      lesson_plan: `Lesson Plan for: "${message}"\n\n**Objectives:** ...\n**Activities:** ...\n**Assessment:** ...\n\nConnect OpenAI API for full AI-generated lesson plans.`,
      quiz_generate: `Quiz questions for: "${message}"\n\n1. Question 1...\n2. Question 2...\n\nConnect OpenAI API for AI-generated quizzes.`,
      grade_essay: `Essay feedback for submission...\n\nStrengths: ...\nAreas for improvement: ...\n\nConnect OpenAI API for detailed AI grading.`,
      study_plan: `Study plan based on your request: "${message}"\n\nWeek 1: ...\nWeek 2: ...\n\nConnect OpenAI API for personalized AI study plans.`,
    };

    return NextResponse.json({
      type,
      response: responses[type] || responses.tutor,
      generated_at: new Date().toISOString(),
      model: "gpt-4o (demo mode)",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
