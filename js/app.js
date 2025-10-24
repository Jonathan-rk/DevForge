// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Feather Icons
feather.replace();

// Mobile Menu - CORRIGIDO
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

if (mobileMenuBtn && mobileMenu && closeMenu) {
  let isMenuOpen = false;

  function openMenu() {
    mobileMenu.classList.add("show");
    document.body.style.overflow = "hidden";
    isMenuOpen = true;
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("show");
    document.body.style.overflow = "";
    isMenuOpen = false;
  }

  mobileMenuBtn.addEventListener("click", () => {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMobileMenu();
    }
  });

  closeMenu.addEventListener("click", closeMobileMenu);

  // Close mobile menu when clicking on links
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close menu when clicking outside
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  // Close menu with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMobileMenu();
    }
  });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "none";
    }
  }
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq-item");
    const answer = faqItem.querySelector(".faq-answer");
    const icon = button.querySelector("i");

    // Toggle active class on FAQ item
    const isActive = faqItem.classList.contains("active");

    // Close all FAQs first
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    document.querySelectorAll(".faq-question i").forEach((i) => {
      i.setAttribute("data-feather", "plus");
    });

    // If it wasn't active, open it
    if (!isActive) {
      faqItem.classList.add("active");
      icon.setAttribute("data-feather", "minus");
    }

    feather.replace();
  });
});

// Animated Counter
const animateCounter = (element, target) => {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString("pt-BR");
  }, 16);
};

// Initialize counters when visible
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute("data-target"));
      animateCounter(entry.target, target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".stats-number").forEach((counter) => {
  observer.observe(counter);
});

// Countdown Timer
function updateCountdown() {
  document.querySelectorAll(".countdown").forEach((element) => {
    const hours = parseInt(element.getAttribute("data-hours"));
    const endTime = new Date().getTime() + hours * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timer);
        element.textContent = "Encerrado";
        return;
      }

      const h = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      element.textContent = `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }, 1000);
  });
}

updateCountdown();

// GSAP Animations
// Hero content animation
gsap.from(".hero-content > *", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});

// Module items animation
gsap.utils.toArray(".module-item").forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    x: index % 2 === 0 ? -50 : 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});

// Card hover animations
document.querySelectorAll(".card-hover").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Stats animation
gsap.utils.toArray(".stat-item").forEach((stat, index) => {
  gsap.from(stat, {
    scrollTrigger: {
      trigger: stat,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: index * 0.1,
    ease: "power2.out",
  });
});

// Journey cards animation
gsap.utils.toArray(".journey-card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.2,
    ease: "power2.out",
  });
});

// Transformation cards animation
gsap.utils.toArray(".transformation-card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: index * 0.1,
    ease: "power2.out",
  });
});

// Testimonial cards animation
gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.2,
    ease: "power2.out",
  });
});

// Instructor card animation
gsap.from(".instructor-card", {
  scrollTrigger: {
    trigger: ".instructor-card",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

// Pricing card animation
gsap.from(".pricing-card", {
  scrollTrigger: {
    trigger: ".pricing-card",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  scale: 0.9,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

// FAQ items animation
gsap.utils.toArray(".faq-item").forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: index * 0.1,
    ease: "power2.out",
  });
});

// Final CTA animation
gsap.from(".final-cta", {
  scrollTrigger: {
    trigger: ".final-cta",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

// Floating elements animation
gsap.to(".floating-element", {
  y: -20,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// Blob animations
gsap.to(".blob", {
  scale: 1.1,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  stagger: 2,
});

// Text animation for hero title
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
  const text = new SplitType(heroTitle, { types: "lines,words" });

  gsap.from(text.words, {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
  });
}

// Parallax effect for background
window.addEventListener("scroll", () => {
  const parallaxBg = document.querySelector(".parallax-bg");
  if (parallaxBg) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    parallaxBg.style.transform = `translate3d(0px, ${rate}px, 0px)`;
  }
});

// Initialize all animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Re-initialize feather icons after any dynamic content changes
  feather.replace();

  // Add loading animation
  gsap.from("body", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
});

// Handle responsive behavior
function handleResize() {
  // Re-initialize animations on resize if needed
  ScrollTrigger.refresh();
}

window.addEventListener("resize", handleResize);

// Add intersection observer for all sections
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(section);
});
