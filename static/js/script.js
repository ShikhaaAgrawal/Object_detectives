const video = document.getElementById('camera-feed');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        // Remove the video element after starting the camera
        video.style.display = 'none';  // Hides the video feed

        const detect = async () => {
            if (video.srcObject) {
                // Capture frame from video feed and draw it on the canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert the canvas content to a Blob and send to the server for detection
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

                const formData = new FormData();
                formData.append('frame', blob);

                const response = await fetch('/detect-realtime', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const annotatedBlob = await response.blob();
                    const annotatedImage = new Image();
                    annotatedImage.src = URL.createObjectURL(annotatedBlob);

                    // When the annotated image is loaded, draw it back on the canvas
                    annotatedImage.onload = function() {
                        context.clearRect(0, 0, canvas.width, canvas.height);  // Clear previous frame
                        context.drawImage(annotatedImage, 0, 0);  // Draw annotated image on the canvas
                    }
                }
            }
            requestAnimationFrame(detect);  // Continuous frame capture and detection
        };
        detect();
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}

function stopCamera() {
    const stream = video.srcObject;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
}
