import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. AI Tutor features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getTutorStream(messages: { role: string; content: string }[]) {
  if (!apiKey) return null;

  const model = "gemini-3-flash-preview";
  
  // Convert roles correctly for the SDK if needed, but the generateContent takes contents array
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const systemInstruction = `You are a helpful bilingual English-Chinese language tutor. 
Your goal is to help users learn either English or Chinese. 
Explain grammar points, translate phrases, and provide cultural context. 
If a user writes in one language, you can explain in both or the other as appropriate. 
Be encouraging and concise.`;

  return await ai.models.generateContentStream({
    model,
    contents,
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });
}
