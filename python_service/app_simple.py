from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'opencv_version': cv2.__version__,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/test-opencv', methods=['GET'])
def test_opencv():
    """Test OpenCV functionality"""
    try:
        # Test basic OpenCV operations
        test_image = np.zeros((100, 100, 3), dtype=np.uint8)
        gray = cv2.cvtColor(test_image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(test_image, (5, 5), 0)
        
        return jsonify({
            'success': True,
            'opencv_working': True,
            'opencv_version': cv2.__version__,
            'test_result': 'OpenCV is working correctly'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'opencv_working': False,
            'error': str(e)
        }), 500

@app.route('/process-waste', methods=['POST'])
def process_waste_image():
    """Process uploaded waste image - simplified version"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Generate unique filename
        image_id = str(uuid.uuid4())
        internal_filename = f"{image_id}.jpg"
        
        # Save original image
        original_path = os.path.join(UPLOAD_FOLDER, internal_filename)
        file.save(original_path)
        
        # Read image with OpenCV
        image = cv2.imread(original_path)
        if image is None:
            return jsonify({'error': 'Invalid image file'}), 400
        
        # Simple processing - just resize and save
        height, width = image.shape[:2]
        resized = cv2.resize(image, (width//2, height//2))
        
        # Save processed image
        processed_path = os.path.join(PROCESSED_FOLDER, f"processed_{image_id}.jpg")
        cv2.imwrite(processed_path, resized)
        
        # Simple response
        response_data = {
            'totalWasteArea': float(width * height),
            'estimatedVolume': 1.0,
            'wasteTypes': ['waste'],
            'severityLevel': 'low',
            'processedFilename': f"processed_{image_id}.jpg",
            'processedPath': processed_path,
            'message': 'Image processed successfully with OpenCV'
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        return jsonify({'error': f'Image processing failed: {str(e)}'}), 500

if __name__ == '__main__':
    print("🚀 Starting Simplified YOLO Service...")
    print(f"📁 Upload folder: {UPLOAD_FOLDER}")
    print(f"📁 Processed folder: {PROCESSED_FOLDER}")
    print(f"🔧 OpenCV version: {cv2.__version__}")
    
    # Get port from environment variable
    port = int(os.environ.get('PORT', 8080))
    print(f"🌐 Starting server on port {port}")
    
    # Start the Flask app
    app.run(host='0.0.0.0', port=port, debug=False, use_reloader=False)
