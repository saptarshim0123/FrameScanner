console.log('> FRAMESCANNER INITIALIZING');

// Wait for DOM loading
document.addEventListener('DOMContentLoaded', function () {
    console.log('> SYSTEM READY')

    // Get elements
    const uploadZone = document.querySelector('.upload-zone');
    const fileInput = document.getElementById('video-input');

    // Makes the upload zone clickable
    uploadZone.addEventListener('click', function (event) {
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

            // Update upload zone text
            const h3 = uploadZone.querySelector('h3');
            const p = uploadZone.querySelector('p');
            h3.textContent = file.name;
            p.textContent = 'Ready for analysis!';
        }
    });

    console.log('> UPLOAD SYSTEM ACTIVE');
});
