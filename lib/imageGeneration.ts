/**
 * Simple fashion design image generation using OpenAI's DALL-E
 * @module imageGeneration
 */

/**
 * Generate a fashion design image using DALL-E
 * @param prompt - The design description
 * @param style - Design style (e.g., "minimalist", "bohemian", etc.)
 * @param apiKey - OpenAI API key
 * @returns Promise<string> - URL of the generated image
 * @throws {Error} If API key or prompt is missing, or if generation fails
 */
export async function generateDesignImage(
  prompt: string, 
  style: string,
  apiKey: string
): Promise<string> {
  if (!apiKey) throw new Error('API key is required');
  if (!prompt) throw new Error('Prompt is required');
  
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Fashion design: ${prompt}\nStyle: ${style}\nPerspective: Full outfit view`,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url"
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate image');
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Image generation error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate design');
  }
}