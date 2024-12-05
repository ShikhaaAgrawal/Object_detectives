// Accessing the camera feed
const video = document.getElementById('camera-feed');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

function stopCamera() {
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
}

// Placeholder functions for the detection features
function detectFromImage() {
    // Implement image detection logic here
    console.log("Detecting from image...");
}

function detectFromCamera() {
    // Implement real-time camera detection logic here
    console.log("Detecting from camera...");
}
