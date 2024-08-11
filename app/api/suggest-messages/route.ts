import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextResponse } from 'next/server';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. Give different answers everytime.(Session ID: ${Math.random()})`;


    const result = await generateText({
      model: google("models/gemini-1.5-pro-latest"),
      prompt: prompt,
      temperature: 0.7,
      maxRetries: 0,
      frequencyPenalty: 0.5,

    });
    console.log(result.text)

    // Assuming result contains an object with a 'text' key
    if (result?.text) {
      return NextResponse.json( {text: result.text} );
    } else {
      // Handle cases where the response might be unexpected or missing
      console.error('Unexpected result format:', result);
      return NextResponse.json({ error: 'Unexpected response format' }, { status: 500 });
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
