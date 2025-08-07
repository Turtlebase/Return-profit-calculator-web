
'use server';

/**
 * @fileOverview An AI agent to analyze Return On Ad Spend (ROAS) for a D2C business.
 *
 * - analyzeRoas - A function that handles the ROAS analysis.
 * - RoasAnalysisInput - The input type for the function.
 * - RoasAnalysisOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RoasAnalysisInputSchema = z.object({
  adSpend: z.number().describe('The total amount spent on advertising.'),
  revenue: z.number().describe('The total revenue generated from that ad spend.'),
  cogsPercent: z.number().describe('The Cost of Goods Sold as a percentage of revenue.'),
  roas: z.number().describe('The calculated ROAS (Revenue / Ad Spend).'),
  netProfit: z.number().describe('The calculated net profit from the campaign.'),
  breakEvenRoas: z.number().describe('The calculated break-even ROAS.'),
});
export type RoasAnalysisInput = z.infer<typeof RoasAnalysisInputSchema>;

const RoasAnalysisOutputSchema = z.object({
  headline: z.string().describe('A single, powerful headline summarizing the key insight from the ROAS analysis.'),
  analysis: z.string().describe('A detailed analysis of the ad campaign\'s profitability, written in HTML format. Explain what the numbers mean. Compare the actual ROAS to the break-even ROAS. Use <p>, <ul>, <li>, and <strong> tags.'),
  recommendations: z.array(z.string()).describe('A list of 2-3 actionable, expert recommendations to improve the ad campaign\'s profitability.'),
});
export type RoasAnalysisOutput = z.infer<typeof RoasAnalysisOutputSchema>;


export async function analyzeRoas(input: RoasAnalysisInput): Promise<RoasAnalysisOutput> {
  return analyzeRoasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeRoasPrompt',
  input: { schema: RoasAnalysisInputSchema },
  output: { schema: RoasAnalysisOutputSchema },
  prompt: `You are a world-class D2C e-commerce performance marketing expert. You live and breathe acronyms like ROAS, CPA, and LTV. You can glance at a campaign's numbers and immediately diagnose its health.

You are analyzing the following ad campaign data:
- Ad Spend: {{{adSpend}}}
- Revenue Generated: {{{revenue}}}
- COGS: {{{cogsPercent}}}%
- **Calculated ROAS:** {{{roas}}}x
- **Net Profit:** {{{netProfit}}}
- **Break-Even ROAS:** {{{breakEvenRoas}}}x

Your task is to provide an expert analysis for the D2C founder.

**Instructions:**
1.  **Craft a Compelling Headline:** Write a single, impactful sentence that tells the founder if their campaign is a winner or a loser. Example: "This campaign is printing money, it's time to scale." or "Warning: You're paying for expensive clicks that aren't turning a profit."
2.  **Write a Detailed Analysis:** In HTML format, break down the numbers. The most important thing is to compare the actual ROAS to the Break-Even ROAS. Are they profitable? By how much? Is the profit margin healthy enough to justify the ad spend? Use HTML tags for structure.
3.  **Provide Actionable Recommendations:** Give 2-3 specific, high-impact recommendations. Should they scale the ad spend? Should they try to improve the ad creative to boost revenue? Or should they work on their landing page conversion rate? Be precise and tactical.

Output the result in a single JSON object that strictly adheres to the provided output schema. Do not include any other text or formatting.`,
});

const analyzeRoasFlow = ai.defineFlow(
  {
    name: 'analyzeRoasFlow',
    inputSchema: RoasAnalysisInputSchema,
    outputSchema: RoasAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("The AI model failed to provide a valid analysis.");
    }
    return output;
  }
);
