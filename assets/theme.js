// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }

    // Add transition class to body
    document.body.classList.add('theme-transition');

    // Set initial theme based on saved preference or system preference
    const getInitialTheme = () => {
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            
            // Check system preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch (e) {
            console.warn('Could not access localStorage:', e);
            return 'dark'; // Default to dark theme
        }
    };

    const setTheme = (theme) => {
        try {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeToggle.innerHTML = theme === 'light' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
        } catch (e) {
            console.warn('Could not save theme preference:', e);
        }
    };

    // Initialize theme
    setTheme(getInitialTheme());

    // Theme toggle click handler
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Only auto-switch if user hasn't set a preference
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}); 