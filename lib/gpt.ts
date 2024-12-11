export async function generateStyleAnalysis(
  preferences: string,
  measurements: string,
  additionalContext: string,
  apiKey: string
): Promise<string> {
  const prompt = `
    As a professional fashion consultant, analyze the following style preferences and provide personalized recommendations:

    ${preferences}

    ${measurements ? `Measurements: ${measurements}` : ''}

    Additional Context: ${additionalContext}

    Please provide:
    1. Overall style direction
    2. Key pieces to invest in
    3. Color palette recommendations
    4. Sustainable fashion suggestions
    5. Specific designer/brand recommendations
    6. Styling tips
    
    Focus on sustainable and eco-friendly options while maintaining the desired aesthetic.
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
          content: 'You are a professional fashion consultant with expertise in sustainable fashion and personal styling.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate style analysis');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function generateSustainabilityScore(
  designDetails: string,
  materialsUsed: string,
  productionMethod: string,
  apiKey: string
): Promise<{
  score: number;
  breakdown: {
    materials: number;
    production: number;
    longevity: number;
  };
  recommendations: string[];
}> {
  const prompt = `
    Analyze the following fashion item's sustainability metrics:

    Design Details: ${designDetails}
    Materials Used: ${materialsUsed}
    Production Method: ${productionMethod}

    Provide a detailed sustainability analysis with:
    1. Overall sustainability score (0-10)
    2. Breakdown of scores for:
       - Materials sustainability (0-10)
       - Production efficiency (0-10)
       - Expected product longevity (0-10)
    3. Three specific recommendations for improvement

    Format the response as JSON.
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
          content: 'You are a sustainability expert in the fashion industry. Provide numerical scores and actionable recommendations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate sustainability score');
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}