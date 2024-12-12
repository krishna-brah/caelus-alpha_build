import { generateCompletion, generateImage, AIResponse } from './openai';
import { PROMPT_TEMPLATES, SYSTEM_INSTRUCTIONS } from './config';

export async function enhanceDesignPrompt(
  userPrompt: string,
  style: string
): Promise<AIResponse> {
  const prompt = PROMPT_TEMPLATES.designEnhancement
    .replace('{userPrompt}', userPrompt)
    .replace('{style}', style);

  return generateCompletion(prompt, SYSTEM_INSTRUCTIONS.designer);
}

export async function analyzeDesign(
  design: string,
  prompt: string
): Promise<AIResponse> {
  const analysisPrompt = PROMPT_TEMPLATES.designAnalysis
    .replace('{design}', design)
    .replace('{prompt}', prompt);

  return generateCompletion(analysisPrompt, SYSTEM_INSTRUCTIONS.designer);
}

export async function generateFashionImage(
  prompt: string,
  style: string
): Promise<AIResponse> {
  const enhancedPrompt = `Create a high-quality, photorealistic fashion design image:
${prompt}
Style: ${style}
Requirements:
- Professional fashion photography style
- Clean background
- Clear details
- Sustainable and eco-friendly appearance
- High-end fashion magazine quality`;

  return generateImage(enhancedPrompt);
}

export async function getFabricRecommendations(
  design: string,
  requirements: string
): Promise<AIResponse> {
  const prompt = PROMPT_TEMPLATES.fabricRecommendation
    .replace('{design}', design)
    .replace('{requirements}', requirements);

  return generateCompletion(prompt, SYSTEM_INSTRUCTIONS.designer);
}

export async function calculateSustainabilityScore(
  design: string,
  materials: string,
  production: string
): Promise<AIResponse> {
  const prompt = PROMPT_TEMPLATES.sustainabilityScore
    .replace('{design}', design)
    .replace('{materials}', materials)
    .replace('{production}', production);

  return generateCompletion(prompt, SYSTEM_INSTRUCTIONS.designer);
}

export async function getMentorFeedback(
  design: string,
  context: string
): Promise<AIResponse> {
  const prompt = `Review this design and provide constructive feedback:

DESIGN: ${design}
CONTEXT: ${context}

Please provide:
1. Overall assessment
2. Technical strengths
3. Areas for improvement
4. Specific recommendations
5. Resources for further development`;

  return generateCompletion(prompt, SYSTEM_INSTRUCTIONS.mentor);
}