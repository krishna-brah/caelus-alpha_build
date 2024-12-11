import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Collapse,
} from '@mui/material';
import {
  generateImage,
  enhanceImagePrompt,
  analyzeGeneratedDesign,
} from '../lib/imageGeneration';

const styleOptions = [
  'Minimalist',
  'Avant-garde',
  'Sustainable Chic',
  'Urban Contemporary',
  'Bohemian',
  'Classic Elegance',
  'Streetwear',
  'Eco-conscious',
];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [designAnalysis, setDesignAnalysis] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');

  const handleGenerate = async () => {
    if (!prompt || !style) {
      setError('Please provide both a prompt and style');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First, enhance the prompt
      const enhanced = await enhanceImagePrompt(
        prompt,
        style,
        process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
      );
      setEnhancedPrompt(enhanced);

      // Generate the image
      const { url } = await generateImage(
        enhanced,
        style,
        process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
      );
      setGeneratedImage(url);

      // Analyze the generated design
      const analysis = await analyzeGeneratedDesign(
        url,
        enhanced,
        process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
      );
      setDesignAnalysis(analysis);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          AI Fashion Design Generator
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Describe your fashion design concept"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., A sustainable summer dress with floral patterns..."
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Design Style</InputLabel>
              <Select
                value={style}
                label="Design Style"
                onChange={(e) => setStyle(e.target.value)}
              >
                {styleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Design'}
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>

        <Collapse in={!!enhancedPrompt || !!generatedImage}>
          <Box sx={{ mt: 4 }}>
            {enhancedPrompt && (
              <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Enhanced Prompt:
                </Typography>
                <Typography>{enhancedPrompt}</Typography>
              </Paper>
            )}

            {generatedImage && (
              <Card sx={{ mt: 3 }}>
                <CardMedia
                  component="img"
                  image={generatedImage}
                  alt="Generated design"
                  sx={{ maxHeight: 500, objectFit: 'contain' }}
                />
                {designAnalysis && (
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Design Analysis
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: 'pre-line' }}
                    >
                      {designAnalysis}
                    </Typography>
                  </CardContent>
                )}
              </Card>
            )}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default ImageGenerator;