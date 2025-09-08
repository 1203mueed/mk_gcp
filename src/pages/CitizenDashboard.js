import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add,
  Report,
  CheckCircle,
  Schedule,
  Warning,
  Visibility,
  TrendingUp,
  LocationOn,
  Delete
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

function CitizenDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/reports?limit=10');
      setReports(response.data.reports || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Don't show error toast for empty data, just set empty array
      setReports([]);
      if (error.response?.status !== 404) {
        toast.error('Failed to load reports');
      }
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/reports');
      const allReports = response.data.reports || [];
      
      const stats = {
        total: allReports.length,
        pending: allReports.filter(r => r.status === 'pending').length,
        inProgress: allReports.filter(r => r.status === 'in_progress').length,
        resolved: allReports.filter(r => r.status === 'resolved').length
      };
      
      setStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set empty stats if API fails
      setStats({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'resolved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'urgent': return 'error';
      default: return 'default';
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/api/reports/${reportId}`);
      toast.success('Report deleted successfully');
      // Refresh the reports list
      fetchReports();
      fetchStats();
    } catch (error) {
      console.error('Error deleting report:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete report';
      toast.error(errorMessage);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Schedule />;
      case 'in_progress': return <TrendingUp />;
      case 'resolved': return <CheckCircle />;
      case 'rejected': return <Warning />;
      default: return <Report />;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Welcome back, {user?.name}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your waste reports and help make your city cleaner
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/report-waste"
          variant="contained"
          size="large"
          startIcon={<Add />}
          sx={{ px: 3 }}
        >
          Report Waste
        </Button>
      </Box>

      {/* Modern Analytics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #09418c 0%, #48bc19 100%)',
            color: 'white',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ position: 'relative', zIndex: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Report sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Reports
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Your contribution to city cleanliness
              </Typography>
            </CardContent>
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 1
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #48bc19 0%, #09418c 100%)',
            color: 'white',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ position: 'relative', zIndex: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.resolved}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Resolved
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% success rate
              </Typography>
            </CardContent>
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 1
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #ff9800 0%, #d32f2f 100%)',
            color: 'white',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ position: 'relative', zIndex: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Schedule sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.inProgress}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    In Progress
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Being processed
              </Typography>
            </CardContent>
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 1
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #d32f2f 0%, #ff9800 100%)',
            color: 'white',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ position: 'relative', zIndex: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Warning sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Pending
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Awaiting review
              </Typography>
            </CardContent>
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 1
              }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Encouragement Message */}
      <Card sx={{ 
        mb: 4,
        background: 'linear-gradient(135deg, #48bc19 0%, #5ccd2a 100%)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(72, 188, 25, 0.3)'
      }}>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            🎉 You've made a real difference in keeping your city clean!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Your reports help authorities identify and resolve waste issues faster, making our community a better place for everyone.
          </Typography>
        </Box>
      </Card>

      {/* Quick Actions */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body2">
          💡 <strong>Pro Tip:</strong> Take clear photos and provide accurate locations for faster resolution of waste issues!
        </Typography>
      </Alert>

      {/* Recent Reports */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Your Recent Reports
            </Typography>
            {reports.length > 0 && (
              <Button variant="outlined" size="small">
                View All
              </Button>
            )}
          </Box>

          {reports.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Report sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No reports yet
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Start by reporting your first waste issue to help keep your city clean!
              </Typography>
              <Button
                component={Link}
                to="/report-waste"
                variant="contained"
                startIcon={<Add />}
              >
                Create Your First Report
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report ID</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getStatusIcon(report.status)}
                          <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                            {report.reportId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, color: 'grey.500', mr: 1 }} />
                          <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                            {report.location.address}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.status.replace('_', ' ').toUpperCase()}
                          color={getStatusColor(report.status)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.priority.toUpperCase()}
                          color={getPriorityColor(report.priority)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {format(new Date(report.createdAt), 'MMM dd, yyyy')}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => navigate(`/reports/${report._id}`)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          {/* Delete button - only show for pending reports */}
                          {report.status === 'pending' && (
                            <Tooltip title="Delete Report">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteReport(report._id)}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default CitizenDashboard;
