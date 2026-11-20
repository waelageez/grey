const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      successMessage.classList.remove("hidden");
      errorMessage.classList.add("hidden");
      contactForm.reset();

      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    errorMessage.classList.remove("hidden");
    successMessage.classList.add("hidden");

    setTimeout(() => {
      errorMessage.classList.add("hidden");
    }, 5000);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    navbar.classList.add("shadow-lg");
  } else {
    navbar.classList.remove("shadow-lg");
  }
});

const scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
