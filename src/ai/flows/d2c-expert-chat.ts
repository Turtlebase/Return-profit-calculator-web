
'use server';

/**
 * @fileOverview A conversational AI agent that acts as a D2C expert.
 *
 * - chatWithD2cExpert - A function to handle the conversation.
 * - ChatMessage - The type for a single chat message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { generate } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { Content } from 'genkit/content';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  query: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

// Initialize the model once outside the function
const model = googleAI('gemini-2.0-flash');

export async function chatWithD2cExpert(input: ChatInput): Promise<string> {
    const systemPrompt = `You are a world-class D2C e-commerce strategist from India, acting as a helpful AI assistant named 'ProfitPilot'. Your expertise covers profitability, marketing, RTO reduction, logistics, and all facets of running a successful online brand in the Indian market.

        Your communication style is:
        - **Expert but approachable:** You break down complex topics into clear, actionable advice.
        - **Concise:** Provide answers that are to the point. Use bullet points or short paragraphs.
        - **Helpful:** Your primary goal is to help the user solve their problem or understand a concept better.
        - **Context-aware:** You are aware of the tools available on this website (like the Net Profit Calculator, ROAS tool, etc.) and you can suggest a user to try them out if it's relevant to their question.

        When responding, do not use markdown. Respond in plain text.
        `;

    // The history needs to be constructed in the format the `generate` function expects.
    // Each message's content must be an array of parts, e.g., [{ text: '...' }]
    const history: Content[] = [
        // Prime the model with the system instruction from the user and a confirmation from the model.
        { role: 'user', content: [{ text: systemPrompt }] },
        { role: 'model', content: [{ text: "Understood. I am ProfitPilot, your expert D2C assistant, ready to help." }] },
        // Map the rest of the incoming history to the correct format.
        ...input.history.map((msg) => ({
            role: msg.role as 'user' | 'model',
            content: [{ text: msg.content }],
        }))
    ];

    try {
        const { text } = await generate({
            model: model,
            prompt: input.query,
            history: history,
        });
        return text;
    } catch (e) {
        console.error("Error generating chat response:", e);
        return "I'm sorry, but I encountered an internal error while processing your request. Please try again shortly."
    }
}
