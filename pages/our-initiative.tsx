import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Eco,
  Psychology,
  Group,
  Autorenew,
  LocalShipping,
  Assessment,
} from '@mui/icons-material';
import Layout from '../components/Layout';

interface SustainabilityMetric {
  title: string;
  value: string;
  description: string;
  icon: string;
}

interface ImpactArea {
  title: string;
  description: string;
  stats: { label: string; value: string }[];
}

export default function OurInitiative() {
  const theme = useTheme();

  const sustainabilityMetrics: SustainabilityMetric[] = [
    {
      title: 'Water Saved',
      value: '2,700L',
      description: 'Average water saved per garment compared to fast fashion',
      icon: '💧',
    },
    {
      title: 'Carbon Reduction',
      value: '60%',
      description: 'Lower carbon footprint through local production',
      icon: '🌱',
    },
    {
      title: 'Waste Reduction',
      value: '90%',
      description: 'Less fabric waste through made-to-order production',
      icon: '♻️',
    },
    {
      title: 'Community Impact',
      value: '1,000+',
      description: 'Local designers supported worldwide',
      icon: '🌍',
    },
  ];

  const impactAreas: ImpactArea[] = [
    {
      title: 'Environmental Impact',
      description: 'Fast fashion is responsible for 10% of global carbon emissions and is the second-largest consumer of water worldwide.',
      stats: [
        { label: 'Annual Textile Waste', value: '92 million tons' },
        { label: 'Water Pollution', value: '20% of global wastewater' },
        { label: 'Microplastic Pollution', value: '35% of ocean microplastics' },
      ],
    },
    {
      title: 'Social Impact',
      description: 'The fashion industry employs over 75 million people worldwide, many of whom work in unsafe conditions with unfair wages.',
      stats: [
        { label: 'Workers Impacted', value: '75 million+' },
        { label: 'Fair Wage Gap', value: '45-65% below living wage' },
        { label: 'Child Labor', value: '1 in 10 workers' },
      ],
    },
  ];

  const initiatives = [
    {
      title: 'AI-Powered Design',
      description: 'Leveraging artificial intelligence to create innovative, sustainable fashion designs.',
      icon: <Psychology />,
    },
    {
      title: 'Community Collaboration',
      description: 'Building a network of designers and consumers committed to sustainable fashion.',
      icon: <Group />,
    },
    {
      title: 'Sustainable Materials',
      description: 'Promoting the use of eco-friendly and recycled materials in fashion.',
      icon: <Eco />,
    },
    {
      title: 'Circular Fashion',
      description: 'Supporting a circular economy in fashion through reuse and recycling.',
      icon: <Autorenew />,
    },
    {
      title: 'Ethical Production',
      description: 'Ensuring fair labor practices and sustainable production methods.',
      icon: <LocalShipping />,
    },
    {
      title: 'Impact Tracking',
      description: 'Measuring and reporting the environmental impact of fashion choices.',
      icon: <Assessment />,
    },
  ];

  return (
    <Layout>
      <Box
        sx={{
          bgcolor: 'background.default',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Paper
            elevation={3}
            sx={{
              p: 6,
              mb: 6,
              background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
              color: 'white',
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
            >
              Our Initiative
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Revolutionizing the fashion industry through sustainable innovation
              and AI-powered design.
            </Typography>
          </Paper>

          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Mission Statement */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  At Caelus, we're committed to transforming the fashion industry
                  through sustainable practices, innovative technology, and
                  community collaboration. Our platform brings together designers,
                  consumers, and AI to create a more sustainable and ethical
                  fashion ecosystem.
                </Typography>
              </Paper>
            </Grid>

            {/* Sustainability Metrics */}
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Our Impact in Numbers
              </Typography>
              <Grid container spacing={3}>
                {sustainabilityMetrics.map((metric) => (
                  <Grid item xs={12} sm={6} md={3} key={metric.title}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h1" align="center" sx={{ fontSize: '3rem', mb: 2 }}>
                        {metric.icon}
                      </Typography>
                      <Typography variant="h5" align="center" gutterBottom>
                        {metric.value}
                      </Typography>
                      <Typography variant="subtitle1" align="center">
                        {metric.title}
                      </Typography>
                      <Typography variant="body2" align="center" sx={{ mt: 2, opacity: 0.8 }}>
                        {metric.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Initiatives Grid */}
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Key Initiatives
              </Typography>
              <Grid container spacing={3}>
                {initiatives.map((initiative) => (
                  <Grid item xs={12} md={4} key={initiative.title}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ mr: 2, color: 'primary.main' }}>
                            {initiative.icon}
                          </Box>
                          <Typography variant="h6">{initiative.title}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {initiative.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Impact Areas */}
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Industry Impact
              </Typography>
              <Grid container spacing={4}>
                {impactAreas.map((area) => (
                  <Grid item xs={12} md={6} key={area.title}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          {area.title}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {area.description}
                        </Typography>
                        {area.stats.map((stat) => (
                          <Box key={stat.label} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)">
                              {stat.label}
                            </Typography>
                            <Typography variant="h6" color="error">
                              {stat.value}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Call to Action */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 4,
                  mt: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                  color: 'white',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Join Our Initiative
                </Typography>
                <Typography variant="body1" paragraph>
                  Be part of the sustainable fashion revolution
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}