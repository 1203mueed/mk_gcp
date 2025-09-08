import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  alpha,
  Chip,
  Fade,
} from '@mui/material';
import Iridescence from '../ui/Iridescence';
import Threads from '../ui/Threads';
import {
  Report,
  Dashboard,
  Map,
  ArrowForward,
  PlayArrow,
  People,
  SmartToy,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Report sx={{ fontSize: 60 }} />,
      title: 'Smart Reporting',
      subtitle: 'AI-Powered Waste Detection',
      description: 'Upload images and let our advanced AI automatically detect, classify, and estimate waste volume with 95%+ accuracy.',
      image: '/assets/images/snap_and_report.png',
      color: '#09418c',
      stats: ['95%+ Accuracy', 'Real-time Processing', 'Volume Estimation']
    },
    {
      icon: <Map sx={{ fontSize: 60 }} />,
      title: 'Interactive Heatmap',
      subtitle: 'Real-time Waste Visualization',
      description: 'Visualize waste distribution across the city with our interactive heatmap. See real-time data and priority zones.',
      image: '/assets/images/heatmap.png',
      color: '#48bc19',
      stats: ['Live Updates', 'Priority Zones', 'Historical Data']
    },
    {
      icon: <Dashboard sx={{ fontSize: 60 }} />,
      title: 'Authority Dashboard',
      subtitle: 'Comprehensive Management',
      description: 'Powerful dashboard for municipal authorities to manage, assign, and track waste cleanup operations.',
      image: '/assets/images/authority_dashboard.png',
      color: '#d32f2f',
      stats: ['Team Management', 'Resource Allocation', 'Performance Tracking']
    },
    {
      icon: <People sx={{ fontSize: 60 }} />,
      title: 'Citizen Dashboard',
      subtitle: 'User-Friendly Interface',
      description: 'Intuitive interface for citizens to report waste, track progress, and engage with the community.',
      image: '/assets/images/citizen_dashboard.png',
      color: '#ff9800',
      stats: ['Easy Reporting', 'Progress Tracking', 'Community Impact']
    },
    {
      icon: <SmartToy sx={{ fontSize: 60 }} />,
      title: 'AI-Powered Detection',
      subtitle: 'Advanced Computer Vision',
      description: 'State-of-the-art computer vision technology that automatically identifies and classifies different types of waste.',
      image: '/assets/images/org_image_vs_processed_img.png',
      color: '#9c27b0',
      stats: ['Computer Vision', 'Machine Learning', 'Continuous Improvement']
    },
    {
      icon: <PlayArrow sx={{ fontSize: 60 }} />,
      title: 'Real-Time API for Waste Monitoring',
      subtitle: 'Live Data Integration',
      description: 'A real-time API serves live waste image data, enabling integration with any device, including cameras mounted on vehicles or other monitoring equipment.',
      image: '/assets/images/heatmap.png',
      color: '#2196f3',
      stats: ['Live Data', 'Device Integration', 'Vehicle Mounting']
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #09418c 0%, #48bc19 100%)`,
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Iridescence Effect */}
        <Iridescence 
          color={[0.2, 1, 0.8]} 
          mouseReact={false} 
          amplitude={0.1} 
          speed={1.0} 
        />
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
            `,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', maxWidth: '900px', mx: 'auto' }}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 5px rgba(0,0,0,0.7)',
                  letterSpacing: '0.02em'
                }}
              >
                ময়লা কোথAI
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  mb: 4,
                  opacity: 1,
                  textShadow: '0 2px 10px rgba(0,0,0,0.4)'
                }}
              >
                Smart Waste Management for Modern Cities
              </Typography>
              <Typography
                variant="h6"
                paragraph
                sx={{
                  opacity: 1,
                  fontWeight: 400,
                  mb: 6,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  padding: '12px',
                  borderRadius: '8px'
                }}
              >
                Empowering citizens and authorities with AI-powered waste detection, 
                real-time reporting, and intelligent priority management.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
                {isAuthenticated ? (
                  <Button
                    component={Link}
                    to="/dashboard"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.2rem',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.2rem',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    Get Started
                  </Button>
                )}
                
                <Button
                  component={Link}
                  to="/why-our-solution"
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.2rem',
                    borderColor: 'white',
                    color: 'white',
                    borderWidth: 2,
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  Why Our Solution
                </Button>
              </Box>

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { number: '95%+', label: 'AI Accuracy' },
                  { number: '60%', label: 'Faster Response' }
                ].map((stat, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 1, fontWeight: 500, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              {/* Mobile App Coming Soon Text */}
              <Box sx={{ mt: 5, mb: 2, textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-block',
                    position: 'relative',
                    padding: '5px',
                    borderRadius: '35px',
                    background: 'linear-gradient(45deg, #48bc19, #09418c, #48bc19)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientBg 3s ease infinite',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(72,188,25,0.5)',
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 900, 
                      color: '#ffffff',
                      letterSpacing: '0.05em',
                      animation: 'pulse 2s infinite',
                      display: 'inline-block',
                      padding: '12px 25px',
                      border: '4px solid #ffffff',
                      borderRadius: '30px',
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(9,65,140,0.4)',
                      fontSize: '2rem',
                      position: 'relative',
                      zIndex: 2,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}
                  >
                    ✨ Mobile App Coming Soon! ✨
                  </Typography>
                </Box>
              </Box>
              
              <style jsx>{`
                @keyframes pulse {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.95; transform: scale(1.05); }
                }
                @keyframes gradientBg {
                  0% { background-position: 0% 50% }
                  50% { background-position: 100% 50% }
                  100% { background-position: 0% 50% }
                }
              `}</style>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2, color: '#09418c' }}
        >
          Powerful Features
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Our comprehensive platform combines AI technology with user-friendly interfaces 
          to revolutionize waste management in your city.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(feature.color, 0.2)}`
                  }
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Box
                      sx={{
                        color: feature.color,
                        fontSize: 24
                      }}
                    >
                      {feature.icon}
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, color: feature.color }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                    {feature.subtitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                    {feature.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {feature.stats.map((stat, statIndex) => (
                      <Chip
                        key={statIndex}
                        label={stat}
                        size="small"
                        sx={{
                          backgroundColor: alpha(feature.color, 0.1),
                          color: feature.color,
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>



      {/* Call to Action Section */}
      <Box
        sx={{
          color: 'black',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 4, md: 6 }
        }}
      >
        {/* Threads Background Effect */}
        <Box sx={{ width: '100%', height: '600px', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <Threads 
            amplitude={5} 
            distance={0} 
            enableMouseInteraction={true}
            color={[0.04, 0.25, 0.55]}
          />
        </Box>
        
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, mb: 3, color: '#09418c', pt: 2 }}
          >
            Ready to Transform Your City's Waste Management?
          </Typography>
          <Typography
            variant="h6"
            paragraph
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto', color: 'text.secondary' }}
          >
            Join the smart waste management revolution. Experience the power of AI-driven 
            solutions that make cities cleaner and more efficient.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                backgroundColor: '#09418c',
                borderRadius: 3,
                '&:hover': {
                  backgroundColor: '#0b4fa8',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Start Your Journey
            </Button>
            <Button
              component={Link}
              to="/heatmap"
              variant="outlined"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                borderColor: '#09418c',
                color: '#09418c',
                borderWidth: 2,
                borderRadius: 3,
                '&:hover': {
                  borderColor: '#09418c',
                  backgroundColor: 'rgba(9, 65, 140, 0.05)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              View Live Demo
            </Button>
          </Box>
        </Container>
      </Box>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
}

export default Home;