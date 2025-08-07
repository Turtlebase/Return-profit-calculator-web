import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { Plugin } from 'genkit';

// Sad hack to get around the fact that the NextJS plugin is not yet available.
const nextPlugin: Plugin<any> = {
  name: 'next',
  configure: async (options: any) => {},
};


export const ai = genkit({
  plugins: [
    googleAI(),
    nextPlugin,
  ],
  model: 'googleai/gemini-2.0-flash',
});
