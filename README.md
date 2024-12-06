# Real-Time Road Sign Detection

This project implements a road sign detection system using the YOLO (You Only Look Once) object detection model. The system provides two main functionalities:

1. **Image Detection**: Upload an image, and the model will detect and annotate road signs in the image.
2. **Real-Time Detection**: Upload video frames (or use webcam feed) to detect road signs in real-time and return the annotated frames.

## Features

- **Real-Time Object Detection:**
  - Upload video frames for real-time object detection.
  - Annotate road signs in the video frames.

- **Image Upload Detection:**
  - Upload an image for detection of road signs.
  - Display the annotated result as a processed image.

- **YOLO-based Detection:**
  - Uses the YOLO model trained for road sign detection (`road_sign_model.pt`).

- **Flask Web Application:**
  - The backend is built using Flask.
  - Supports handling image and video frame uploads.

## Technologies Used

- **Frontend:**
  - HTML, CSS for structuring and styling the web application (via `render_template` in Flask).
  
- **Backend:**
  - Flask (Python web framework) for handling requests.
  - YOLO (Ultralytics) for object detection.
  - OpenCV for image and video frame processing.
  
- **Model:**
  - YOLOv5 for detecting road signs, trained on a custom dataset (saved as `road_sign_model.pt`).

## Setup and Installation

### Prerequisites

- Python 
- Flask
- YOLOv5 (Ultralytics)
- OpenCV
- NumPy

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/repository-name.git
   cd repository-name


2. **Install the required dependencies:**

- Create a virtual environment and install the dependencies from requirements.txt:

    ```bash
    
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt

- requirements.txt should include:

    - makefile
    - Copy code
    - Flask==2.1.1
    - ultralytics==8.0.37
    - opencv-python==4.5.3.56
    - numpy==1.21.2

3. Download or Train YOLO Model:

You can use a pretrained road sign model or train one yourself.
Place the YOLO model file (road_sign_model.pt) in the project directory.
Start the Flask server:

Run the Flask application with the following command:

    ```bash
    python app.py
    
- Open the application in your browser:

- Once the server is running, open a web browser and navigate to:

1. arduino
2. Copy code
3. http://localhost:5000
4. You should now be able to interact with the system.

4. Usage

- Image Detection:

    - Upload an image through the form on the home page.
    - The server will process the image and return the annotated image with road sign detections.

- Real-Time Detection:

    - For real-time detection, upload video frames or use a webcam to capture and send frames.
    - The system will return annotated frames with detected road signs.

- File Structure
  
   ```bash
    /project-root
    │
    ├── /static           # Static files (CSS, JS, images)
    ├── /templates        # HTML templates
    ├── /models           # Folder for YOLO model (road_sign_model.pt)
    ├── app.py            # Main Flask application
    ├── requirements.txt  # Python dependencies
    ├── README.md         # Project documentation


#Contributors

1.Shikha Agrawal
Email: shikha.agrawal@mca.christuniversity.in
Christ (Deemed-to-be-University)

2. Muskan Kumari Gupta
Email: muskan.kumarigupta@mca.christuniversity.in
Christ (Deemed-to-be-University)
