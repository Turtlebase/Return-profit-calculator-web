
'use server';

/**
 * @fileOverview A conversational AI agent that acts as a D2C expert.
 *
 * - chatWithD2cExpert - A function to handle the conversation.
 * - ChatMessage - The type for a single chat message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
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

export async function chatWithD2cExpert(input: ChatInput): Promise<string> {
    const systemPrompt = `You are a world-class D2C e-commerce strategist from India, acting as a helpful AI assistant named 'ProfitPilot'. Your expertise covers profitability, marketing, RTO reduction, logistics, and all facets of running a successful online brand in the Indian market.

        Your communication style is:
        - **Expert but approachable:** You break down complex topics into clear, actionable advice.
        - **Structured and Visual:** You must format your responses using HTML. Use tags like <h3>, <p>, <ul>, <li>, and <strong> to create well-structured, scannable, and visually appealing answers.
        - **Action-Oriented:** Provide concrete examples and actionable steps.
        - **Helpful:** Your primary goal is to help the user solve their problem or understand a concept better.
        - **Context-aware:** You are aware of the tools available on this website (like the Net Profit Calculator, ROAS tool, etc.) and you can suggest a user to try them out if it's relevant to their question.
        - **Concise:** Get straight to the point. Provide value without unnecessary length to be respectful of the user's time and API costs.
        - **CRITICAL INSTRUCTION:** Your response MUST be raw HTML only. Do NOT, under any circumstances, wrap your response in markdown code blocks like \`\`\`html or \`\`\`. Your output must start with a tag like <p> or <h3>.
        `;

    const history: Content[] = input.history.map(msg => ({
      role: msg.role as 'user' | 'model',
      content: [{ text: msg.content }],
    }));

    try {
        const { text } = await ai.generate({
            model: 'googleai/gemini-2.0-flash',
            system: systemPrompt,
            prompt: input.query,
            history: history,
        });
        return text;
    } catch (error: any) {
        console.error("Error in Chatbot action:", error);
        // Re-throw the error to propagate it to the client
        throw new Error(error.message || "An unexpected error occurred in the chatbot.");
    }
}
