
'use server';

import { analyzeRtoLoss, type AnalyzeRtoLossInput, type AnalyzeRtoLossOutput } from '@/ai/flows/rto-loss-analyzer';
import { evaluateCodRisk, type CodRiskInput, type CodRiskOutput } from '@/ai/flows/cod-risk-evaluator';
import { generateBlogPost as generateBlogPostFlow, type GenerateBlogPostInput, type GenerateBlogPostOutput } from '@/ai/flows/blog-post-generator';
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
    // In a real app, you'd integrate with an email service like Mailchimp or ConvertKit here.
    console.log(`Subscribing ${email} to the newsletter.`);
    
    // Simulate a successful subscription
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return { success: true, message: "Thank you for subscribing!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    console.error("Newsletter Subscription Error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function generateBlogPost(title: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
    try {
        const result = await generateBlogPostFlow(title);
        // The result.content is already a string, but if it contained complex HTML,
        // it might need sanitization in a real app before being rendered.
        return result;
    } catch (error) {
        console.error("Error in Blog Post Generation:", error);
        throw new Error("Failed to generate the blog post from AI. Please try a different title.");
    }
}
