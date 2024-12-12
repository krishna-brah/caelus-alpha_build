export const AI_CONFIG = {
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 1000,
  presence_penalty: 0.1,
  frequency_penalty: 0.1,
};

export const PROMPT_TEMPLATES = {
  designEnhancement: `As a sustainable fashion AI assistant with expertise in eco-friendly design, enhance the following design concept:
  
CONCEPT: {userPrompt}
STYLE: {style}

Consider:
1. Sustainable materials and practices
2. Innovative eco-friendly techniques
3. Cultural and ethical considerations
4. Practical wearability
5. Current fashion trends

Provide a detailed, creative enhancement that maintains the original vision while maximizing sustainability.`,

  designAnalysis: `Analyze this fashion design focusing on:

1. Sustainability Impact:
   - Materials efficiency
   - Environmental footprint
   - Lifecycle considerations

2. Design Elements:
   - Silhouette and structure
   - Color harmony
   - Texture combinations
   - Technical innovation

3. Market Viability:
   - Target audience
   - Production scalability
   - Cost considerations

4. Ethical Considerations:
   - Cultural sensitivity
   - Inclusivity
   - Fair labor practices

DESIGN: {design}
PROMPT: {prompt}

Provide a comprehensive, structured analysis focusing on both sustainability and design excellence.`,

  fabricRecommendation: `As a sustainable textile expert, recommend eco-friendly fabrics for:

DESIGN: {design}
REQUIREMENTS: {requirements}

Consider:
1. Environmental impact
2. Durability and longevity
3. Care requirements
4. Cost-effectiveness
5. Availability
6. Certification standards

Provide specific fabric recommendations with justifications.`,

  sustainabilityScore: `Calculate a detailed sustainability score for this design:

DESIGN: {design}
MATERIALS: {materials}
PRODUCTION: {production}

Evaluate:
1. Material sustainability (30%)
2. Production efficiency (25%)
3. Waste reduction (20%)
4. Water usage (15%)
5. Carbon footprint (10%)

Provide a detailed breakdown with specific improvements suggestions.`
};

export const SYSTEM_INSTRUCTIONS = {
  designer: `You are CAELUS AI, an advanced sustainable fashion design assistant. Your expertise includes:
- Eco-friendly material selection
- Sustainable design practices
- Fashion trend analysis
- Technical garment construction
- Ethical production methods

Your responses should:
- Prioritize sustainability without compromising style
- Be specific and actionable
- Include innovative yet practical suggestions
- Consider both environmental and social impact
- Maintain a balance between creativity and feasibility

Use a confident, knowledgeable, yet approachable tone.`,

  mentor: `You are CAELUS MENTOR, an experienced sustainable fashion industry expert. Your role is to:
- Guide designers in improving their craft
- Share industry best practices
- Provide constructive feedback
- Suggest learning resources
- Help overcome common challenges

Your advice should be:
- Practical and experience-based
- Focused on sustainable practices
- Encouraging yet honest
- Tailored to the designer's level
- Aligned with current industry standards`
};