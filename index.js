document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: false,
    offset: 100,
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Don't prevent default for card links
      if (this.classList.contains("cardlink")) return;

      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") return; // Skip empty fragments

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Slider - only on desktop
  if (window.innerWidth >= 768) {
    new Swiper(".card", {
      loop: true,
      spaceBetween: 30,
      autoHeight: true,
      allowTouchMove: true,
      touchStartPreventDefault: false,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }

  // Card interaction - works on ALL screen sizes
  document.querySelectorAll(".cardlink").forEach((cardLink) => {
    cardLink.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  document.querySelectorAll(".cardbtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const cardLink = btn.closest(".cardlink");
      cardLink.classList.toggle("show-details");
    });
  });

  // Table heading animations
  const headings = document.querySelectorAll(
    ".table h1, .references-section h1"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("animate"), 500);
        } else {
          el.classList.remove("animate");
        }
      });
    },
    { threshold: 0.3 }
  );

  headings.forEach((h1) => observer.observe(h1));
});
