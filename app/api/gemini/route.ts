// /app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function POST(req: Request) {
  try {
    const { message, noteContent, type } = await req.json();

    let prompt: string;
    if (type === "chat") {
      prompt = `You are a friendly and knowledgeable AI assistant. Based on the following note:\n\n"${noteContent}"\n\nEngage in a conversational tone when responding to the user's message: "${message}". Your reply should be thoughtful and encourage further discussion.`;
    } else if (type === "summary") {
      prompt = `Please provide a concise and clear summary of the following note. Highlight key points, insights, and any actionable items. Present your summary in bullet points for clarity:\n\n"${noteContent}"`;
    } else if (type === "qa") {
      prompt = `Based on the following note:\n\n"${noteContent}"\n\nAnswer the user's question: "${message}" with detailed and accurate information. Ensure your response is clear and directly tied to the content of the note.`;
    } else {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
    }

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return NextResponse.json({ result: response.response.text() });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
