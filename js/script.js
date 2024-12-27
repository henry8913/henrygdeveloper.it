// Menu Hamburger
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');

        // Modifica dinamicamente l'altezza dell'header
        if (navbar.classList.contains('active')) {
            const navbarHeight = navbar.scrollHeight;
            header.style.height = `${navbarHeight + 20}px`; // Altezza dinamica
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
    'contact.html': 'Contatti'
};

if (currentPageSpan) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    currentPageSpan.textContent = pageTitles[currentPath] || 'Home';
    currentPageSpan.style.color = '#ffa500'; // Colore arancione
}

// Effetto Scroll su Sezioni
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Effetto Hover sui Progetti
const projectArticles = document.querySelectorAll('.project-preview article');

if (projectArticles.length > 0) {
    projectArticles.forEach(article => {
        article.addEventListener('mouseover', () => {
            article.style.transform = 'scale(1.05)';
            article.style.transition = 'transform 0.3s ease';
        });

        article.addEventListener('mouseout', () => {
            article.style.transform = 'scale(1)';
        });
    });
}

// Testi per l'effetto di scrittura con correzione
const textsToType = [
    // Sezione intro
    { id: "typing-title", text: "Benvenuto!" },
    {
        id: "typing-paragraph-1",
        text: "Credo in un futuro digitale che ispiri, connetta e migliori la vita di tutti.",
        correction: {
            correctedText: "Sono Henry, un Full-Stack Developer appassionato di costruire esperienze web moderne, performanti e coinvolgenti." // Testo corretto
        }
    },
    { id: "typing-paragraph-2", text: "Sono Henry, un Full-Stack Developer appassionato di costruire esperienze web moderne, performanti e coinvolgenti." },
    { id: "typing-paragraph-3", text: "Ho lavorato su una varietà di progetti, dal design di interfacce utente eleganti allo sviluppo di sistemi backend scalabili." },

    // Sezione skills
    { id: "skills-title", text: "Le mie competenze" },
    { id: "skills-intro", text: "Sono esperto in:" },
    { id: "skills-frontend", text: "Frontend: HTML, CSS, JavaScript, React" },
    { id: "skills-backend", text: "Backend: Node.js, Express, MongoDB" },
    { id: "skills-version-control", text: "Version Control: Git & GitHub" }
];

const typingSpeed = 125; // Velocità di digitazione in millisecondi
const deletingSpeed = 100; // Velocità di cancellazione
const delayBetweenTexts = 500; // Ritardo tra un testo e il successivo
let currentTextIndex = 0; // Testo attualmente in scrittura
let isCorrecting = false; // Flag per controllare la correzione

// Funzione per l'effetto di scrittura con cursore lampeggiante e correzione
function typeEffectSequential() {
    if (currentTextIndex < textsToType.length) {
        const { id, text, correction } = textsToType[currentTextIndex];
        const element = document.getElementById(id);

        if (element) {
            let charIndex = 0;

            // Aggiungi il cursore lampeggiante
            const cursor = document.createElement("span");
            cursor.textContent = "|";
            cursor.style.color = "#ffa500"; // Colore arancione
            cursor.style.animation = "blink 0.7s steps(2, start) infinite";
            element.innerHTML = ""; // Resetta il contenuto
            element.appendChild(cursor);

            // Funzione per scrivere il testo carattere per carattere
            const typeNextChar = () => {
                if (charIndex < text.length) {
                    // Scrivi il prossimo carattere
                    element.insertBefore(
                        document.createTextNode(text.charAt(charIndex)),
                        cursor
                    );
                    charIndex++;
                    setTimeout(typeNextChar, typingSpeed);
                } else if (correction && !isCorrecting) {
                    // Se c'è una correzione, inizia la cancellazione
                    isCorrecting = true;
                    deleteChars();
                } else {
                    // Passa al prossimo testo dopo una pausa
                    currentTextIndex++;
                    isCorrecting = false;
                    setTimeout(() => {
                        cursor.remove(); // Rimuove il cursore
                        typeEffectSequential(); // Passa al prossimo testo
                    }, delayBetweenTexts);
                }
            };

            // Funzione per cancellare tutto il testo
            const deleteChars = () => {
                if (element.childNodes.length > 1) {
                    element.removeChild(element.childNodes[element.childNodes.length - 2]); // Rimuovi un carattere alla volta
                    setTimeout(deleteChars, deletingSpeed);
                } else {
                    // Dopo la cancellazione, scrivi immediatamente il testo corretto
                    textsToType[currentTextIndex].text = correction.correctedText; // Aggiorna il testo
                    typeNextChar(); // Riprendi la scrittura
                }
            };

            typeNextChar();
        }
    } else {
        console.log("Effetto completato!"); // Debug: Tutti i testi sono stati scritti
    }
}

// Avvia l'effetto di scrittura quando la pagina viene caricata
window.addEventListener("DOMContentLoaded", () => {
    typeEffectSequential();
});

// Aggiungi animazione per il cursore lampeggiante tramite CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);




// Avvia l'effetto di scrittura quando la pagina viene caricata
window.addEventListener("DOMContentLoaded", () => {
    typeEffectSequential();

    // Configurazione di Particles.js
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
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;

    // Invia i dati a Formspree
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
            form.reset(); // Resetta il modulo
        } else {
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('error-message').style.display = 'block';
        }
    })
    .catch(() => {
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
    });
});


