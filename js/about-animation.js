// Funzione per animare la sezione "Chi Sono" con effetti diversificati e soglia per gli elementi
function animateAboutSection() {
    const aboutSection = document.querySelector(".about");
    const elements = aboutSection.querySelectorAll("h2, h3, p, ul, li");

    // Configura l'osservatore per ogni elemento
    const observerOptions = {
        root: null, // Osserva l'intero viewport
        threshold: 0.2 // L'animazione parte quando almeno il 20% dell'elemento è visibile
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Anima in base al tipo di elemento
                if (element.tagName === "H2" || element.tagName === "H3") {
                    element.style.opacity = 1;
                    element.style.transform = "rotateX(0deg)";
                    element.style.transition = "transform 1s ease-in-out, opacity 1s ease-in-out";
                } else if (element.tagName === "P") {
                    element.style.opacity = 1;
                    element.style.transform = "translateX(0)";
                    element.style.transition = "transform 1s ease-out, opacity 1s ease-out";
                } else if (element.tagName === "UL" || element.tagName === "LI") {
                    element.style.opacity = 1;
                    element.style.transform = "scale(1)";
                    element.style.transition = "transform 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 1.2s ease-out";
                }

                // Smette di osservare l'elemento dopo l'animazione
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Imposta lo stile iniziale per ogni elemento e applica l'osservatore
    elements.forEach((element, index) => {
        element.style.opacity = 0; // Effetto iniziale
        if (element.tagName === "H2" || element.tagName === "H3") {
            element.style.transform = "rotateX(-90deg)";
        } else if (element.tagName === "P") {
            element.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
        } else if (element.tagName === "UL" || element.tagName === "LI") {
            element.style.transform = "scale(0.8)";
        }

        // Aggiunge l'elemento all'osservatore
        observer.observe(element);
    });
}

// Inizializza l'animazione della sezione "Chi Sono"
document.addEventListener("DOMContentLoaded", () => {
    animateAboutSection();
});



