from flask import Flask, request, jsonify, render_template, Response
from ultralytics import YOLO
import cv2
import numpy as np

app = Flask(__name__)
model = YOLO("road_sign_model.pt")  # Path to your YOLO model

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/detect-image', methods=['POST'])
def detect_image():
    file = request.files.get('image')
    if not file:
        return jsonify({'error': 'No image uploaded'}), 400

    # Read the image
    np_img = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Perform detection
    results = model(image)
    annotated_image = results[0].plot()

    # Convert annotated image to base64
    _, buffer = cv2.imencode('.jpg', annotated_image)
    image_b64 = buffer.tobytes()

    return Response(image_b64, mimetype='image/jpeg')

@app.route('/detect-realtime', methods=['POST'])
def detect_realtime():
    frame_data = request.files.get('frame')
    if not frame_data:
        return jsonify({'error': 'No frame uploaded'}), 400

    np_frame = np.frombuffer(frame_data.read(), np.uint8)
    frame = cv2.imdecode(np_frame, cv2.IMREAD_COLOR)

    # Perform detection
    results = model(frame)
    annotated_frame = results[0].plot()

    # Convert to JPEG and return
    _, buffer = cv2.imencode('.jpg', annotated_frame)
    return Response(buffer.tobytes(), mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
