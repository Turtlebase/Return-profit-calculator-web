
'use server';

/**
 * @fileOverview An AI agent to analyze the impact of a proposed discount for a D2C brand.
 *
 * - analyzeDiscount - A function that handles the discount analysis.
 * - DiscountAnalysisInput - The input type for the function.
 * - DiscountAnalysisOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DiscountAnalysisInputSchema = z.object({
  originalPrice: z.number().describe('The original selling price of the product in Indian Rupees (₹).'),
  cogs: z.number().describe('The Cost of Goods Sold for the product in Indian Rupees (₹).'),
  discountPercentage: z.number().describe('The proposed discount percentage (e.g., 20 for 20%).'),
  profitAfterDiscount: z.number().describe('The calculated profit per sale *after* the discount is applied, in Indian Rupees (₹).'),
  profitMarginAfterDiscount: z.number().describe('The calculated profit margin *after* the discount is applied.'),
});
export type DiscountAnalysisInput = z.infer<typeof DiscountAnalysisInputSchema>;

const DiscountAnalysisOutputSchema = z.object({
  headline: z.string().describe('A single, powerful headline summarizing the key insight from the discount analysis.'),
  analysis: z.string().describe('A detailed analysis of the discount\'s impact, written in HTML format. Explain the trade-offs. Use <p>, <ul>, <li>, and <strong> tags. All monetary values must be in Indian Rupees (₹).'),
  recommendations: z.array(z.string()).describe('A list of 2-3 actionable, expert recommendations. Should this discount be used? If so, how? (e.g., "Use for first-time customer acquisition only", "Bundle with a high-margin product").'),
});
export type DiscountAnalysisOutput = z.infer<typeof DiscountAnalysisOutputSchema>;


export async function analyzeDiscount(input: DiscountAnalysisInput): Promise<DiscountAnalysisOutput> {
  return analyzeDiscountFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDiscountPrompt',
  input: { schema: DiscountAnalysisInputSchema },
  output: { schema: DiscountAnalysisOutputSchema },
  prompt: `You are a world-class D2C e-commerce pricing and promotions strategist. You have a deep understanding of how discounts impact profitability and brand perception.

You are analyzing the following proposed discount for a D2C brand. All monetary values are in Indian Rupees (₹).
- Original Price: ₹{{{originalPrice}}}
- COGS: ₹{{{cogs}}}
- Discount: {{{discountPercentage}}}%
- Profit After Discount: ₹{{{profitAfterDiscount}}}
- Profit Margin After Discount: {{{profitMarginAfterDiscount}}}%

Your task is to provide an expert analysis for the D2C founder.

**Instructions:**
1.  **Craft a Compelling Headline:** Write a single, impactful sentence that summarizes the situation. For example, "This discount turns your product into a powerful, but risky, customer acquisition tool." or "A safe discount that protects margins while boosting appeal."
2.  **Write a Detailed Analysis:** In HTML format, explain the numbers. Is the margin after discount healthy or dangerous? What is the break-even point? Explain the trade-off between potential sales volume and lower margin. Use HTML tags for structure.
3.  **Provide Actionable Recommendations:** Give 2-3 specific, high-impact recommendations. Should they run this sale? If so, for what purpose? (e.g., clearing old stock, acquiring new customers, rewarding loyal members). If not, what's a better alternative?

Output the result in a single JSON object that strictly adheres to the provided output schema. All monetary values in your output must be prefixed with the '₹' symbol. Do not include any other text or formatting.`,
});

const analyzeDiscountFlow = ai.defineFlow(
  {
    name: 'analyzeDiscountFlow',
    inputSchema: DiscountAnalysisInputSchema,
    outputSchema: DiscountAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("The AI model failed to provide a valid analysis.");
    }
    return output;
  }
);
