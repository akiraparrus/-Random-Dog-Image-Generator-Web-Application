// Function to fetch and display a new dog image
async function getNewDog() {
    const container = document.getElementById('dogImageContainer');
    
    // Show loading state
    container.innerHTML = '<p>Fetching a cute dog... 🐾</p>';
    
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        
        if (data.status === 'success') {
            // Create new image element
            const img = new Image();
            img.src = data.message;
            img.className = 'dog-image';
            img.alt = 'Random Dog';
            
            // Clear container and add new image
            container.innerHTML = '';
            container.appendChild(img);
        } else {
            container.innerHTML = '<p>Oops! Failed to fetch a dog image. Please try again!</p>';
        }
    } catch (error) {
        container.innerHTML = '<p>Oops! Something went wrong. Please try again!</p>';
        console.error('Error:', error);
    }
}

// Load a dog image when the page loads
document.addEventListener('DOMContentLoaded', getNewDog);