interface PromptParams {
  context: string;
  data: any;
  requirements?: string[];
  constraints?: string[];
  preferences?: Record<string, any>;
  previousSuggestions?: string[];
}

interface StructuredData {
  [key: string]: any;
}

export class AIPromptGenerator {
  static generateDetailedPrompt({
    context,
    data,
    requirements = [],
    constraints = [],
    preferences = {},
    previousSuggestions = [],
  }: PromptParams): string {
    const structuredData = this.structureData(data);
    const preferencesStr = this.formatPreferences(preferences);
    const historyContext = previousSuggestions.length > 0
      ? `\nPrevious recommendations:\n${previousSuggestions.map(s => `• ${s}`).join('\n')}`
      : '';

    return `
Analyze the following ${context} scenario:

${this.formatStructuredData(structuredData)}

Requirements:
${requirements.map(r => `• ${r}`).join('\n')}

Constraints:
${constraints.map(c => `• ${c}`).join('\n')}

Preferences:
${preferencesStr}
${historyContext}

Consider these specific aspects in your analysis:
1. Environmental Impact
2. Performance Characteristics
3. User Experience
4. Market Viability
5. Innovation Potential
6. Cultural Relevance

Provide a structured response including:
1. Detailed recommendations
2. Technical specifications
3. Sustainability metrics
4. Implementation guidelines
5. Alternative suggestions
6. Risk assessment
7. Future considerations

Format your response as a detailed JSON object with the following structure:
{
  "recommendations": [{
    "title": string,
    "description": string,
    "implementation": string,
    "sustainability_impact": {
      "environmental": number,
      "social": number,
      "economic": number
    },
    "technical_specs": object,
    "risks": string[],
    "alternatives": string[]
  }],
  "metrics": {
    "sustainability_score": number,
    "feasibility_score": number,
    "innovation_score": number,
    "market_potential": number
  },
  "analysis": {
    "strengths": string[],
    "weaknesses": string[],
    "opportunities": string[],
    "threats": string[]
  },
  "future_considerations": string[],
  "confidence_score": number
}`;
  }

  private static structureData(data: any): StructuredData {
    // Convert raw data into structured format
    const structured: StructuredData = {};

    if (typeof data === 'object' && data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          structured[key] = value;
        } else if (typeof value === 'object') {
          structured[key] = this.structureData(value);
        } else {
          structured[key] = value;
        }
      });
    }

    return structured;
  }

  private static formatStructuredData(data: StructuredData): string {
    return Object.entries(data)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}:\n${value.map(v => `  • ${v}`).join('\n')}`;
        } else if (typeof value === 'object') {
          return `${key}:\n${this.formatStructuredData(value).split('\n').map(line => `  ${line}`).join('\n')}`;
        }
        return `${key}: ${value}`;
      })
      .join('\n');
  }

  private static formatPreferences(preferences: Record<string, any>): string {
    return Object.entries(preferences)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${key}:\n${Object.entries(value)
            .map(([subKey, subValue]) => `  • ${subKey}: ${subValue}`)
            .join('\n')}`;
        }
        return `• ${key}: ${value}`;
      })
      .join('\n');
  }

  static generateSustainabilityPrompt(fabricData: any): string {
    return this.generateDetailedPrompt({
      context: 'sustainability',
      data: fabricData,
      requirements: [
        'Detailed lifecycle analysis',
        'Quantifiable environmental metrics',
        'Certification recommendations',
        'Improvement strategies',
      ],
      constraints: [
        'Must meet industry standards',
        'Cost-effective implementation',
        'Scalable solutions',
      ],
    });
  }

  static generateStylePrompt(styleData: any, preferences: any): string {
    return this.generateDetailedPrompt({
      context: 'styling',
      data: styleData,
      requirements: [
        'Versatile outfit combinations',
        'Seasonal adaptability',
        'Sustainable styling practices',
      ],
      preferences,
      constraints: [
        'Must be practical for target market',
        'Align with sustainable practices',
        'Consider cultural sensitivity',
      ],
    });
  }

  static generateTechnicalPrompt(technicalData: any): string {
    return this.generateDetailedPrompt({
      context: 'technical',
      data: technicalData,
      requirements: [
        'Detailed performance metrics',
        'Manufacturing specifications',
        'Quality control parameters',
      ],
      constraints: [
        'Must meet safety standards',
        'Environmentally compliant',
        'Cost-effective production',
      ],
    });
  }

  static generateTrendPrompt(trendData: any): string {
    return this.generateDetailedPrompt({
      context: 'trend',
      data: trendData,
      requirements: [
        'Market trend analysis',
        'Consumer behavior insights',
        'Future projections',
      ],
      constraints: [
        'Evidence-based predictions',
        'Consider global factors',
        'Account for sustainability trends',
      ],
    });
  }
}