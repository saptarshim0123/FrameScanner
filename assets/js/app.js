console.log('> FRAMESCANNER INITIALIZING');

// Wait for DOM loading
document.addEventListener('DOMContentLoaded', function () {
    console.log('> SYSTEM READY')

    // Get elements
    const uploadZone = document.querySelector('.upload-zone');
    const fileInputs = [document.getElementById("video-input"), document.getElementById("replace-video-input")];
    const slider = document.getElementById('confidence-slider');
    const sliderValue = document.getElementById('slider-value');

    // Slider interaction
    slider.addEventListener('input', () => {
        sliderValue.textContent = slider.value;
    });

    // Makes the upload zone clickable
    uploadZone.addEventListener('click', function (event) {
        if (!uploadZone.querySelector('video')) {
            console.log('> OPENING FILE BROWSER...');
            fileInputs[0].click();
        }
    });

    // Handles file selection
    fileInputs.forEach(input => {
        input.addEventListener('change', (event) => {
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
                `;

                // Hooking the replace button
                const replaceBtn = uploadZone.querySelector('.replace-btn');
                replaceBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // For preventing event bubbling
                    fileInputs[1].click();
                });
            }
        });
    });

    console.log('> UPLOAD SYSTEM ACTIVE');
});
