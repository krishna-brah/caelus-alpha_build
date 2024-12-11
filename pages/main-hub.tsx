import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import Layout from '../components/Layout';
import { AIStyleQuestionnaire } from '../components/AIStyleQuestionnaire';
import { ImageGenerator } from '../components/ImageGenerator';

export default function MainHub() {
  const theme = useTheme();

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Your Fashion Hub
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore AI-powered design tools, connect with designers, and discover sustainable fashion.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* AI Tools Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                AI Fashion Tools
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Style Analysis</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Get personalized style recommendations powered by AI
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <AIStyleQuestionnaire />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Design Generator</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Create unique fashion designs with AI assistance
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <ImageGenerator />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Featured Designers */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Featured Designers
              </Typography>
              <Grid container spacing={2}>
                {/* Mock featured designers - would be dynamic in real app */}
                {[1, 2, 3].map((designer) => (
                  <Grid item xs={12} sm={6} md={4} key={designer}>
                    <Card>
                      <CardMedia
                        component="div"
                        sx={{
                          height: 140,
                          backgroundColor: theme.palette.grey[200],
                        }}
                      />
                      <CardContent>
                        <Typography variant="h6">Designer {designer}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sustainable fashion specialist
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Trending Styles */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Trending Styles
              </Typography>
              <Box>
                {['Sustainable Chic', 'Urban Minimalist', 'Eco Bohemian'].map((style) => (
                  <Card key={style} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{style}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Trending in sustainable fashion
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}