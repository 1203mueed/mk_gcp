#!/usr/bin/env python3
"""
Test script to verify OpenCV installation
"""
import sys

def test_opencv():
    try:
        print("Testing OpenCV import...")
        import cv2
        print(f"✅ OpenCV imported successfully! Version: {cv2.__version__}")
        
        # Test basic OpenCV operations
        print("Testing basic OpenCV operations...")
        import numpy as np
        
        # Create a test image
        test_image = np.zeros((100, 100, 3), dtype=np.uint8)
        print("✅ Created test image")
        
        # Test color conversion
        gray = cv2.cvtColor(test_image, cv2.COLOR_BGR2GRAY)
        print("✅ Color conversion works")
        
        # Test image operations
        blurred = cv2.GaussianBlur(test_image, (5, 5), 0)
        print("✅ Image operations work")
        
        print("🎉 All OpenCV tests passed!")
        return True
        
    except ImportError as e:
        print(f"❌ OpenCV import failed: {e}")
        return False
    except Exception as e:
        print(f"❌ OpenCV test failed: {e}")
        return False

if __name__ == "__main__":
    success = test_opencv()
    sys.exit(0 if success else 1)
