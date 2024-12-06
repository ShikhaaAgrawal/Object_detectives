const video = document.getElementById('camera-feed');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

async function previewImage() {
    const fileInput = document.getElementById('image-upload');
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '';

    if (fileInput.files.length > 0) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(fileInput.files[0]);
        img.style.maxWidth = '100%';
        preview.appendChild(img);
    }
}

async function detectFromImage() {
    const fileInput = document.getElementById('image-upload');
    if (!fileInput.files[0]) {
        alert('Please select an image!');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
        const response = await fetch('/detect-image', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const img = new Image();
            img.src = URL.createObjectURL(await response.blob());
            img.style.maxWidth = '100%';
            document.getElementById('image-preview').appendChild(img);
        } else {
            alert('Detection failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        const detect = async () => {
            if (video.srcObject) {
                // Capture frame from video feed
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
            requestAnimationFrame(detect);
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
