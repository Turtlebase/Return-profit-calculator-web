'use server';

/**
 * @fileOverview An AI agent to evaluate the risk associated with Cash on Delivery (COD) orders.
 *
 * - evaluateCodRisk - A function that handles the COD risk evaluation process.
 * - CodRiskInput - The input type for the evaluateCodRisk function.
 * - CodRiskOutput - The return type for the evaluateCodRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generate } from 'genkit';

const CodRiskInputSchema = z.object({
  orderValue: z.number().describe('The total value of the order.'),
  customerHistory: z
    .string()
    .describe(
      'A summary of the customer\'s past order history, e.g., "First-time customer", "3 previous orders, 1 return", "Loyal customer with 10+ orders".'
    ),
  shippingAddress: z
    .string()
    .describe(
      'The shipping address, including city and pincode, for risk assessment based on location.'
    ),
  productCategory: z
    .string()
    .describe('The category of the products in the order, e.g., "Electronics", "Fashion", "Perishables".'),
});
export type CodRiskInput = z.infer<typeof CodRiskInputSchema>;

const CodRiskOutputSchema = z.object({
  riskLevel: z
    .enum(['Low', 'Medium', 'High'])
    .describe('The assessed risk level for the COD order.'),
  riskScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A numerical risk score from 0 (lowest) to 100 (highest).'),
  riskFactors: z
    .array(z.string())
    .describe('A list of factors contributing to the assessed risk.'),
  recommendation: z
    .string()
    .describe(
      'A clear recommendation, e.g., "Approve COD", "Request partial prepayment", "Convert to prepaid".'
    ),
});
export type CodRiskOutput = z.infer<typeof CodRiskOutputSchema>;

export async function evaluateCodRisk(input: CodRiskInput): Promise<CodRiskOutput> {
  return evaluateCodRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateCodRiskPrompt',
  input: {schema: CodRiskInputSchema},
  output: {schema: CodRiskOutputSchema},
  prompt: `You are an expert risk analyst for D2C e-commerce, specializing in Indian market. Your task is to evaluate the risk of a Cash on Delivery (COD) order based on the provided data.

  Analyze the following information:
  - Order Value: {{{orderValue}}}
  - Customer History: {{{customerHistory}}}
  - Shipping Address / Pincode: {{{shippingAddress}}}
  - Product Category: {{{productCategory}}}

  Based on this, determine the risk level (Low, Medium, High), a risk score (0-100), the key contributing factors, and provide a concrete recommendation.

  Consider these factors:
  - High order values are riskier.
  - First-time customers are riskier than returning customers.
  - Certain pincodes or regions are known for higher RTO rates.
  - High-demand or easily resalable items (like electronics) can be riskier.

  Output the result in JSON format, adhering strictly to the provided schema.
  `,
});

const evaluateCodRiskFlow = ai.defineFlow(
  {
    name: 'evaluateCodRiskFlow',
    inputSchema: CodRiskInputSchema,
    outputSchema: CodRiskOutputSchema,
  },
  async (input) => {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const { output } = await prompt(input);
        if (output) {
          // Validate the output against the schema
          const validation = CodRiskOutputSchema.safeParse(output);
          if (validation.success) {
            return validation.data;
          }
        }
      } catch (e) {
        console.error(`Attempt ${attempts + 1} failed:`, e);
      }
      attempts++;
    }
    
    throw new Error("The AI model failed to provide a valid risk evaluation after multiple attempts. Please try again later.");
  }
);
