// frontend/script.js

async function uploadSong() {
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const fileInput = document.getElementById('file');

    if (title && artist && fileInput.files.length > 0) {
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('file', file);

        try {
            const response = await fetch('https://kebabou-r-github-io.vercel.app/api/songs', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Song uploaded successfully!');
            } else {
                alert('Failed to upload song');
            }
        } catch (error) {
            console.error('Error uploading song:', error);
        }
    }
}
