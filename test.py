from ultralytics import YOLO
import os

# Load your YOLO model
model_path = 'road_sign_model.pt'  # Replace with the path to your trained model
model = YOLO(model_path)

# Function to test the model on an image
def test_on_image(image_path):
    if not os.path.exists(image_path):
        print(f"Error: File '{image_path}' not found.")
        return
    
    # Run the model on the image
    results = model(image_path)
    
    # Save and display the results for each detection
    for result in results:  # Iterate through the list of results
        result.save()  # Saves each result to 'runs/detect/predict'
        print(f"Detection complete. Output saved to: {result.path}")

if __name__ == "__main__":
    
    test_on_image("stop-sign-along-country-road_Getty-680x402.jpg")
