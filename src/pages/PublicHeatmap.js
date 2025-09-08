import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, Container, Chip, Grid, Card, CardContent, ImageList, ImageListItem } from '@mui/material';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import api from '../config/api';

// Custom hook for heatmap layer
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points && points.length > 0) {
      const heatLayer = L.heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        max: 1.0,
        minOpacity: 0.4,
        gradient: {
          0.0: '#4CAF50',
          0.2: '#8BC34A', 
          0.4: '#CDDC39',
          0.6: '#FFC107',
          0.8: '#FF9800',
          1.0: '#F44336'
        }
      }).addTo(map);

      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [map, points]);

  return null;
};

const PublicHeatmap = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});

  // Fetch all reports
  const fetchPublicReports = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching reports from API...');
      const response = await api.get('/api/reports/public');
      const newReports = response.data || [];
      
      console.log('📊 API returned:', newReports.length, 'reports');
      setReports(Array.isArray(newReports) ? newReports : []);
    } catch (error) {
      console.error('Error fetching public reports:', error);
      // Set empty array on error
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPublicReports();
  }, [fetchPublicReports]);

  // Convert reports to heatmap points with proper array check
  const heatmapPoints = Array.isArray(reports) 
    ? reports
        .filter(report => report.wasteDetection?.totalWasteArea > 0)
        .map(report => [
          report.location.coordinates[1], // lat
          report.location.coordinates[0], // lng
          Math.min(report.wasteDetection?.estimatedVolume || 0.1, 5) / 5 // intensity (0-1)
        ])
    : [];

  const handleImageLoad = (reportId, imageType) => {
    setImageLoading(prev => ({
      ...prev,
      [`${reportId}-${imageType}`]: false
    }));
  };

  const handleImageError = (reportId, imageType) => {
    setImageLoading(prev => ({
      ...prev,
      [`${reportId}-${imageType}`]: false
    }));
  };

  // Mock data for demonstration (remove in production)
  const mockReports = [
    {
      _id: '1',
      reportId: 'WR-001',
      location: {
        coordinates: [90.4125, 23.8103], // Dhaka coordinates
        address: 'Dhanmondi, Dhaka'
      },
      wasteDetection: {
        totalWasteArea: 150,
        estimatedVolume: 2.5,
        detectedObjects: [
          { class: 'plastic_bottle', confidence: 0.85, bbox: [100, 150, 200, 300] },
          { class: 'food_waste', confidence: 0.92, bbox: [300, 200, 400, 350] }
        ]
      },
      wasteTypes: ['plastic', 'organic'],
      severityLevel: 'medium',
      status: 'pending',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      originalImage: { filename: 'original1.jpg' },
      processedImage: { filename: 'processed1.jpg' }
    },
    {
      _id: '2',
      reportId: 'WR-002',
      location: {
        coordinates: [90.4225, 23.8203],
        address: 'Gulshan, Dhaka'
      },
      wasteDetection: {
        totalWasteArea: 300,
        estimatedVolume: 4.2,
        detectedObjects: [
          { class: 'cardboard', confidence: 0.78, bbox: [150, 100, 300, 250] }
        ]
      },
      wasteTypes: ['cardboard'],
      severityLevel: 'high',
      status: 'in_progress',
      priority: 'high',
      createdAt: new Date().toISOString(),
      originalImage: { filename: 'original2.jpg' },
      processedImage: { filename: 'processed2.jpg' }
    }
  ];

  // Use mock data if no real reports
  const displayReports = reports.length > 0 ? reports : mockReports;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        🗺️ Public Waste Heatmap
      </Typography>
      
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Interactive map showing waste accumulation hotspots across the city
      </Typography>

      <Grid container spacing={3}>
        {/* Map Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ height: '600px', overflow: 'hidden' }}>
            <MapContainer
              center={[23.8103, 90.4125]} // Dhaka coordinates
              zoom={12}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <HeatmapLayer points={heatmapPoints} />
            </MapContainer>
          </Paper>
        </Grid>

        {/* Reports List */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ height: '600px', overflow: 'auto', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              📊 Recent Reports ({displayReports.length})
            </Typography>
            
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography>Loading reports...</Typography>
              </Box>
            ) : (
              <ImageList cols={1} gap={8}>
                {displayReports.map((report) => (
                  <ImageListItem key={report._id}>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          {report.reportId}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          📍 {report.location?.address || 'Location not specified'}
                        </Typography>

                        <Box sx={{ mb: 1 }}>
                          <Chip 
                            label={report.severityLevel} 
                            size="small" 
                            color={report.severityLevel === 'high' ? 'error' : report.severityLevel === 'medium' ? 'warning' : 'success'}
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={report.status} 
                            size="small" 
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={report.priority} 
                            size="small" 
                            variant="outlined"
                            color="primary"
                          />
                        </Box>

                        <Typography variant="body2" gutterBottom>
                          🗑️ Waste Area: {report.wasteDetection?.totalWasteArea || 0} pixels
                        </Typography>
                        
                        <Typography variant="body2" gutterBottom>
                          📦 Volume: {report.wasteDetection?.estimatedVolume || 0} m³
                        </Typography>

                        <Typography variant="body2" gutterBottom>
                          🏷️ Types: {report.wasteTypes?.join(', ') || 'Unknown'}
                        </Typography>

                        {/* Images */}
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            Original Image:
                          </Typography>
                          <Box sx={{ position: 'relative', width: '100%', height: '100px', mb: 1 }}>
                            <img
                              src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${report.originalImage?.filename}`}
                              alt="Original"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 4,
                                display: imageLoading[`${report._id}-original`] === false ? 'block' : 'none'
                              }}
                              onLoad={() => handleImageLoad(report._id, 'original')}
                              onError={() => handleImageError(report._id, 'original')}
                            />
                            {imageLoading[`${report._id}-original`] !== false && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(0,0,0,0.1)',
                                  borderRadius: 4
                                }}
                              >
                                <Typography variant="caption">Loading...</Typography>
                              </Box>
                            )}
                          </Box>

                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            AI Processed:
                          </Typography>
                          <Box sx={{ position: 'relative', width: '100%', height: '100px' }}>
                            <img
                              src={`${process.env.REACT_APP_API_BASE_URL}/processed/${report.processedImage?.filename}`}
                              alt="Processed"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 4,
                                display: imageLoading[`${report._id}-processed`] === false ? 'block' : 'none'
                              }}
                              onLoad={() => handleImageLoad(report._id, 'processed')}
                              onError={() => handleImageError(report._id, 'processed')}
                            />
                            {imageLoading[`${report._id}-processed`] !== false && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(0,0,0,0.1)',
                                  borderRadius: 4
                                }}
                              >
                                <Typography variant="caption">Loading...</Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>

                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                          📅 {new Date(report.createdAt).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PublicHeatmap;
