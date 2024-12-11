export interface FormattedResponse {
  data: any;
  metadata: {
    confidenceScore: number;
    processingTime: string;
    modelVersion: string;
    timestamp: string;
  };
  metrics: {
    quality: {
      score: number;
      breakdown: Record<string, number>;
      confidence: number;
    };
    sustainability: {
      score: number;
      breakdown: Record<string, number>;
      certifications: string[];
      impact: {
        water: number;
        carbon: number;
        waste: number;
      };
    };
    designerMetrics?: {
      expertise: {
        level: 'Baseline' | 'Gold' | 'Diamond' | 'Cosmic';
        score: number;
        specializations: string[];
      };
      completedProjects: number;
      averageRating: number;
      sustainabilityScore: number;
    };
  };
  recommendations: {
    primary: {
      title: string;
      description: string;
      reasoning: string;
      implementation: string[];
    };
    alternatives: Array<{
      title: string;
      description: string;
      tradeoffs: {
        benefits: string[];
        limitations: string[];
      };
    }>;
  };
  analysis: {
    technical: {
      properties: Record<string, any>;
      performance: Record<string, number>;
      limitations: string[];
    };
    market: {
      trends: string[];
      opportunities: string[];
      risks: string[];
    };
    sustainability: {
      benefits: string[];
      challenges: string[];
      improvements: string[];
      certifications: string[];
    };
  };
  visualization?: {
    charts: Array<{
      type: string;
      data: any;
      options: any;
    }>;
    comparisons: Array<{
      category: string;
      items: Array<{
        name: string;
        value: number;
        description: string;
      }>;
    }>;
  };
}

export class ResponseFormatter {
  static formatAIResponse(rawResponse: any): FormattedResponse {
    const startTime = process.hrtime();
    
    try {
      const formatted: FormattedResponse = {
        data: rawResponse,
        metadata: {
          confidenceScore: rawResponse.confidence_score || 0,
          processingTime: this.calculateProcessingTime(startTime),
          modelVersion: 'gpt-4',
          timestamp: new Date().toISOString(),
        },
        metrics: this.formatMetrics(rawResponse.metrics),
        recommendations: this.formatRecommendations(rawResponse.recommendations),
        analysis: this.formatAnalysis(rawResponse.analysis),
      };

      if (rawResponse.visualization) {
        formatted.visualization = this.formatVisualization(rawResponse.visualization);
      }

      return formatted;
    } catch (error) {
      console.error('Response Formatting Error:', error);
      throw new Error('Failed to format AI response');
    }
  }

  private static calculateProcessingTime(startTime: [number, number]): string {
    const diff = process.hrtime(startTime);
    return `${(diff[0] * 1000 + diff[1] / 1000000).toFixed(2)}ms`;
  }

  private static formatMetrics(metrics: any) {
    return {
      quality: {
        score: metrics?.quality_score || 0,
        breakdown: metrics?.quality_breakdown || {},
        confidence: metrics?.quality_confidence || 0,
      },
      sustainability: {
        score: metrics?.sustainability_score || 0,
        breakdown: metrics?.sustainability_breakdown || {},
        certifications: metrics?.certifications || [],
        impact: {
          water: metrics?.water_impact || 0,
          carbon: metrics?.carbon_impact || 0,
          waste: metrics?.waste_impact || 0,
        },
      },
      ...(metrics?.designer_metrics && {
        designerMetrics: {
          expertise: {
            level: metrics.designer_metrics.level || 'Baseline',
            score: metrics.designer_metrics.score || 0,
            specializations: metrics.designer_metrics.specializations || [],
          },
          completedProjects: metrics.designer_metrics.completed_projects || 0,
          averageRating: metrics.designer_metrics.average_rating || 0,
          sustainabilityScore: metrics.designer_metrics.sustainability_score || 0,
        },
      }),
    };
  }

  private static formatRecommendations(recommendations: any) {
    return {
      primary: {
        title: recommendations?.primary?.title || '',
        description: recommendations?.primary?.description || '',
        reasoning: recommendations?.primary?.reasoning || '',
        implementation: recommendations?.primary?.implementation || [],
      },
      alternatives: recommendations?.alternatives?.map((alt: any) => ({
        title: alt.title || '',
        description: alt.description || '',
        tradeoffs: {
          benefits: alt.tradeoffs?.benefits || [],
          limitations: alt.tradeoffs?.limitations || [],
        },
      })) || [],
    };
  }

  private static formatAnalysis(analysis: any) {
    return {
      technical: {
        properties: analysis?.technical?.properties || {},
        performance: analysis?.technical?.performance || {},
        limitations: analysis?.technical?.limitations || [],
      },
      market: {
        trends: analysis?.market?.trends || [],
        opportunities: analysis?.market?.opportunities || [],
        risks: analysis?.market?.risks || [],
      },
      sustainability: {
        benefits: analysis?.sustainability?.benefits || [],
        challenges: analysis?.sustainability?.challenges || [],
        improvements: analysis?.sustainability?.improvements || [],
        certifications: analysis?.sustainability?.certifications || [],
      },
    };
  }

  private static formatVisualization(visualization: any) {
    return {
      charts: visualization?.charts?.map((chart: any) => ({
        type: chart.type || 'bar',
        data: chart.data || {},
        options: chart.options || {},
      })) || [],
      comparisons: visualization?.comparisons?.map((comp: any) => ({
        category: comp.category || '',
        items: comp.items?.map((item: any) => ({
          name: item.name || '',
          value: item.value || 0,
          description: item.description || '',
        })) || [],
      })) || [],
    };
  }
}