import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function main(category: string) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: "You are a funny assistant telling the same joke in 'polish', 'russian' and 'english'."},
            {
                role: "user",
                content: `Tell me joke about ${category}.`,
            },
        ],
    });

    console.log(completion.choices[0].message);
}

main('doctor');
