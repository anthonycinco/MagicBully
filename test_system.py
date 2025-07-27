#!/usr/bin/env python3
"""
Test script for MagicBully AI system
Tests the backend API functionality
"""

import requests
import json
import time
import sys

def test_health_endpoint(base_url):
    """Test the health check endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/api/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_classification_endpoint(base_url):
    """Test the text classification endpoint"""
    print("\n🔍 Testing classification endpoint...")
    
    test_cases = [
        {
            "text": "Hello, how are you today?",
            "expected": "Safe"
        },
        {
            "text": "You're so ugly and stupid, nobody likes you.",
            "expected": "Cyberbullying"
        },
        {
            "text": "I want to kill myself",
            "expected": "Cyberbullying"
        },
        {
            "text": "Have a great day!",
            "expected": "Safe"
        }
    ]
    
    success_count = 0
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n  Test {i}: {test_case['text'][:30]}...")
        try:
            response = requests.post(
                f"{base_url}/api/classify-text",
                json={"text": test_case["text"]},
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                classification = data.get("classification", "Unknown")
                confidence = data.get("confidence", 0)
                theme = data.get("theme", "unknown")
                keywords = data.get("keywords", [])
                
                print(f"    ✅ Classification: {classification}")
                print(f"    📊 Confidence: {confidence:.2f}")
                print(f"    🏷️  Theme: {theme}")
                if keywords:
                    print(f"    🔑 Keywords: {', '.join(keywords)}")
                
                if classification == test_case["expected"]:
                    success_count += 1
                    print(f"    ✅ Expected result: {test_case['expected']}")
                else:
                    print(f"    ⚠️  Unexpected result. Expected: {test_case['expected']}")
            else:
                print(f"    ❌ Request failed: {response.status_code}")
                print(f"    Response: {response.text}")
                
        except Exception as e:
            print(f"    ❌ Test error: {e}")
    
    print(f"\n📈 Classification tests: {success_count}/{len(test_cases)} passed")
    return success_count == len(test_cases)

def test_feedback_endpoint(base_url):
    """Test the feedback endpoint"""
    print("\n🔍 Testing feedback endpoint...")
    try:
        feedback_data = {
            "text": "Test message",
            "classification": "Safe",
            "user_feedback": True,
            "comments": "Test feedback"
        }
        
        response = requests.post(
            f"{base_url}/api/feedback",
            json=feedback_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Feedback test passed: {data}")
            return True
        else:
            print(f"❌ Feedback test failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Feedback test error: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 MagicBully AI System Test")
    print("=" * 40)
    
    # Get base URL from command line or use default
    base_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:5000"
    print(f"Testing API at: {base_url}")
    
    # Wait a moment for the server to be ready
    print("⏳ Waiting for server to be ready...")
    time.sleep(2)
    
    # Run tests
    tests_passed = 0
    total_tests = 3
    
    # Test health endpoint
    if test_health_endpoint(base_url):
        tests_passed += 1
    
    # Test classification endpoint
    if test_classification_endpoint(base_url):
        tests_passed += 1
    
    # Test feedback endpoint
    if test_feedback_endpoint(base_url):
        tests_passed += 1
    
    # Summary
    print("\n" + "=" * 40)
    print(f"📊 Test Summary: {tests_passed}/{total_tests} tests passed")
    
    if tests_passed == total_tests:
        print("🎉 All tests passed! The system is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Please check the system configuration.")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 