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
  Button,
  Chip,
  Avatar
} from '@mui/material';
import {
  Psychology,
  Speed,
  Analytics,
  Public,
  Recycling,
  TrendingUp,
  CheckCircle
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

function WhyOurSolution() {
  const theme = useTheme();

  const problems = [
    {
      title: "Inefficient Waste Collection",
      description: "Traditional waste management relies on fixed schedules and manual reporting, leading to overflowing bins and missed collections.",
      icon: <Recycling sx={{ fontSize: 40 }} />
    },
    {
      title: "Lack of Real-time Data",
      description: "Authorities have no visibility into actual waste accumulation patterns, making resource allocation guesswork.",
      icon: <Analytics sx={{ fontSize: 40 }} />
    },
    {
      title: "Citizen Engagement Gap",
      description: "Limited channels for citizens to report issues, leading to frustration and environmental degradation.",
      icon: <Public sx={{ fontSize: 40 }} />
    }
  ];

  const solutions = [
    {
      title: "AI-Powered Detection",
      description: "Our advanced YOLO v8 model automatically detects, classifies, and estimates waste volume from citizen photos with 95%+ accuracy.",
      icon: <Psychology sx={{ fontSize: 40 }} />,
      benefits: ["Automatic Classification", "Volume Estimation", "Priority Assignment"]
    },
    {
      title: "Real-time Monitoring",
      description: "Live heatmaps and dashboards provide instant visibility into waste distribution across the city.",
      icon: <Speed sx={{ fontSize: 40 }} />,
      benefits: ["Live Updates", "Interactive Maps", "Instant Alerts"]
    },
    {
      title: "Smart Analytics",
      description: "Data-driven insights help authorities optimize routes, predict patterns, and allocate resources efficiently.",
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      benefits: ["Predictive Analytics", "Route Optimization", "Resource Planning"]
    },
    {
      title: "Citizen Empowerment",
      description: "Easy-to-use mobile interface allows citizens to report issues instantly and track resolution progress.",
      icon: <Public sx={{ fontSize: 40 }} />,
      benefits: ["One-Click Reporting", "Progress Tracking", "Community Engagement"]
    }
  ];

  const advantages = [
    {
      title: "Proven Technology",
      description: "Built on state-of-the-art computer vision and machine learning technologies",
      icon: <CheckCircle sx={{ color: '#48bc19' }} />
    },
    {
      title: "Scalable Architecture",
      description: "Designed to handle thousands of reports and users across multiple cities",
      icon: <CheckCircle sx={{ color: '#48bc19' }} />
    },
    {
      title: "Cost Effective",
      description: "Reduces operational costs by 40% through optimized resource allocation",
      icon: <CheckCircle sx={{ color: '#48bc19' }} />
    },
    {
      title: "Easy Integration",
      description: "Seamlessly integrates with existing municipal systems and workflows",
      icon: <CheckCircle sx={{ color: '#48bc19' }} />
    },
    {
      title: "Enhanced Transparency",
      description: "Increases transparency between citizens and authority, improving accountability throughout the waste management process",
      icon: <CheckCircle sx={{ color: '#48bc19' }} />
    }
  ];

  // Removed testimonials array as it's no longer needed

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
              Why Choose Moyla KothAI?
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
              Transforming waste management through cutting-edge AI technology, 
              real-time monitoring, and citizen engagement.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                Get Started Today
              </Button>
              <Button
                component={Link}
                to="/heatmap"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                View Live Demo
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Problems Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2, color: '#09418c' }}
        >
          The Problems We Solve
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Traditional waste management systems face significant challenges that impact 
          both citizens and municipal authorities.
        </Typography>

        <Grid container spacing={4}>
          {problems.map((problem, index) => (
            <Grid item xs={12} md={4} key={index}>
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
                      color: '#d32f2f',
                      mb: 2
                    }}
                  >
                    {problem.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {problem.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {problem.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Solutions Section */}
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
            Our AI-Powered Solutions
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
          >
            Leveraging cutting-edge artificial intelligence to revolutionize 
            waste management and create smarter, cleaner cities.
          </Typography>

          <Grid container spacing={4}>
            {solutions.map((solution, index) => (
              <Grid item xs={12} md={6} key={index}>
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
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          color: '#48bc19',
                          mr: 2
                        }}
                      >
                        {solution.icon}
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {solution.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                      {solution.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {solution.benefits.map((benefit, idx) => (
                        <Chip
                          key={idx}
                          label={benefit}
                          size="small"
                          sx={{
                            backgroundColor: alpha('#48bc19', 0.1),
                            color: '#48bc19',
                            fontWeight: 500
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Advantages Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2, color: '#09418c' }}
        >
          Why Moyla KothAI Stands Out
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Our platform combines advanced technology with user-friendly design 
          to deliver unmatched results in waste management.
        </Typography>

        <Grid container spacing={4}>
          {advantages.map((advantage, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: alpha('#48bc19', 0.1),
                    mb: 2,
                    width: 48,
                    height: 48
                  }}
                >
                  {advantage.icon}
                </Avatar>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {advantage.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={advantage.title === "Enhanced Transparency" ? { textAlign: 'center', maxWidth: '400px', mx: 'auto' } : {}}>
                    {advantage.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* End of Advantages Section */}
    </Box>
  );
}

export default WhyOurSolution;
