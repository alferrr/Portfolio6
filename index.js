//aos

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: false,
    offset: 100,
  });

  // slider - only on desktop
  if (window.innerWidth >= 768) {
    new Swiper(".card", {
      loop: true,
      spaceBetween: 30,
      autoHeight: true,

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
  } // Close the if statement here

  // These should work on ALL screen sizes (mobile + desktop)
  document.querySelectorAll(".cardlink").forEach((cardLink) => {
    cardLink.addEventListener("click", (e) => {
      e.preventDefault(); // Stop the link from navigating
    });
  });

  document.querySelectorAll(".cardbtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // stop the <a> link from navigating
      const cardLink = btn.closest(".cardlink");
      cardLink.classList.toggle("show-details");
    });
  });

  // Table heading animations
  const headings = document.querySelectorAll(".table h1");

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
