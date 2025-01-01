// Funzione per animare le certificazioni con avvio solo quando visibili
function animateCertifications() {
    const certifications = document.querySelectorAll(".certification-card");

    // Configurazione dell'osservatore
    const observerOptions = {
        root: null, // Osserva l'intero viewport
        threshold: 0.2 // L'animazione parte quando almeno il 20% dell'elemento è visibile
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const isSmallScreen = window.innerWidth <= 768; // Smartphone e tablet
                const baseDelay = isSmallScreen ? 600 : 300; // Maggiore ritardo per schermi piccoli
                const certification = entry.target;
                const index = Array.from(certifications).indexOf(certification); // Indice della certificazione

                // Imposta l'animazione
                setTimeout(() => {
                    certification.style.opacity = 1;
                    certification.style.transform = "rotateY(0) scale(1)";
                    certification.style.transition = `transform 1.2s ease-in-out, opacity 1.2s ease-in-out`;
                }, index * baseDelay); // Ritardo incrementale basato sull'indice

                // Smette di osservare l'elemento dopo l'animazione
                observer.unobserve(certification);
            }
        });
    }, observerOptions);

    // Imposta lo stile iniziale e applica l'osservatore a tutte le certificazioni
    certifications.forEach(certification => {
        certification.style.opacity = 0; // Effetto iniziale
        certification.style.transform = "rotateY(90deg) scale(0.8)"; // Posizione iniziale
        observer.observe(certification);
    });
}

// Avvia l'animazione delle certificazioni
document.addEventListener("DOMContentLoaded", () => {
    animateCertifications();
});



