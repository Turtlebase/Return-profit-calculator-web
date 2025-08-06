
'use server';

/**
 * @fileOverview An AI agent to generate a complete D2C expert blog post from a title.
 *
 * - generateBlogPost - A function that handles blog post generation.
 * - GenerateBlogPostInput - The input type for the function.
 * - GenerateBlogPostOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generate } from 'genkit';

const GenerateBlogPostInputSchema = z.string().describe('The title of the blog post to generate.');
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('The final, SEO-optimized title of the blog post.'),
  slug: z.string().describe('A URL-friendly slug for the blog post, e.g., "how-to-do-something".'),
  description: z.string().describe('A meta description for SEO purposes, summarizing the blog post in 1-2 sentences.'),
  category: z.string().describe('The most relevant category for the blog post, e.g., "Profitability", "Marketing", "RTO Reduction".'),
  content: z.string().describe('The full content of the blog post in HTML format. It should be well-structured with h3, p, ul, ol, and blockquote tags.'),
  dataAiHint: z.string().describe('Two keywords separated by a space for the generated thumbnail image. e.g. "business analytics"'),
  image: z.string().describe("A data URI of a generated thumbnail image. Format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;


export async function generateBlogPost(title: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(title);
}

const blogPostPrompt = ai.definePrompt({
  name: 'blogPostPrompt',
  input: { schema: GenerateBlogPostInputSchema },
  output: { schema: z.object({
    title: GenerateBlogPostOutputSchema.shape.title,
    slug: GenerateBlogPostOutputSchema.shape.slug,
    description: GenerateBlogPostOutputSchema.shape.description,
    category: GenerateBlogPostOutputSchema.shape.category,
    content: GenerateBlogPostOutputSchema.shape.content,
    dataAiHint: GenerateBlogPostOutputSchema.shape.dataAiHint,
  }) },
  prompt: `You are a world-class expert in D2C e-commerce, with a special focus on the Indian market. Your writing style is authoritative, insightful, and highly practical. You break down complex topics into actionable advice.

  Your task is to write a complete, in-depth, SEO-optimized blog post based on the following title:
  "{{{json input}}}"

  **Instructions:**
  1.  **Analyze the Title:** Deconstruct the user's title to understand the core problem and the target audience.
  2.  **Structure the Post:** Create a logical flow. Start with a compelling introduction that hooks the reader, develop the main points in the body, and end with a strong conclusion with a clear takeaway. Use HTML tags like <h3> for subheadings, <p> for paragraphs, <ul> and <ol> for lists, and <blockquote> for highlighting key insights.
  3.  **Content:** Provide deep, expert-level analysis. Use realistic examples, data points (even if illustrative), and case studies relevant to D2C brands.
  4.  **SEO Optimization:**
      *   Refine the title to be more engaging and keyword-rich if needed.
      *   Create a URL-friendly slug.
      *   Write a concise meta description.
      *   Determine the best category from: "Profitability", "RTO Reduction", "Marketing", "Operations", "Customer Experience".
  5.  **Thumbnail Hint:** Provide two keywords that visually represent the article's core theme. This will be used to generate a thumbnail. Example: "ecommerce logistics" or "financial chart".

  Output the result in a single JSON object that strictly adheres to the provided output schema. Do not include any other text or formatting.`,
});

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async (title) => {
    // Step 1: Generate the text content of the blog post.
    const { output: textOutput } = await blogPostPrompt(title);
    if (!textOutput) {
      throw new Error('Failed to generate blog post content.');
    }

    // Step 2: Generate the thumbnail image based on the data hint.
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a visually appealing, professional blog thumbnail for an article about D2C e-commerce. The theme is: ${textOutput.dataAiHint}. The style should be modern, clean, and use a professional color palette. No text on the image.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Failed to generate thumbnail image.');
    }

    // Step 3: Combine text and image into the final output.
    return {
      ...textOutput,
      image: media.url,
    };
  }
);
