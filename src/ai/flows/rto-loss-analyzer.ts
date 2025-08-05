'use server';

/**
 * @fileOverview An AI agent to analyze historical sales and returns data to predict potential RTO loss.
 *
 * - analyzeRtoLoss - A function that handles the RTO loss analysis process.
 * - AnalyzeRtoLossInput - The input type for the analyzeRtoLoss function.
 * - AnalyzeRtoLossOutput - The return type for the analyzeRtoLoss function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRtoLossInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'Historical sales and returns data, including order details, customer information, and return reasons.'
    ),
  marketConditions: z
    .string()
    .describe(
      'Description of current market conditions, including economic factors and competitor activities.'
    ),
});
export type AnalyzeRtoLossInput = z.infer<typeof AnalyzeRtoLossInputSchema>;

const AnalyzeRtoLossOutputSchema = z.object({
  predictedRtoLoss: z.number().describe('The predicted RTO loss amount.'),
  riskFactors: z
    .array(z.string())
    .describe('List of key risk factors contributing to RTO loss.'),
  recommendations: z
    .array(z.string())
    .describe('Recommended strategies to mitigate RTO loss.'),
});
export type AnalyzeRtoLossOutput = z.infer<typeof AnalyzeRtoLossOutputSchema>;

export async function analyzeRtoLoss(input: AnalyzeRtoLossInput): Promise<AnalyzeRtoLossOutput> {
  return analyzeRtoLossFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeRtoLossPrompt',
  input: {schema: AnalyzeRtoLossInputSchema},
  output: {schema: AnalyzeRtoLossOutputSchema},
  prompt: `You are an expert in analyzing RTO (Return to Origin) loss for D2C e-commerce businesses.

  Analyze the provided historical data and market conditions to predict potential RTO loss, identify key risk factors, and recommend strategies to mitigate the loss.

  Historical Data: {{{historicalData}}}
  Market Conditions: {{{marketConditions}}}

  Based on the data and conditions, predict the RTO loss amount, list the contributing risk factors, and suggest actionable recommendations.
  Output the result in JSON format.
  Follow the schema provided.
  `,
});

const analyzeRtoLossFlow = ai.defineFlow(
  {
    name: 'analyzeRtoLossFlow',
    inputSchema: AnalyzeRtoLossInputSchema,
    outputSchema: AnalyzeRtoLossOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
