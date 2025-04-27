// Function to fetch and display a new dog image
async function getNewDog() {
    const container = document.getElementById('dogImageContainer');
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Fetching a cute dog... 🐾';

    // Clear previous content and show loading state
    container.innerHTML = '';
    container.appendChild(loadingText);
    
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.status === 'success') {
            // Create new image element
            const img = new Image();
            
            // Set up load and error handlers before setting src
            img.onload = () => {
                container.innerHTML = '';
                img.className = 'dog-image';
                container.appendChild(img);
            };
            
            img.onerror = () => {
                container.innerHTML = '<div class="loading-text">Sorry, failed to load the image. Click the button to try again! 🐾</div>';
            };
            
            // Start loading the image
            img.src = data.message;
            img.alt = 'Random Dog';
        } else {
            throw new Error('API returned unsuccessful status');
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="loading-text">Oops! Something went wrong. Click the button to try again! 🐾</div>';
    }
}

// Load a dog image when the page loads
document.addEventListener('DOMContentLoaded', getNewDog);