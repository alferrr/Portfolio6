document.addEventListener("DOMContentLoaded", () => {
  // login page
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const roleInput = document.querySelector('input[name="role"]:checked');

      if (!name) {
        alert("Please enter your name!");
        return;
      }

      if (!roleInput) {
        alert("Please select a role!");
        return;
      }

      const role = roleInput.value;

      localStorage.setItem("userName", name);
      localStorage.setItem("userRole", role);

      // ikuan sa sheets
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyvcG8s9Dj5u1-Wqv5svkTsVTASiInYAb3L4KRVcaRDM-6VMYb_rRSLVSjcVSbLVFzU/exec";

      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);

      fetch(scriptURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          window.location.href = "portfolio.html";
        })
        .catch((error) => {
          console.error("Error:", error);
          window.location.href = "portfolio.html";
        });
    });
  }

  //typing

  const subtitle = document.querySelector("#coverpage .title h2");
  const storedName = localStorage.getItem("userName");
  const storedRole = localStorage.getItem("userRole");

  if (subtitle && storedName && storedRole) {
    const originalText = subtitle.textContent;

    function typeText(text, callback) {
      subtitle.textContent = "";
      let i = 0;
      const typing = setInterval(() => {
        subtitle.textContent += text.charAt(i);
        i++;
        if (i === text.length) {
          clearInterval(typing);
          if (callback) callback();
        }
      }, 80);
    }

    function eraseText(callback) {
      let text = subtitle.textContent;
      const erasing = setInterval(() => {
        text = text.slice(0, -1);
        subtitle.textContent = text;
        if (text.length === 0) {
          clearInterval(erasing);
          if (callback) callback();
        }
      }, 40);
    }

    if (storedRole === "teacher") {
      typeText(`Hello, Professor ${storedName}!`, () => {
        setTimeout(() => {
          eraseText(() => {
            typeText(originalText);
          });
        }, 2500);
      });
    } else {
      typeText(`Hello, ${storedName}!`, () => {
        setTimeout(() => {
          eraseText(() => {
            typeText(originalText);
          });
        }, 2500);
      });
    }
  }

  // aos
  AOS.init({
    duration: 800,
    once: false,
    offset: 100,
  });

  // smooth scroll
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

  // slider
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

  //card
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

  //line under h1s
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
