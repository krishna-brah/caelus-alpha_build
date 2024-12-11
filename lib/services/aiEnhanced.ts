import { Configuration, OpenAIApi } from 'openai';
import { prisma } from '../prisma';
import { generateSystemPrompt } from './aiContext';
import { AIPromptGenerator } from './aiPromptGenerator';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

interface AIAnalysisResult {
  recommendations: Array<{
    title: string;
    description: string;
    implementation: string;
    sustainability_impact: {
      environmental: number;
      social: number;
      economic: number;
    };
    technical_specs: Record<string, any>;
    risks: string[];
    alternatives: string[];
  }>;
  metrics: {
    sustainability_score: number;
    feasibility_score: number;
    innovation_score: number;
    market_potential: number;
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  future_considerations: string[];
  confidence_score: number;
}

export class EnhancedAIService {
  private static async generateAIResponse(
    prompt: string,
    context: string,
    temperature = 0.7
  ): Promise<AIAnalysisResult> {
    try {
      const systemPrompt = generateSystemPrompt(context);
      
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature,
        max_tokens: 2000,
      });

      const result = JSON.parse(
        response.data.choices[0]?.message?.content || '{}'
      );

      return result as AIAnalysisResult;
    } catch (error) {
      console.error('AI Response Generation Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  static async generateComprehensiveAnalysis(
    fabricId: string,
    analysisType: 'sustainability' | 'technical' | 'style' | 'trend'
  ): Promise<AIAnalysisResult> {
    try {
      const fabric = await prisma.sustainableFabric.findUnique({
        where: { id: fabricId },
        include: {
          products: true,
          aiSuggestions: {
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!fabric) throw new Error('Fabric not found');

      let prompt: string;
      switch (analysisType) {
        case 'sustainability':
          prompt = AIPromptGenerator.generateSustainabilityPrompt(fabric);
          break;
        case 'technical':
          prompt = AIPromptGenerator.generateTechnicalPrompt(fabric);
          break;
        case 'style':
          prompt = AIPromptGenerator.generateStylePrompt(fabric, {
            season: 'all',
            occasion: ['casual', 'formal', 'business'],
            style: 'contemporary',
            colorPreferences: ['neutral', 'earth tones'],
          });
          break;
        case 'trend':
          prompt = AIPromptGenerator.generateTrendPrompt({
            fabric,
            marketTrends: await this.getMarketTrends(),
          });
          break;
        default:
          throw new Error('Invalid analysis type');
      }

      const analysis = await this.generateAIResponse(prompt, analysisType);

      // Store analysis in database
      await prisma.aIRecommendation.create({
        data: {
          fabricId,
          suggestion: JSON.stringify(analysis.recommendations),
          confidence: analysis.confidence_score,
          reasoning: JSON.stringify(analysis.analysis),
          metadata: {
            type: analysisType,
            metrics: analysis.metrics,
            future_considerations: analysis.future_considerations,
            timestamp: new Date().toISOString(),
          },
        },
      });

      return analysis;
    } catch (error) {
      console.error('Comprehensive Analysis Error:', error);
      throw error;
    }
  }

  private static async getMarketTrends() {
    // Here you could integrate with external APIs or databases
    // for real market trend data
    return {
      currentTrends: [
        'sustainable luxury',
        'circular fashion',
        'bio-based materials',
        'zero-waste design',
      ],
      emergingTechnologies: [
        'blockchain traceability',
        'digital product passports',
        'AI-powered design',
        'biotextiles',
      ],
      consumerBehavior: [
        'increased sustainability awareness',
        'preference for transparency',
        'demand for ethical production',
        'interest in innovative materials',
      ],
    };
  }

  static async generateDesignSuggestions(
    fabricId: string,
    designParameters: {
      style: string;
      function: string;
      sustainability_priority: number;
      innovation_level: number;
      market_segment: string;
      price_point: string;
    }
  ): Promise<AIAnalysisResult> {
    try {
      const fabric = await prisma.sustainableFabric.findUnique({
        where: { id: fabricId },
        include: { products: true },
      });

      if (!fabric) throw new Error('Fabric not found');

      const prompt = AIPromptGenerator.generateDetailedPrompt({
        context: 'design',
        data: {
          fabric,
          parameters: designParameters,
        },
        requirements: [
          'Innovative design solutions',
          'Sustainable construction methods',
          'Material efficiency',
          'Market viability',
        ],
        constraints: [
          'Must be producible at scale',
          'Meet sustainability targets',
          'Within target price range',
          'Suitable for target market',
        ],
        preferences: designParameters,
      });

      const suggestions = await this.generateAIResponse(prompt, 'design', 0.8);

      // Store design suggestions
      await prisma.aIRecommendation.create({
        data: {
          fabricId,
          suggestion: JSON.stringify(suggestions.recommendations),
          confidence: suggestions.confidence_score,
          reasoning: JSON.stringify(suggestions.analysis),
          metadata: {
            type: 'design',
            parameters: designParameters,
            metrics: suggestions.metrics,
            timestamp: new Date().toISOString(),
          },
        },
      });

      return suggestions;
    } catch (error) {
      console.error('Design Suggestion Error:', error);
      throw error;
    }
  }

  static async generateCustomerRecommendations(
    fabricId: string,
    customerProfile: {
      style_preferences: string[];
      sustainability_importance: number;
      budget_range: string;
      lifestyle: string[];
      size_preferences: string;
      color_preferences: string[];
      special_requirements?: string[];
    }
  ): Promise<AIAnalysisResult> {
    try {
      const fabric = await prisma.sustainableFabric.findUnique({
        where: { id: fabricId },
        include: { 
          products: {
            where: {
              // Add relevant product filters based on customer profile
            },
          },
        },
      });

      if (!fabric) throw new Error('Fabric not found');

      const prompt = AIPromptGenerator.generateDetailedPrompt({
        context: 'styling',
        data: {
          fabric,
          customer: customerProfile,
        },
        requirements: [
          'Personalized style recommendations',
          'Sustainable styling options',
          'Budget-conscious suggestions',
          'Lifestyle-appropriate choices',
        ],
        preferences: customerProfile,
      });

      const recommendations = await this.generateAIResponse(prompt, 'styling', 0.6);

      // Store customer recommendations
      await prisma.aIRecommendation.create({
        data: {
          fabricId,
          suggestion: JSON.stringify(recommendations.recommendations),
          confidence: recommendations.confidence_score,
          reasoning: JSON.stringify(recommendations.analysis),
          metadata: {
            type: 'customer',
            customerProfile,
            metrics: recommendations.metrics,
            timestamp: new Date().toISOString(),
          },
        },
      });

      return recommendations;
    } catch (error) {
      console.error('Customer Recommendation Error:', error);
      throw error;
    }
  }
}