
'use server';

import { analyzeRtoLoss, type AnalyzeRtoLossInput, type AnalyzeRtoLossOutput } from '@/ai/flows/rto-loss-analyzer';
import { evaluateCodRisk, type CodRiskInput, type CodRiskOutput } from '@/ai/flows/cod-risk-evaluator';
import { z } from 'zod';

export async function getRtoLossAnalysis(input: AnalyzeRtoLossInput): Promise<AnalyzeRtoLossOutput> {
  try {
    const result = await analyzeRtoLoss(input);
    return result;
  } catch (error) {
    console.error("Error in RTO Loss Analysis:", error);
    throw new Error("Failed to get analysis from AI. Please try again later.");
  }
}

export async function getCodRiskAnalysis(input: CodRiskInput): Promise<CodRiskOutput> {
  try {
    const result = await evaluateCodRisk(input);
    return result;
  } catch (error) {
    console.error("Error in COD Risk Evaluation:", error);
    throw new Error("Failed to get analysis from AI. Please try again later.");
  }
}

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean, message: string }> {
  try {
    emailSchema.parse(email);
    
    const MAILBLUSTER_API_KEY = process.env.MAILBLUSTER_API_KEY;

    if (!MAILBLUSTER_API_KEY) {
      console.error("MailBluster API key is not configured.");
      return { success: false, message: "Newsletter service is not configured." };
    }

    const response = await fetch('https://api.mailbluster.com/api/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': MAILBLUSTER_API_KEY
        },
        body: JSON.stringify({
            email: email,
            subscribed: true,
            addTags: ['Website Signup']
        })
    });

    const data = await response.json();

    if (!response.ok || data.message !== 'Lead created') {
        console.error("MailBluster API Error:", data.message);
        // Provide a user-friendly error message
        const errorMessage = data.errors?.email?.[0] || "Could not subscribe. Please try again later.";
        return { success: false, message: errorMessage };
    }

    return { success: true, message: "Thank you for subscribing!" };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    console.error("Newsletter Subscription Error:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
