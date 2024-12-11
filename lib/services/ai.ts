import { Configuration, OpenAIApi } from 'openai';
import { prisma } from '../prisma';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

interface SustainabilityScore {
  environmentalImpact: number;
  waterConsumption: number;
  carbonFootprint: number;
  biodegradability: number;
  recyclingPotential: number;
  overallScore: number;
}

interface StyleRecommendation {
  outfitType: string;
  colorPalette: string[];
  occasion: string;
  seasonalSuitability: string[];
  stylingTips: string[];
  sustainabilityBenefits: string[];
  careInstructions: string[];
}

interface FabricAnalysis {
  sustainabilityScore: SustainabilityScore;
  properties: {
    durability: number;
    breathability: number;
    moisture_wicking: number;
    stretch: number;
    insulation: number;
  };
  bestUses: string[];
  limitations: string[];
  careComplexity: number;
  recommendations: string[];
}

interface FabricSuggestion {
  fabricId: string;
  suggestion: string;
  confidence: number;
  reasoning: string;
}

export class AIService {
  static async generateFabricRecommendation(
    userPreferences: {
      sustainability: number;
      comfort: number;
      durability: number;
      price: number;
      useCase: string;
      style: string;
      seasonalNeeds: string[];
      specialRequirements?: string[];
    }
  ): Promise<FabricSuggestion[]> {
    try {
      const fabrics = await prisma.sustainableFabric.findMany({
        include: {
          products: true,
          aiSuggestions: {
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      const systemPrompt = `You are an expert sustainable fashion consultant with deep knowledge of textile engineering and environmental impact assessment. Your task is to recommend the most suitable sustainable fabrics based on user preferences and needs.`;

      const userPrompt = `Given these user preferences:
      - Sustainability Priority: ${userPreferences.sustainability}/10
      - Comfort Requirements: ${userPreferences.comfort}/10
      - Durability Needs: ${userPreferences.durability}/10
      - Budget Sensitivity: ${userPreferences.price}/10
      - Primary Use Case: ${userPreferences.useCase}
      - Style Preference: ${userPreferences.style}
      - Seasonal Needs: ${userPreferences.seasonalNeeds.join(', ')}
      ${userPreferences.specialRequirements ? `- Special Requirements: ${userPreferences.specialRequirements.join(', ')}` : ''}

      Available sustainable fabrics:
      ${fabrics.map(f => `
      - ${f.name}:
        Description: ${f.description}
        Sustainability Score: ${f.sustainabilityScore}/100
        Properties: ${JSON.stringify(f.properties)}
        Certifications: ${f.certifications.join(', ')}
      `).join('\n')}

      Provide detailed recommendations in JSON format including:
      - fabricId
      - primaryRecommendation (main use case recommendation)
      - sustainabilityBenefits (list of environmental benefits)
      - performanceCharacteristics (how it meets user needs)
      - stylingPotential (versatility and design possibilities)
      - careRequirements (maintenance needs)
      - confidenceScore (0-1)
      - reasoningDetails (comprehensive explanation)`;

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const suggestions = JSON.parse(
        response.data.choices[0]?.message?.content || '[]'
      );

      // Store enhanced AI recommendations
      await Promise.all(
        suggestions.map(async (suggestion: any) => {
          await prisma.aIRecommendation.create({
            data: {
              fabricId: suggestion.fabricId,
              suggestion: suggestion.primaryRecommendation,
              confidence: suggestion.confidenceScore,
              reasoning: suggestion.reasoningDetails,
              metadata: {
                userPreferences,
                sustainabilityBenefits: suggestion.sustainabilityBenefits,
                performanceCharacteristics: suggestion.performanceCharacteristics,
                stylingPotential: suggestion.stylingPotential,
                careRequirements: suggestion.careRequirements,
                timestamp: new Date().toISOString(),
              },
            },
          });
        })
      );

      return suggestions;
    } catch (error) {
      console.error('AI Recommendation Error:', error);
      throw new Error('Failed to generate fabric recommendations');
    }
  }

  static async analyzeSustainability(
    fabricDetails: {
      name: string;
      properties: any;
      productionMethod: string;
      currentCertifications: string[];
      lifecycle: {
        rawMaterials: string;
        manufacturing: string;
        usePhase: string;
        endOfLife: string;
      };
    }
  ): Promise<FabricAnalysis> {
    try {
      const systemPrompt = `You are an environmental impact assessment specialist with expertise in textile sustainability. Provide a comprehensive analysis of the fabric's sustainability profile.`;

      const userPrompt = `Analyze this fabric's sustainability:
      Name: ${fabricDetails.name}
      Properties: ${JSON.stringify(fabricDetails.properties)}
      Production: ${fabricDetails.productionMethod}
      Current Certifications: ${fabricDetails.currentCertifications.join(', ')}
      
      Lifecycle Information:
      - Raw Materials: ${fabricDetails.lifecycle.rawMaterials}
      - Manufacturing: ${fabricDetails.lifecycle.manufacturing}
      - Use Phase: ${fabricDetails.lifecycle.usePhase}
      - End of Life: ${fabricDetails.lifecycle.endOfLife}

      Provide a detailed analysis in JSON format including:
      - Comprehensive sustainability scoring (0-100)
      - Environmental impact metrics
      - Resource consumption analysis
      - Lifecycle assessment
      - Improvement recommendations
      - Potential certification paths`;

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      return JSON.parse(
        response.data.choices[0]?.message?.content || '{}'
      );
    } catch (error) {
      console.error('Sustainability Analysis Error:', error);
      throw new Error('Failed to analyze sustainability');
    }
  }

  static async suggestStyling(
    fabricId: string,
    stylePreferences: {
      season: string;
      occasion: string[];
      style: string;
      colorPreferences: string[];
      sustainabilityPriority: number;
      culturalContext?: string;
      specialConsiderations?: string[];
    }
  ): Promise<StyleRecommendation[]> {
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

      const systemPrompt = `You are a sustainable fashion stylist with expertise in circular fashion and eco-conscious design. Create innovative yet practical styling recommendations that maximize the fabric's sustainable properties.`;

      const userPrompt = `Create styling recommendations for:
      Fabric: ${fabric.name}
      Properties: ${JSON.stringify(fabric.properties)}
      
      Style Preferences:
      - Seasons: ${stylePreferences.season}
      - Occasions: ${stylePreferences.occasion.join(', ')}
      - Style Direction: ${stylePreferences.style}
      - Color Preferences: ${stylePreferences.colorPreferences.join(', ')}
      - Sustainability Priority: ${stylePreferences.sustainabilityPriority}/10
      ${stylePreferences.culturalContext ? `- Cultural Context: ${stylePreferences.culturalContext}` : ''}
      ${stylePreferences.specialConsiderations ? `- Special Considerations: ${stylePreferences.specialConsiderations.join(', ')}` : ''}

      Previous successful styles:
      ${fabric.aiSuggestions.map(s => s.suggestion).join('\n')}

      Provide detailed styling recommendations in JSON format including:
      - Outfit combinations
      - Color palettes
      - Seasonal adaptations
      - Styling tips
      - Sustainability benefits
      - Care instructions
      - Versatility suggestions`;

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.6,
        max_tokens: 1000,
      });

      return JSON.parse(
        response.data.choices[0]?.message?.content || '[]'
      );
    } catch (error) {
      console.error('Styling Suggestion Error:', error);
      throw new Error('Failed to generate styling suggestions');
    }
  }
}