'use strict';

// Particles.js Configuration
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#ffd700' },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: false },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffd700',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
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
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    }
  },
  retina_detect: true
});

// Theme switching functionality
const themeButtons = document.querySelectorAll('.theme-btn');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
setTheme(savedTheme);

// Theme switching
themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    setTheme(theme);
    localStorage.setItem('theme', theme);

    // Update active button
    themeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

function setTheme(theme) {
  if (theme === 'auto') {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      html.dataset.theme = 'light';
    } else {
      html.dataset.theme = 'dark';
    }
  } else {
    html.dataset.theme = theme;
  }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  if (localStorage.getItem('theme') === 'auto') {
    setTheme('auto');
  }
});



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Mobile menu toggle
const menuButton = document.querySelector("[data-menu-toggle]");
const mobileSidebar = document.querySelector("[data-mobile-sidebar]");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

menuButton.addEventListener("click", () => {
  mobileSidebar.classList.toggle("active");
});

// Auto collapse mobile sidebar when a link is clicked
mobileNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileSidebar.classList.remove("active");
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function updateActiveStates(clickedLink) {
  const targetPage = clickedLink.innerHTML.toLowerCase();
  
  // Update all navigation links and pages
  navigationLinks.forEach(link => {
    if (link.innerHTML.toLowerCase() === targetPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  pages.forEach(page => {
    if (page.dataset.page === targetPage) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });

  window.scrollTo(0, 0);
}

// add event to all nav links
navigationLinks.forEach(link => {
  link.addEventListener("click", function() {
    updateActiveStates(this);
  });
});

// Blog modal functionality
const blogPosts = document.querySelectorAll(".blog-post-item");
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");
const blogModalImg = document.querySelector("[data-blog-modal-img]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalCategory = document.querySelector("[data-blog-modal-category]");
const blogModalDate = document.querySelector("[data-blog-modal-date]");

const modalContents = {
  ai: document.querySelector("[data-modal-ai]"),
  cloud: document.querySelector("[data-modal-cloud]"),
  mobile: document.querySelector("[data-modal-mobile]"),
  performance: document.querySelector("[data-modal-performance]"),
  testing: document.querySelector("[data-modal-testing]"),
  frontend: document.querySelector("[data-modal-frontend]")
};

// Blog modal toggle function
const blogModalFunc = function () {
  blogModalContainer.classList.toggle("active");
  blogOverlay.classList.toggle("active");
}

// Hide all modal contents
const hideAllModalContents = () => {
  Object.values(modalContents).forEach(content => {
    if (content) content.style.display = 'none';
  });
};

// Add click event only to blog articles (not certifications)
const blogArticlePosts = document.querySelectorAll('[data-page="blog"] .blog-post-item');
blogArticlePosts.forEach(post => {
  post.addEventListener("click", function (e) {
    e.preventDefault();

    const img = this.querySelector("img");
    const title = this.querySelector(".blog-item-title");
    const category = this.querySelector(".blog-category");
    const date = this.querySelector("time");

    blogModalImg.src = img.src;
    blogModalImg.alt = img.alt;
    blogModalTitle.innerHTML = title.innerHTML;
    blogModalCategory.innerHTML = category.innerHTML;
    blogModalDate.innerHTML = date.innerHTML;
    blogModalDate.setAttribute('datetime', date.getAttribute('datetime'));

    // Show relevant modal content based on category
    hideAllModalContents();
    const categoryText = category.innerHTML.toLowerCase();

    if (categoryText.includes('artificial intelligence')) {
      modalContents.ai.style.display = 'block';
    } else if (categoryText.includes('cloud')) {
      modalContents.cloud.style.display = 'block';
    } else if (categoryText.includes('mobile')) {
      modalContents.mobile.style.display = 'block';
    } else if (categoryText.includes('performance')) {
      modalContents.performance.style.display = 'block';
    } else if (categoryText.includes('testing')) {
      modalContents.testing.style.display = 'block';
    } else if (categoryText.includes('frontend')) {
      modalContents.frontend.style.display = 'block';
    }

    blogModalFunc();
  });
});

// Add click events to close modal
blogModalCloseBtn.addEventListener("click", blogModalFunc);
blogOverlay.addEventListener("click", blogModalFunc);