document.addEventListener('DOMContentLoaded', () => {
    const toggleElement = document.getElementById('toggleTheme');

    // loader
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // switch
    toggleElement.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});
