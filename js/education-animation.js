// Funzione per animare le sezioni Formazione, Obiettivi Professionali e Progetti in Evidenza
function animateEducationAndCareer() {
    const sections = document.querySelectorAll(".education, .career, .preview");
    const observerOptions = {
        root: null, // Osserva l'intero viewport
        threshold: 0.2 // L'animazione parte quando il 20% dell'elemento è visibile
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;

                // Determina il tipo di animazione in base alla sezione
                const elements = section.querySelectorAll("h2, h3, p, ul, li, a, article");
                const isSmallScreen = window.innerWidth <= 768; // Smartphone e tablet
                const baseDelay = isSmallScreen ? 400 : 200; // Ritardo incrementale maggiore per schermi piccoli
                const elementDuration = isSmallScreen ? "1.2s" : "1s"; // Durata per tutti gli elementi

                // Scelta animazioni
                if (section.classList.contains("education")) {
                    // Animazione per la sezione "Formazione" (traslazione verso l'alto)
                    elements.forEach((element, index) => {
                        setTimeout(() => {
                            element.style.opacity = 1;
                            element.style.transform = "translateY(0)";
                            element.style.transition = `transform ${elementDuration} ease-out, opacity ${elementDuration} ease-out`;
                        }, index * baseDelay);
                        element.style.opacity = 0;
                        element.style.transform = "translateY(50px)";
                    });
                } else if (section.classList.contains("career")) {
                    // Animazione per la sezione "Obiettivi Professionali" (rotazione e dissolvenza)
                    elements.forEach((element, index) => {
                        setTimeout(() => {
                            element.style.opacity = 1;
                            element.style.transform = "rotateX(0deg)";
                            element.style.transition = `transform ${elementDuration} ease-in-out, opacity ${elementDuration} ease-in-out`;
                        }, index * baseDelay);
                        element.style.opacity = 0;
                        element.style.transform = "rotateX(-90deg)";
                    });
                } else if (section.classList.contains("preview")) {
                    // Animazione per la sezione "Progetti in Evidenza" (zoom-in)
                    elements.forEach((element, index) => {
                        setTimeout(() => {
                            element.style.opacity = 1;
                            element.style.transform = "scale(1)";
                            element.style.transition = `transform ${elementDuration} cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity ${elementDuration} ease-out`;
                        }, index * baseDelay);
                        element.style.opacity = 0;
                        element.style.transform = "scale(0.8)";
                    });
                }

                // Smette di osservare la sezione dopo l'animazione
                observer.unobserve(section);
            }
        });
    }, observerOptions);

    // Imposta l'osservatore per ogni sezione
    sections.forEach(section => observer.observe(section));
}

// Avvia l'animazione delle sezioni
document.addEventListener("DOMContentLoaded", () => {
    animateEducationAndCareer();
});
