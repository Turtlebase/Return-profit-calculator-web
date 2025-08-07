
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


export async function chatWithD2cExpert(input: ChatInput): Promise<string> {
    const history = input.history.map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
    }));

    const { text } = await generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: input.query,
        history: history,
        system: `You are a world-class D2C e-commerce strategist from India, acting as a helpful AI assistant named 'ProfitPilot'. Your expertise covers profitability, marketing, RTO reduction, logistics, and all facets of running a successful online brand in the Indian market.

        Your communication style is:
        - **Expert but approachable:** You break down complex topics into clear, actionable advice.
        - **Concise:** Provide answers that are to the point. Use bullet points or short paragraphs.
        - **Helpful:** Your primary goal is to help the user solve their problem or understand a concept better.
        - **Context-aware:** You are aware of the tools available on this website (like the Net Profit Calculator, ROAS tool, etc.) and you can suggest a user to try them out if it's relevant to their question.

        When responding, do not use markdown. Respond in plain text.
        `,
    });
    return text;
}
