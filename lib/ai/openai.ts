import { Configuration, OpenAIApi } from 'openai';
import { AI_CONFIG } from './config';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function generateCompletion(
  prompt: string,
  systemInstruction: string,
  options: Partial<typeof AI_CONFIG> = {}
): Promise<AIResponse> {
  try {
    const config = { ...AI_CONFIG, ...options };
    
    const completion = await openai.createChatCompletion({
      model: config.model,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt }
      ],
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      presence_penalty: config.presence_penalty,
      frequency_penalty: config.frequency_penalty,
    });

    if (!completion.data.choices[0]?.message?.content) {
      throw new Error('No response generated');
    }

    return {
      success: true,
      data: completion.data.choices[0].message.content
    };
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate response'
    };
  }
}

export async function generateImage(
  prompt: string,
  size: '256x256' | '512x512' | '1024x1024' = '1024x1024'
): Promise<AIResponse> {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size,
      response_format: 'url',
    });

    if (!response.data.data[0]?.url) {
      throw new Error('No image generated');
    }

    return {
      success: true,
      data: response.data.data[0].url
    };
  } catch (error: any) {
    console.error('OpenAI Image API Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate image'
    };
  }
}