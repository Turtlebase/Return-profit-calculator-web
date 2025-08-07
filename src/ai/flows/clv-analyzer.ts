
'use server';

/**
 * @fileOverview An AI agent to analyze Customer Lifetime Value (CLV) data for a D2C brand.
 *
 * - analyzeClv - A function that handles the CLV analysis.
 * - ClvAnalysisInput - The input type for the function.
 * - ClvAnalysisOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ClvAnalysisInputSchema = z.object({
  aov: z.number().describe('Average Order Value (AOV) in the local currency.'),
  purchaseFrequency: z.number().describe('Average number of purchases a customer makes per year.'),
  customerLifespan: z.number().describe('The average number of years a customer continues to buy from the brand.'),
  grossMargin: z.number().describe('The gross profit margin as a percentage (e.g., 60 for 60%).'),
  clv: z.number().describe('The calculated Customer Lifetime Value.'),
});
export type ClvAnalysisInput = z.infer<typeof ClvAnalysisInputSchema>;

const ClvAnalysisOutputSchema = z.object({
  headline: z.string().describe('A single, powerful headline summarizing the key insight from the CLV analysis.'),
  analysis: z.string().describe('A detailed analysis of the CLV, written in HTML format. Explain what the CLV means in practical terms. Use <p>, <ul>, <li>, and <strong> tags.'),
  recommendations: z.array(z.string()).describe('A list of 2-3 actionable, expert recommendations to improve CLV. These should be specific and practical for a D2C brand.'),
});
export type ClvAnalysisOutput = z.infer<typeof ClvAnalysisOutputSchema>;


export async function analyzeClv(input: ClvAnalysisInput): Promise<ClvAnalysisOutput> {
  return analyzeClvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeClvPrompt',
  input: { schema: ClvAnalysisInputSchema },
  output: { schema: ClvAnalysisOutputSchema },
  prompt: `You are a world-class D2C e-commerce growth strategist, renowned for your ability to turn data into actionable, profitable strategies. Your specialty is customer lifetime value (CLV).

You are analyzing the following CLV data for a D2C brand:
- Average Order Value (AOV): {{{aov}}}
- Purchase Frequency (per year): {{{purchaseFrequency}}}
- Customer Lifespan (years): {{{customerLifespan}}}
- Gross Margin: {{{grossMargin}}}%
- Calculated CLV: {{{clv}}}

Your task is to provide an expert analysis for the D2C founder.

**Instructions:**
1.  **Craft a Compelling Headline:** Write a single, impactful sentence that gets to the heart of what this CLV number means for the business.
2.  **Write a Detailed Analysis:** In HTML format, explain the CLV in a way a founder can easily understand. Break down the components. Is the CLV healthy? Where is the strength (e.g., high AOV) and where is the weakness (e.g., low frequency)?
3.  **Provide Actionable Recommendations:** Give 2-3 specific, high-impact recommendations to improve the CLV. Do not give generic advice. Base your recommendations on the input data. For example, if purchase frequency is low, suggest a loyalty program or email marketing campaign. If AOV is low, suggest product bundling or upselling strategies.

Output the result in a single JSON object that strictly adheres to the provided output schema. Do not include any other text or formatting.`,
});

const analyzeClvFlow = ai.defineFlow(
  {
    name: 'analyzeClvFlow',
    inputSchema: ClvAnalysisInputSchema,
    outputSchema: ClvAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("The AI model failed to provide a valid analysis.");
    }
    return output;
  }
);
