// vercel-analytics.js
window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
};

const analyticsScript = document.createElement('script');
analyticsScript.src = '/_vercel/insights/script.js';
analyticsScript.defer = true;
document.head.appendChild(analyticsScript);
