// server/api/translate.post.ts
import { defineEventHandler, readBody } from 'h3';
import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default defineEventHandler(async (event) => {
  // Parse the incoming request body
  const { input, source, target } = await readBody(event);

  if (!input || !source || !target) {
    return {
      status: 400,
      message: 'Missing input, source, or target in request body'
    };
  }

  try {
    // Make a request to OpenAI API to get the translation
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are translator both human and programming languages. Deliver translation from ${source} to ${target} of the given text. Do not comment or explain. I need only the translation.` },
        { role: "user", content: `${input}` },
      ],
    });

    // Extract the translated message from the response
    const translatedText = completion.choices[0]?.message?.content ?? 'No translation available';

    // Return the translation in the API response
    return {
      status: 200,
      translation: translatedText,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Error processing translation',
      error: error.message,
    };
  }
});