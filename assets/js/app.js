console.log('> FRAMESCANNER INITIALIZING');

// Wait for DOM loading
document.addEventListener('DOMContentLoaded', function () {
    console.log('> SYSTEM READY')

    // Get elements
    const uploadZone = document.querySelector('.upload-zone');
    const fileInput = document.getElementById("video-input");
    const replaceZone = document.querySelector(".replace-button");
    const slider = document.getElementById('confidence-slider');
    const sliderValue = document.getElementById('slider-value');
    const metaViewer = document.getElementById('data');

    // Functions
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    function videoMetadata(video, file) {
        metaViewer.innerHTML = `
            <p><strong>Name:</strong> ${file.name}</p>
            <p><strong>Size:</strong> ${formatFileSize(file.size)}</p>
            <p><strong>Type:</strong> ${file.type}</p>
            <p><strong>Duration:</strong> ${formatDuration(video.duration)}</p>
            <p><strong>Dimensions:</strong> ${video.videoWidth} x ${video.videoHeight}</p>
        `;
    }

    // Slider interaction
    slider.addEventListener('input', () => {
        sliderValue.textContent = slider.value;
    });

    // Makes the upload zone clickable
    uploadZone.addEventListener('click', function (event) {
        if (!uploadZone.querySelector('video')) {
            console.log('> OPENING FILE BROWSER...');
            fileInput.click();
        }
    });

    replaceZone.addEventListener('click', function (event) {
            console.log('> OPENING FILE BROWSER...');
            fileInput.click();
    });

    // Handles file selection
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('> VIDEO SELECTED:', file.name);
            console.log('> FILE SIZE:', (file.size / 1024 / 1024).toFixed(2) + ' MB');
            console.log('> FILE TYPE:', file.type);

            // Morph upload zone into video player
            uploadZone.innerHTML = `
                <div class="video-wrapper" style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                    <video controls class="video-player">
                        <source src="${URL.createObjectURL(file)}" type="${file.type}">
                        Your browser does not support the video tag!
                    </video>
                </div>
                `

            const video = uploadZone.querySelector('video');

            video.addEventListener('loadedmetadata', () => {
                videoMetadata(video, file)
            });
        }
    });



    console.log('> UPLOAD SYSTEM ACTIVE');
});
