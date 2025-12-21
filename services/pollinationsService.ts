
import { generateOptimizedPrompt as mainGenerate } from './aiService';

/**
 * Fallback service - Redirected to the main Gemini-powered service to fix 
 * missing constants errors and ensure reliable high-quality output.
 */
export const generateOptimizedPrompt = mainGenerate;
