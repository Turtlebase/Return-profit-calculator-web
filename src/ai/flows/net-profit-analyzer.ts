
'use server';

/**
 * @fileOverview An AI agent to analyze the net profit of a D2C business based on order data.
 *
 * - analyzeNetProfit - A function that handles the net profit analysis.
 * - NetProfitAnalysisInput - The input type for the function.
 * - NetProfitAnalysisOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const NetProfitAnalysisInputSchema = z.object({
  sellingPrice: z.number().describe('The retail selling price of the product in Indian Rupees (₹).'),
  cogs: z.number().describe('The Cost of Goods Sold in Indian Rupees (₹).'),
  shippingCost: z.number().describe('The cost of forward shipping in Indian Rupees (₹).'),
  returnRate: z.number().describe('The percentage of orders that are returned (RTO).'),
  returnProcessingCost: z.number().describe('The cost to process a return (includes reverse shipping) in Indian Rupees (₹).'),
  netProfitPerOrder: z.number().describe('The final calculated true net profit per order in Indian Rupees (₹).'),
  breakEvenReturnRate: z.number().describe('The calculated break-even return rate for the business.'),
});
export type NetProfitAnalysisInput = z.infer<typeof NetProfitAnalysisInputSchema>;

const NetProfitAnalysisOutputSchema = z.object({
  headline: z.string().describe('A single, powerful headline summarizing the key insight from the analysis.'),
  analysis: z.string().describe('A detailed analysis of the profitability, written in HTML format. Explain what the numbers mean. Use <p>, <ul>, <li>, and <strong> tags. All monetary values must be in Indian Rupees (₹).'),
  recommendations: z.array(z.string()).describe('A list of 2-3 actionable, expert recommendations to improve profitability.'),
});
export type NetProfitAnalysisOutput = z.infer<typeof NetProfitAnalysisOutputSchema>;


export async function analyzeNetProfit(input: NetProfitAnalysisInput): Promise<NetProfitAnalysisOutput> {
  return analyzeNetProfitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeNetProfitPrompt',
  input: { schema: NetProfitAnalysisInputSchema },
  output: { schema: NetProfitAnalysisOutputSchema },
  prompt: `You are a world-class D2C e-commerce financial analyst. Your superpower is looking at a company's unit economics and instantly identifying the biggest levers for improving profitability.

You are analyzing the following data for a single order. All monetary values are in Indian Rupees (₹).
- Selling Price: ₹{{{sellingPrice}}}
- COGS: ₹{{{cogs}}}
- Shipping Cost: ₹{{{shippingCost}}}
- Return Rate: {{{returnRate}}}%
- Return Processing Cost: ₹{{{returnProcessingCost}}}
- **Final Net Profit Per Order:** ₹{{{netProfitPerOrder}}}
- **Break-Even Return Rate:** {{{breakEvenReturnRate}}}%

Your task is to provide an expert analysis for the D2C founder.

**Instructions:**
1.  **Craft a Compelling Headline:** Write a single, impactful sentence that gets to the heart of the matter. Example: "Your return rate is masking an otherwise healthy profit margin." or "Profitability is on a knife's edge, hinging entirely on reducing shipping costs."
2.  **Write a Detailed Analysis:** In HTML format, break down the numbers. Is the business healthy? Where is the biggest profit drain coming from (e.g., high COGS, shipping, or returns)? Compare their current return rate to their break-even rate and explain the significance.
3.  **Provide Actionable Recommendations:** Give 2-3 specific, high-impact recommendations. Should they focus on increasing prices, renegotiating with suppliers (COGS), finding cheaper shipping, or tackling the return rate? Be precise.

Output the result in a single JSON object that strictly adheres to the provided output schema. All monetary values in your output must be prefixed with the '₹' symbol. Do not include any other text or formatting.`,
});

const analyzeNetProfitFlow = ai.defineFlow(
  {
    name: 'analyzeNetProfitFlow',
    inputSchema: NetProfitAnalysisInputSchema,
    outputSchema: NetProfitAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("The AI model failed to provide a valid analysis.");
    }
    return output;
  }
);
