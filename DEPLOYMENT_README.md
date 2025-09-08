# Moyla KothAI - Deployment & Domain Configuration Guide

## 🎯 Project Overview

Moyla KothAI is a smart waste management system that uses AI (YOLOv8) to detect and analyze waste accumulation in urban areas. The application consists of three main components:

- **Frontend**: React.js application for user interface
- **Backend**: Node.js/Express API with Sequelize ORM
- **AI Service**: Python/Flask service with YOLOv8 for waste detection

## 🚀 Deployment Status

### ✅ **COMPLETED DEPLOYMENTS**

#### **1. Google Cloud Platform Setup**
- ✅ Project created: `moyla-kothai-deployment`
- ✅ Billing account linked
- ✅ Required APIs enabled:
  - Cloud Run API
  - Cloud SQL API
  - Cloud Storage API
  - Cloud Build API
  - Artifact Registry API

#### **2. Database Configuration**
- ✅ Cloud SQL PostgreSQL instance created: `moyla-db`
- ✅ Database: `moyla_kothai`
- ✅ User: `moyla_user`
- ✅ Password: `moyla_secure_password`
- ✅ Tables created with sample data
- ✅ Connection configured for production

#### **3. Backend Service Deployment**
- ✅ Service: `moyla-backend`
- ✅ URL: `https://moyla-backend-975504716578.us-central1.run.app`
- ✅ Custom Domain: `https://api.moylakothai.xyz`
- ✅ Environment variables configured
- ✅ Cloud SQL connection established
- ✅ Health endpoint working: `/api/health`

#### **4. Frontend Service Deployment**
- ✅ Service: `moyla-frontend`
- ✅ URL: `https://moyla-frontend-975504716578.us-central1.run.app`
- ✅ Custom Domain: `https://moylakothai.xyz`
- ✅ API configuration updated
- ✅ Environment variables configured
- ✅ Build optimized for production

#### **5. Custom Domain Configuration**
- ✅ Domain verified: `moylakothai.xyz`
- ✅ DNS records configured:
  - Frontend: 4 A records + 4 AAAA records
  - Backend: 1 CNAME record (`api` → `ghs.googlehosted.com.`)
- ✅ SSL certificates automatically provisioned
- ✅ Domain mappings active and working

#### **6. Application Features Working**
- ✅ User authentication (login/register)
- ✅ Frontend-backend communication
- ✅ Heatmap functionality
- ✅ Database connectivity
- ✅ Error handling and loading states
- ✅ Responsive design

### ⏳ **PENDING DEPLOYMENTS**

#### **1. AI Service (Python/YOLO)**
- ❌ Service: `moyla-yolo` (deployment failed)
- ❌ URL: Not accessible
- ❌ Status: Container fails to start within timeout
- ❌ Issue: YOLO model loading problems in Cloud Run environment

**Error Details:**
```
Revision 'moyla-yolo-00003-5xq' is not ready and cannot serve traffic. 
The user-provided container failed to start and listen on the port defined 
provided by the PORT=8080 environment variable within the allocated timeout.
```

**Potential Solutions:**
- Increase memory allocation (currently 2Gi)
- Optimize model loading
- Use Cloud Storage for model files
- Implement health checks
- Consider using Vertex AI instead of Cloud Run

## 🌐 **Live Application URLs**

### **Production URLs (Custom Domain)**
- **Frontend**: https://moylakothai.xyz
- **Backend API**: https://api.moylakothai.xyz
- **Heatmap**: https://moylakothai.xyz/heatmap

### **Google Cloud Run URLs (Fallback)**
- **Frontend**: https://moyla-frontend-975504716578.us-central1.run.app
- **Backend**: https://moyla-backend-975504716578.us-central1.run.app

## 🔧 **Technical Configuration**

### **Environment Variables**

#### **Backend Service**
```bash
INSTANCE_CONNECTION_NAME=moyla-kothai-deployment:us-central1:moyla-db
DB_USER=moyla_user
DB_PASSWORD=moyla_secure_password
DB_NAME=moyla_kothai
YOLO_SERVICE_URL=http://localhost:8000
PYTHON_SERVICE_URL=http://localhost:8000
STORAGE_BUCKET=moyla-kothai-deployment-uploads
GOOGLE_CLOUD_PROJECT_ID=moyla-kothai-deployment
NODE_ENV=production
```

#### **Frontend Service**
```bash
REACT_APP_API_BASE_URL=https://api.moylakothai.xyz
```

### **Database Schema**
- **Users Table**: Authentication and user management
- **Waste Reports Table**: Waste detection reports with AI analysis
- **Locations Table**: Geographic location data

### **DNS Configuration**

#### **Frontend (moylakothai.xyz)**
```
Type: A, Name: @, Value: 216.239.32.21
Type: A, Name: @, Value: 216.239.34.21
Type: A, Name: @, Value: 216.239.36.21
Type: A, Name: @, Value: 216.239.38.21
Type: AAAA, Name: @, Value: 2001:4860:4802:32::15
Type: AAAA, Name: @, Value: 2001:4860:4802:34::15
Type: AAAA, Name: @, Value: 2001:4860:4802:36::15
Type: AAAA, Name: @, Value: 2001:4860:4802:38::15
```

#### **Backend (api.moylakothai.xyz)**
```
Type: CNAME, Name: api, Value: ghs.googlehosted.com.
```

## 🧪 **Testing Credentials**

### **Test User Account**
- **Email**: `admin@moylakothai.com`
- **Password**: `admin123`
- **Role**: Citizen

