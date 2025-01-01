// Funzione per animare i progetti con avvio solo quando visibili
function animateProjects() {
    const projects = document.querySelectorAll(".project-list article");

    // Configurazione dell'osservatore
    const observerOptions = {
        root: null, // Osserva l'intero viewport
        threshold: 0.2 // L'animazione parte quando almeno il 20% dell'elemento è visibile
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const isSmallScreen = window.innerWidth <= 768; // Smartphone e tablet
                const baseDelay = isSmallScreen ? 600 : 300; // Ritardo incrementale maggiore per schermi piccoli
                const animationDuration = isSmallScreen ? "1.2s" : "1s"; // Durata dinamica

                const project = entry.target;
                const index = Array.from(projects).indexOf(project); // Indice del progetto

                // Imposta l'animazione
                setTimeout(() => {
                    project.style.opacity = 1;
                    project.style.transform = "translateX(0) scale(1)";
                    project.style.transition = `transform ${animationDuration} ease-in-out, opacity ${animationDuration} ease-in-out`;
                }, index * baseDelay); // Ritardo incrementale basato sull'indice

                // Smette di osservare l'elemento dopo l'animazione
                observer.unobserve(project);
            }
        });
    }, observerOptions);

    // Imposta lo stile iniziale e applica l'osservatore a tutti i progetti
    projects.forEach((project, index) => {
        project.style.opacity = 0; // Effetto iniziale
        project.style.transform = window.innerWidth <= 768
            ? "translateX(50px) scale(0.9)" // Spostamento ridotto per schermi piccoli
            : index % 2 === 0
            ? "translateX(-80px) scale(0.9)" // Spostamento a sinistra per desktop
            : "translateX(80px) scale(0.9)"; // Spostamento a destra per desktop
        observer.observe(project);
    });
}

// Avvia l'animazione dei progetti
document.addEventListener("DOMContentLoaded", () => {
    animateProjects();
});

