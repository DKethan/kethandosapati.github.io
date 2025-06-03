// Function to load HTML components with retry mechanism
async function loadComponent(elementId, componentPath, retries = 3) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    // Add loading state
    element.innerHTML = '<div class="component-loading">Loading...</div>';

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            element.innerHTML = html;
            
            // Dispatch event for component loaded
            element.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { componentId: elementId }
            }));
            return;
        } catch (error) {
            if (i === retries - 1) {
                console.error(`Failed to load ${componentPath} after ${retries} attempts:`, error);
                element.innerHTML = `<div class="component-error">Failed to load component. Please refresh the page.</div>`;
            } else {
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
            }
        }
    }
}

// Load all components when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load components in parallel
    Promise.all([
        loadComponent('head-container', '/components/head.html'),
        loadComponent('header-container', '/components/header.html'),
        loadComponent('footer-container', '/components/footer.html')
    ]).catch(error => {
        console.error('Error loading components:', error);
    });
}); 