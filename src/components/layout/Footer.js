import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, #09418c 0%, #48bc19 100%)`,
        color: 'white',
        py: 6,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src="/logo.png" 
                alt="ময়লা কোথAI Logo" 
                style={{ height: '40px', marginRight: '10px', filter: 'brightness(0) invert(1)' }} 
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ময়লা কোথAI
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Smart waste management for modern cities, powered by AI and citizen engagement.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Social media icons could go here */}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                to="/" 
                component={Typography} 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  opacity: 0.8, 
                  '&:hover': { opacity: 1 },
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                Home
              </Link>
              <Link 
                to="/about-us" 
                component={Typography} 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  opacity: 0.8, 
                  '&:hover': { opacity: 1 },
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                About Us
              </Link>
              <Link 
                to="/why-our-solution" 
                component={Typography} 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  opacity: 0.8, 
                  '&:hover': { opacity: 1 },
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                Why Our Solution
              </Link>
              <Link 
                to="/heatmap" 
                component={Typography} 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  opacity: 0.8, 
                  '&:hover': { opacity: 1 },
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                Live Heatmap
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
              Email: info@moylakothai.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
              Phone: +880 123 456 7890
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Address: Dhaka, Bangladesh
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 4, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} ময়লা কোথAI. All rights reserved.
          </Typography>
        </Box>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
}

export default Footer;