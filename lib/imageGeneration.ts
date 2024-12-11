interface GenerationResponseData {
  revised_prompt: string;
  url: string;
}

export async function generateImage(
  prompt: string,
  style: string,
  apiKey: string
): Promise<GenerationResponseData> {
  const enhancedPrompt = `
    Fashion design concept: ${prompt}
    Style: ${style}
    Perspective: Full outfit view
    Include: Detailed fabric textures, style elements, and sustainable design features
  `;

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate image');
  }

  const data = await response.json();
  return {
    revised_prompt: data.data[0].revised_prompt,
    url: data.data[0].url,
  };
}

export async function enhanceImagePrompt(
  basePrompt: string,
  style: string,
  apiKey: string
): Promise<string> {
  const prompt = `
    Enhance this fashion design prompt for AI image generation:
    Base concept: ${basePrompt}
    Style direction: ${style}

    Please provide a detailed, clear prompt that includes:
    1. Specific design elements
    2. Material and texture details
    3. Style and aesthetic elements
    4. Sustainable features
    5. Technical fashion terminology
    
    Keep the prompt clear and focused on fashion design visualization.
  `;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion design expert helping to create detailed prompts for AI image generation.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to enhance prompt');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function analyzeGeneratedDesign(
  imageUrl: string,
  originalPrompt: string,
  apiKey: string
): Promise<string> {
  const prompt = `
    Analyze this AI-generated fashion design:
    Original Prompt: ${originalPrompt}
    Image URL: ${imageUrl}

    Please provide:
    1. Design elements analysis
    2. Sustainability assessment
    3. Style compatibility
    4. Potential improvements
    5. Production considerations

    Focus on practical fashion design insights.
  `;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion design expert analyzing AI-generated fashion designs.',
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: imageUrl },
          ],
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze design');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}