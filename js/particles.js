// Funzione per configurare Particles.js
function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50, // Numero di particelle
                density: { enable: true, value_area: 800 } // Densità
            },
            color: { value: '#ffffff' }, // Colore delle particelle
            shape: {
                type: 'circle', // Forma
                stroke: { width: 0, color: '#000000' }
            },
            opacity: {
                value: 0.5, // Opacità
                random: false,
                anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3, // Dimensione
                random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150, // Distanza massima
                color: '#FFD700', // Linee gialle
                opacity: 0.6,
                width: 1
            },
            move: {
                enable: true,
                speed: 6, // Velocità
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' }, // Interazione con il mouse
                onclick: { enable: true, mode: 'push' }, // Click aggiunge particelle
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true // Supporto Retina
    });
}

// Inizializza particelle e animazioni in loop
document.addEventListener("DOMContentLoaded", () => {
    initializeParticles();

    // Reinizializza Particles.js ogni 30 secondi
    setInterval(() => {
        document.getElementById('particles-js').innerHTML = ""; // Resetta l'elemento
        initializeParticles();
    }, 30000);

    animateCardsLoop();
});

