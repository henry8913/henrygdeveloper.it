// Menu Hamburger
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');

        if (navbar.classList.contains('active')) {
            const navbarHeight = navbar.scrollHeight;
            header.style.height = `${navbarHeight + 120}px`; // Altezza dinamica
        } else {
            header.style.height = 'auto'; // Torna alla dimensione originale
        }
    });
}

// Identifica la pagina corrente
const currentPageSpan = document.getElementById('current-page');
const pageTitles = {
    'index.html': 'Home',
    'about.html': 'Chi Sono',
    'projects.html': 'Progetti',
    'contact.html': 'Contatti',
    'certificates.html': 'Certificazioni'
};

if (currentPageSpan) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    currentPageSpan.textContent = pageTitles[currentPath] || 'Home';
    currentPageSpan.style.color = '#ffa500'; // Colore arancione
}
