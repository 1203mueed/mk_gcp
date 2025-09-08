import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Button
} from '@mui/material';
import {
  Psychology,
  CheckCircle,
  LocationOn,
  Image,
  BarChart,
  Map
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

function AboutUs() {
  const theme = useTheme();

  const features = [
    {
      title: "Citizen Reporting",
      description: "Citizens can easily report waste by taking a photo through our user-friendly mobile interface.",
      icon: <Image sx={{ fontSize: 40 }} />
    },
    {
      title: "AI Detection",
      description: "Our YOLOv8 model automatically detects garbage, calculates area and volume from the submitted images.",
      icon: <Psychology sx={{ fontSize: 40 }} />
    },
    {
      title: "Location Tracking",
      description: "Precise location data is captured to help authorities pinpoint exactly where waste needs to be collected.",
      icon: <LocationOn sx={{ fontSize: 40 }} />
    },
    {
      title: "Data Analytics",
      description: "Authorities receive detailed reports with AI-processed information to make informed decisions.",
      icon: <BarChart sx={{ fontSize: 40 }} />
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #09418c 0%, #48bc19 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                mb: 3
              }}
            >
              About Moyla KothAI
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{
                opacity: 0.9,
                fontWeight: 300,
                mb: 4
              }}
            >
              Creating transparency between citizens and authorities through AI-powered waste management
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2, color: '#09418c' }}
            >
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              Moyla KothAI is dedicated to revolutionizing waste management through cutting-edge AI technology. 
              Our platform bridges the gap between citizens and municipal authorities, creating a transparent 
              and efficient system for waste reporting and collection.
            </Typography>
            <Typography variant="body1" paragraph>
              We believe that clean cities are built on collaboration. By empowering citizens to easily report 
              waste issues and providing authorities with detailed, AI-processed information, we're creating 
              a more responsive and effective waste management ecosystem.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/snap_and_report.png"
              alt="Moyla KothAI Platform"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: theme.shadows[10],
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box
        sx={{
          bgcolor: alpha('#48bc19', 0.05),
          py: { xs: 8, md: 12 }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2, color: '#09418c' }}
          >
            How Moyla KothAI Works
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
          >
            Our platform creates a seamless connection between citizens and authorities, 
            powered by advanced AI technology.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        color: '#48bc19',
                        mb: 2
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Technology Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/org_image_vs_processed_img.png"
              alt="AI Processing"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: theme.shadows[10],
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2, color: '#09418c' }}
            >
              Our Technology
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              At the heart of Moyla KothAI is our advanced YOLOv8 computer vision model. When citizens 
              submit photos of waste, our AI instantly processes the images to:
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ color: '#48bc19', mr: 1 }} />
                <Typography variant="body1">Detect and classify different types of waste</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ color: '#48bc19', mr: 1 }} />
                <Typography variant="body1">Calculate the area covered by waste</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ color: '#48bc19', mr: 1 }} />
                <Typography variant="body1">Estimate the volume of waste</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ color: '#48bc19', mr: 1 }} />
                <Typography variant="body1">Prioritize reports based on severity</Typography>
              </Box>
            </Box>
            <Typography variant="body1">
              This detailed information, combined with precise location data, gives authorities 
              everything they need to efficiently allocate resources and address waste issues.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Transparency Section */}
      <Box
        sx={{
          bgcolor: alpha('#09418c', 0.05),
          py: { xs: 8, md: 12 }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2, color: '#09418c' }}
          >
            Creating Transparency
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
          >
            Moyla KothAI bridges the gap between citizens and authorities, creating accountability 
            and trust through transparent waste management.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#09418c', mb: 2 }}>
                  For Citizens
                </Typography>
                <Typography variant="body1" paragraph>
                  Our platform empowers citizens to take an active role in keeping their communities clean:
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ color: '#48bc19', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Easy reporting through a simple photo submission</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ color: '#48bc19', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Track the status of reported issues</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ color: '#48bc19', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Receive notifications when issues are resolved</Typography>
                  </Box>
                </Box>
                <Box
                  component="img"
                  src="/assets/images/citizen_dashboard.png"
                  alt="Citizen Dashboard"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    mt: 2
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#09418c', mb: 2 }}>
                  For Authorities
                </Typography>
                <Typography variant="body1" paragraph>
                  Municipal authorities gain powerful tools to manage waste collection efficiently:
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ color: '#48bc19', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Comprehensive dashboard with AI-processed reports</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ color: '#48bc19', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Data-driven insights for resource allocation</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ color: '#48bc19', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">Track collection progress and team performance</Typography>
                  </Box>
                </Box>
                <Box
                  component="img"
                  src="/assets/images/authority_dashboard.png"
                  alt="Authority Dashboard"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    mt: 2
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Live Heatmap Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2, color: '#09418c' }}
        >
          Live Heatmap Visualization
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          Explore real-time waste distribution across the city with our interactive heatmap technology
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                p: 4, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: theme.shadows[10],
                borderRadius: 2,
                background: `linear-gradient(135deg, ${alpha('#09418c', 0.05)} 0%, ${alpha('#48bc19', 0.05)} 100%)`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[15],
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ color: '#09418c', fontWeight: 600, mb: 3 }}>
                Explore Our Live Heatmap
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Our interactive heatmap provides a real-time visualization of waste distribution across the city. 
                See where waste is concentrated, track cleanup progress, and identify priority areas at a glance.
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ color: '#48bc19', mr: 1.5 }} />
                  <Typography variant="body1">View real-time waste reports from citizens</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ color: '#48bc19', mr: 1.5 }} />
                  <Typography variant="body1">Identify high-priority areas that need attention</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ color: '#48bc19', mr: 1.5 }} />
                  <Typography variant="body1">Monitor waste management progress over time</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 'auto' }}>
                <Button
                  component={Link}
                  to="/heatmap"
                  variant="contained"
                  size="large"
                  startIcon={<Map />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    backgroundColor: '#48bc19',
                    '&:hover': {
                      backgroundColor: '#3a9a15',
                    }
                  }}
                >
                  View Live Heatmap
                </Button>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/heatmap.png"
              alt="Live Heatmap Visualization"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: theme.shadows[10],
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Created By Section */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, mb: 4, color: '#09418c' }}
        >
          Created by Triliant Data
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box
            component="img"
            src="/triliantDatalogo.png"
            alt="Triliant Data Logo"
            sx={{
              height: 100,
              width: 'auto',
              mx: 'auto'
            }}
          />
        </Box>
        
        <Typography
          variant="body1"
          paragraph
          sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
        >
          Moyla KothAI is proudly developed by Triliant Data, a leading provider of AI-powered 
          solutions for smart cities and environmental management. Our team combines expertise 
          in artificial intelligence, computer vision, and urban planning to create innovative 
          solutions for today's challenges.
        </Typography>
        
        <Button
          component={Link}
          to="/why-our-solution"
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            backgroundColor: '#48bc19',
            '&:hover': {
              backgroundColor: '#3a9a15',
            }
          }}
        >
          Discover Our Solution
        </Button>
      </Container>
    </Box>
  );
}

export default AboutUs;