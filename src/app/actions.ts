'use server';

import { analyzeRtoLoss, type AnalyzeRtoLossInput, type AnalyzeRtoLossOutput } from '@/ai/flows/rto-loss-analyzer';
import { evaluateCodRisk, type CodRiskInput, type CodRiskOutput } from '@/ai/flows/cod-risk-evaluator';

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