## 📁 **Project Structure**

```
moyla-kothai-website-main/
├── src/
│   ├── config/
│   │   └── api.js                 # API configuration
│   ├── contexts/
│   │   └── AuthContext.js         # Authentication context
│   ├── pages/
│   │   ├── Login.js               # Login page
│   │   ├── Register.js            # Registration page
│   │   ├── PublicHeatmap.js       # Heatmap visualization
│   │   └── ReportDetails.js       # Report details page
│   └── ...
├── backend/
│   ├── config/
│   │   ├── database.js            # Database configuration
│   │   └── storage.js             # Cloud Storage configuration
│   ├── services/
│   │   └── yoloService.js         # YOLO service integration
│   ├── server.js                 # Main server file
│   └── package.json              # Backend dependencies
├── python_service/
│   ├── app.py                    # Flask application
│   ├── requirements.txt          # Python dependencies
│   ├── train5_11.pt             # YOLO model file
│   └── Dockerfile               # Container configuration
├── Dockerfile                   # Frontend container
├── package.json                  # Frontend dependencies
├── .env                         # Local development
├── .env.production             # Production environment
└── deploy_guide.txt            # Original deployment guide
```

## 🔄 **Deployment Commands**

### **Redeploy Frontend**
```bash
npm run build
gcloud run deploy moyla-frontend --source . --region us-central1 --allow-unauthenticated --port 8080 --set-env-vars="REACT_APP_API_BASE_URL=https://api.moylakothai.xyz"
```

### **Redeploy Backend**
```bash
cd backend
gcloud run deploy moyla-backend --source . --region us-central1 --allow-unauthenticated --port 8080 --set-env-vars="INSTANCE_CONNECTION_NAME=moyla-kothai-deployment:us-central1:moyla-db,DB_USER=moyla_user,DB_PASSWORD=moyla_secure_password,DB_NAME=moyla_kothai,YOLO_SERVICE_URL=http://localhost:8000,PYTHON_SERVICE_URL=http://localhost:8000,STORAGE_BUCKET=moyla-kothai-deployment-uploads,GOOGLE_CLOUD_PROJECT_ID=moyla-kothai-deployment,NODE_ENV=production"
```

### **Check Service Status**
```bash
gcloud run services list --region=us-central1
```

### **Check Domain Mappings**
```bash
gcloud beta run domain-mappings list --region=us-central1
```

### **Test Domain Configuration**
```bash
./test-domain.sh
```

## 🐛 **Known Issues & Troubleshooting**

### **1. AI Service Deployment Failure**
**Issue**: Python service fails to start in Cloud Run
**Status**: Deferred for later resolution
**Impact**: Waste detection features not available
**Workaround**: Use mock data for demonstration

### **2. Model File Size**
**Issue**: YOLO model file (55MB) causes container startup issues
**Potential Solutions**:
- Use Cloud Storage for model files
- Implement lazy loading
- Optimize model size
- Use Vertex AI instead

### **3. Memory Constraints**
**Issue**: Cloud Run memory limits may be insufficient for YOLO
**Current**: 2Gi allocated
**Potential**: Increase to 4Gi or 8Gi

## 📋 **Next Steps & Recommendations**

### **Immediate Actions**
1. ✅ **Application is live and functional** - Users can access and use the system
2. ✅ **Core features working** - Authentication, heatmap, database connectivity
3. ⏳ **AI service deployment** - Priority for next development cycle

### **Future Enhancements**
1. **Deploy AI Service**: Resolve YOLO model loading issues
2. **Performance Optimization**: Implement caching and CDN
3. **Monitoring**: Add application monitoring and logging
4. **Security**: Implement additional security measures
5. **Scalability**: Optimize for higher traffic loads

### **Production Readiness Checklist**
- ✅ Domain configuration
- ✅ SSL certificates
- ✅ Database setup
- ✅ Frontend deployment
- ✅ Backend deployment
- ✅ User authentication
- ✅ Error handling
- ❌ AI service deployment
- ❌ Performance monitoring
- ❌ Backup strategies

## 🆘 **Support & Maintenance**

### **Monitoring Commands**
```bash
# Check service health
curl https://api.moylakothai.xyz/api/health

# Check frontend
curl https://moylakothai.xyz

# View service logs
gcloud run services logs read moyla-backend --region=us-central1
gcloud run services logs read moyla-frontend --region=us-central1
```

### **Emergency Contacts**
- **Google Cloud Support**: Available through console
- **Domain Provider**: Contact your hosting provider for DNS issues
- **Development Team**: For application-specific issues

## 📊 **Cost Estimation**

### **Google Cloud Services**
- **Cloud Run**: ~$0-50/month (based on usage)
- **Cloud SQL**: ~$25-50/month (db-f1-micro instance)
- **Cloud Storage**: ~$5-15/month (based on usage)
- **Domain**: ~$10-15/year (moylakothai.xyz)

### **Total Estimated Cost**: $40-120/month

---

## 🎉 **Deployment Summary**

**Status**: ✅ **SUCCESSFULLY DEPLOYED**

The Moyla KothAI application is now live and accessible at:
- **Frontend**: https://moylakothai.xyz
- **Backend**: https://api.moylakothai.xyz

**Core functionality is working**, with only the AI service pending deployment. Users can register, login, and interact with the application. The heatmap displays mock data until the AI service is deployed.

**Next priority**: Resolve AI service deployment issues to enable full waste detection functionality.

---

*Last Updated: September 8, 2025*
*Deployment Version: 1.0.0*
*Status: Production Ready (Core Features)*
