// Function to fetch and display a new dog image
async function getNewDog() {
    const container = document.getElementById('dogImageContainer');
    
    // Show loading state
    container.innerHTML = '<div class="loading-text">Fetching a cute dog... 🐾</div>';
    
    try {
        // Add cache-busting parameter to prevent caching issues
        const response = await fetch('https://dog.ceo/api/breeds/image/random?' + new Date().getTime());
        const data = await response.json();
        
        if (data.status === 'success') {
            // Pre-load the image
            const img = new Image();
            
            // Promise to handle image loading
            const loadImage = new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = data.message;
                img.alt = 'Random Dog';
                img.className = 'dog-image';
            });

            // Wait for image to load with timeout
            await Promise.race([
                loadImage,
                new Promise((_, reject) => setTimeout(() => reject(new Error('Image load timeout')), 10000))
            ]);

            // Image loaded successfully
            container.innerHTML = '';
            container.appendChild(img);
        } else {
            throw new Error('Failed to get dog image');
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `
            <div class="error-container">
                <p class="loading-text">Oops! Something went wrong.</p>
                <button class="button retry-button" onclick="getNewDog()">Try Again 🐾</button>
            </div>
        `;
    }
}

// Load initial dog image when page loads
document.addEventListener('DOMContentLoaded', getNewDog);