// Testi per l'effetto di scrittura con correzione
const textsToType = [
    { id: "typing-title", text: "Benvenuto!" },
    {
        id: "typing-paragraph-1",
        text: "Credo in un futuro digitale che ispiri, connetta e migliori la vita di tutti.",
        correction: {
            correctedText: "Sono Henry, un Full-Stack Developer appassionato di costruire esperienze web moderne, performanti e coinvolgenti."
        }
    },
    { id: "typing-paragraph-2", text: "Sono Henry, un Full-Stack Developer appassionato di costruire esperienze web moderne, performanti e coinvolgenti." },
    { id: "typing-paragraph-3", text: "Ho lavorato su una varietà di progetti, combinando design creativo e sviluppo tecnico, per costruire soluzioni web intuitive e sistemi backend robusti e scalabili." },
    { id: "skills-title", text: "Le mie competenze" },
    { id: "skills-intro", text: "Ho maturato esperienza in:" },
    { id: "skills-frontend", text: "Frontend: HTML, CSS, JavaScript, React" },
    { id: "skills-backend", text: "Backend: Node.js, Express, MongoDB" },
    { id: "skills-version-control", text: "Version Control: Git & GitHub" }
];

const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 500;
let currentTextIndex = 0;
let isCorrecting = false;

function typeEffectSequential() {
    if (currentTextIndex < textsToType.length) {
        const { id, text, correction } = textsToType[currentTextIndex];
        const element = document.getElementById(id);

        if (element) {
            let charIndex = 0;

            const cursor = document.createElement("span");
            cursor.textContent = "|";
            cursor.style.color = "#ffa500";
            cursor.style.animation = "blink 0.7s steps(2, start) infinite";
            element.innerHTML = "";
            element.appendChild(cursor);

            const typeNextChar = () => {
                if (charIndex < text.length) {
                    element.insertBefore(
                        document.createTextNode(text.charAt(charIndex)),
                        cursor
                    );
                    charIndex++;
                    setTimeout(typeNextChar, typingSpeed);
                } else if (correction && !isCorrecting) {
                    isCorrecting = true;
                    deleteChars();
                } else {
                    currentTextIndex++;
                    isCorrecting = false;
                    setTimeout(() => {
                        cursor.remove();
                        typeEffectSequential();
                    }, delayBetweenTexts);
                }
            };

            const deleteChars = () => {
                if (element.childNodes.length > 1) {
                    element.removeChild(element.childNodes[element.childNodes.length - 2]);
                    setTimeout(deleteChars, deletingSpeed);
                } else {
                    textsToType[currentTextIndex].text = correction.correctedText;
                    typeNextChar();
                }
            };

            typeNextChar();
        }
    } else {
        console.log("Effetto completato!");
    }
}

// Configurazione dell'osservatore
const observerOptions = {
    root: null, // Osserva l'intero viewport
    threshold: 0.2 // L'animazione parte quando il 20% dell'elemento è visibile
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animationKey = "textAnimationPlayed";

            if (!sessionStorage.getItem(animationKey)) { // Usa sessionStorage
                typeEffectSequential();
                sessionStorage.setItem(animationKey, "true");
            } else {
                textsToType.forEach(({ id, text }) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = text;
                    }
                });
            }

            // Smette di osservare l'elemento una volta animato
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Osserva l'elemento principale per il typing
document.addEventListener("DOMContentLoaded", () => {
    const mainElement = document.getElementById("typing-title"); // Primo elemento da osservare
    if (mainElement) {
        observer.observe(mainElement);
    }
});

// Aggiungi animazione per il cursore lampeggiante
const style = document.createElement("style");
style.textContent = `
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
