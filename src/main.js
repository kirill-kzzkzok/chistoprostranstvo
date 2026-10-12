// ============================================================================
// ЧистоПространство - Main JavaScript
// ============================================================================

// Service details data
const serviceDetails = {
  regular: {
    title: "Регулярная уборка",
    description:
      "Поддерживающая уборка для ежедневной свежести. Включает влажную уборку всех помещений, кухню, санузел, вынос мусора. Подходит для квартир и домов, которые регулярно поддерживаются в чистоте.",
  },
  deep: {
    title: "Генеральная уборка",
    description:
      "Глубокая уборка всех зон и поверхностей. Плинтусы, радиаторы, светильники, внутренние поверхности окон, межкомнатные двери, кухонные фасады. Рекомендуется проводить раз в 2-3 месяца или перед важными событиями.",
  },
  renovation: {
    title: "После ремонта",
    description:
      "Удаление строительной пыли, следов клея, защитных плёнок. Мытьё окон изнутри и снаружи, уборка балконов. Несколько проходов по всем поверхностям. Обязательна предварительная оценка объёма работ.",
  },
  office: {
    title: "Офисная уборка",
    description:
      "Рабочие места, переговорные, кухня, санузлы, стеклянные перегородки. Возможен выезд после рабочего дня или в выходные. Фиксированный график и одна команда для вашего объекта.",
  },
  windows: {
    title: "Мытьё окон",
    description:
      "Рамы, стёкла, подоконники изнутри и снаружи. Удаление следов скотча и защитных плёнок. Работаем без разводов проверенными средствами. Цена за одну открывающуюся створку, глухие — отдельно.",
  },
  furniture: {
    title: "Химчистка мебели",
    description:
      "Диваны, кресла, матрасы, стулья. Удаление пятен, пыли и запахов. Используем безопасную химию без резких запахов. Время высыхания — от 4 до 8 часов в зависимости от типа обивки.",
  },
};

// Calculator pricing logic
const pricingRates = {
  apartment: {
    regular: 42,
    deep: 74,
    renovation: 112,
  },
  house: {
    regular: 45,
    deep: 78,
    renovation: 118,
  },
  office: {
    regular: 48,
    deep: 82,
    renovation: 125,
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

let toastTimeout;

function showToast(message, duration = 3000) {
  let toast = document.querySelector(".interaction-status");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "interaction-status";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(
    () => toast.classList.remove("is-visible"),
    duration,
  );
}

function smoothScroll(target) {
  const element = document.querySelector(target);
  if (!element) return;

  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// ============================================================================
// Promo Float
// ============================================================================

function initPromoFloat() {
  const promo = document.getElementById("promoFloat");
  if (!promo) return;

  const dismissButtons = promo.querySelectorAll("[data-dismiss-promo]");

  dismissButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.tagName === "A") {
        // Let anchor navigation happen
      }
      promo.classList.add("hide");

      // Store dismissal in sessionStorage
      sessionStorage.setItem("promoDismissed", "true");
    });
  });

  // Check if already dismissed
  if (sessionStorage.getItem("promoDismissed") === "true") {
    promo.classList.add("hide");
  }
}

// ============================================================================
// Mobile Navigation
// ============================================================================

function initMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = navMenu?.querySelectorAll(".nav-menu__link");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    const nextExpanded = !isExpanded;
    navToggle.setAttribute("aria-expanded", nextExpanded);
    navToggle.setAttribute(
      "aria-label",
      nextExpanded ? "Закрыть меню" : "Открыть меню",
    );
    navMenu.classList.toggle("is-open", nextExpanded);

    // Prevent body scroll when menu is open
    if (!isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking on a link
  navLinks?.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");

      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Открыть меню");
      navMenu.classList.remove("is-open");
      document.body.style.overflow = "";

      // Small delay for smooth close animation
      setTimeout(() => {
        smoothScroll(target);
      }, 100);
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      navToggle.getAttribute("aria-expanded") === "true"
    ) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Открыть меню");
      navMenu.classList.remove("is-open");
      document.body.style.overflow = "";
      navToggle.focus();
    }
  });
}

// ============================================================================
// Smooth Anchor Scrolling
// ============================================================================

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#" or if menu is handling it
      if (href === "#" || this.classList.contains("nav-menu__link")) {
        return;
      }

      e.preventDefault();
      smoothScroll(href);
    });
  });
}

// ============================================================================
// Services Interaction
// ============================================================================

function initServices() {
  const serviceButtons = document.querySelectorAll(".service-item");
  const serviceDetail = document.getElementById("serviceDetail");

  if (!serviceDetail) return;

  serviceButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // The trailing arrow is an explicit shortcut to the order calculator.
      // Keep the row itself as the service selector.
      if (event.target.closest?.(".service-item__icon")) {
        event.preventDefault();
        smoothScroll("#calculator");
        return;
      }
      // Remove active state from all buttons
      serviceButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active state to clicked button
      button.classList.add("active");

      // Get service data
      const serviceKey = button.getAttribute("data-service");
      const service = serviceDetails[serviceKey];

      if (service) {
        serviceDetail.innerHTML = `
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        `;
      }
    });
  });

  // Activate first service by default
  if (serviceButtons.length > 0) {
    serviceButtons[0].click();
  }
}

// ============================================================================
// Calculator
// ============================================================================

function initCalculator() {
  const form = document.getElementById("calculatorForm");
  if (!form) return;

  const objectType = form.querySelector('[name="objectType"]');
  const area = form.querySelector('[name="area"]');
  const areaOutput = document.getElementById("areaOutput");
  const cleaningType = form.querySelector('[name="cleaningType"]');
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  const totalElement = document.getElementById("calculatorTotal");
  let isSubmitting = false;

  function calculatePrice() {
    const object = objectType?.value || "apartment";
    const areaValue = parseInt(area?.value || "75");
    const cleaning = cleaningType?.value || "regular";

    // Base price calculation
    const rate = pricingRates[object]?.[cleaning] || 42;
    let basePrice = areaValue * rate;

    // Add extras
    let extrasPrice = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        extrasPrice += parseInt(checkbox.value || "0");
      }
    });

    const total = basePrice + extrasPrice;

    // Update display
    if (totalElement) {
      totalElement.textContent = `от ${total.toLocaleString("ru-RU")} ₽`;
    }

    // Update area output
    if (areaOutput && area) {
      areaOutput.textContent = `${area.value} м²`;
    }
  }

  // Listen to all input changes
  objectType?.addEventListener("change", calculatePrice);
  area?.addEventListener("input", calculatePrice);
  cleaningType?.addEventListener("change", calculatePrice);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", calculatePrice);
  });

  // Initial calculation
  calculatePrice();

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;
    showToast("Демо-форма: данные не отправляются.", 4000);

    // Scroll to contact form or show success
    setTimeout(() => {
      smoothScroll("#contact");
      isSubmitting = false;
    }, 1000);
  });
}

// ============================================================================
// Before/After Comparison Slider
// ============================================================================

function initComparison() {
  const comparisons = document.querySelectorAll("[data-comparison]");

  comparisons.forEach((container) => {
    const divider = container.querySelector(".comparison__divider");
    const afterElement = container.querySelector(".comparison__after");

    if (!divider || !afterElement) return;

    let isDragging = false;

    function updatePosition(x) {
      const rect = container.getBoundingClientRect();
      const position = ((x - rect.left) / rect.width) * 100;
      const clampedPosition = Math.max(0, Math.min(100, position));

      divider.style.left = `${clampedPosition}%`;
      afterElement.style.clipPath = `polygon(${clampedPosition}% 0, 100% 0, 100% 100%, ${clampedPosition}% 100%)`;

      divider.setAttribute("aria-valuenow", Math.round(clampedPosition));
    }

    // Mouse events
    divider.addEventListener("mousedown", (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Touch events
    divider.addEventListener("touchstart", (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        updatePosition(touch.clientX);
        e.preventDefault();
      },
      { passive: false },
    );

    document.addEventListener("touchend", () => {
      isDragging = false;
    });

    // Click to position
    container.addEventListener("click", (e) => {
      if (e.target === divider || divider.contains(e.target)) return;
      updatePosition(e.clientX);
    });

    // Keyboard navigation
    divider.addEventListener("keydown", (e) => {
      const currentLeft = parseFloat(divider.style.left) || 50;
      let newLeft = currentLeft;

      if (e.key === "ArrowLeft") {
        newLeft = Math.max(0, currentLeft - 2);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        newLeft = Math.min(100, currentLeft + 2);
        e.preventDefault();
      }

      divider.style.left = `${newLeft}%`;
      afterElement.style.clipPath = `polygon(${newLeft}% 0, 100% 0, 100% 100%, ${newLeft}% 100%)`;
      divider.setAttribute("aria-valuenow", Math.round(newLeft));
    });
  });
}

// ============================================================================
// FAQ Accordion
// ============================================================================

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const summary = item.querySelector("summary");

    summary?.addEventListener("click", (e) => {
      // Close other items (one open at a time)
      const wasOpen = item.hasAttribute("open");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });

      // If it was already open and we just closed it, prevent reopening
      if (wasOpen) {
        e.preventDefault();
        item.removeAttribute("open");
      }
    });
  });
}

// ============================================================================
// Contact Form
// ============================================================================

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  let isSubmitting = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const name = form.querySelector('[name="name"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();

    if (!name || !phone) {
      showToast("Пожалуйста, заполните все обязательные поля");
      return;
    }

    isSubmitting = true;

    showToast("Демо-форма: данные не отправляются.", 4000);

    // Reset form
    form.reset();

    // Prevent accidental double-click submissions while feedback is visible.
    setTimeout(() => {
      isSubmitting = false;
    }, 1000);
  });
}

// ============================================================================
// Scroll Reveal Animations
// ============================================================================

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        // Stop observing after reveal (performance)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((reveal) => {
    observer.observe(reveal);
  });
}

// ============================================================================
// Sticky Header with Hide on Scroll
// ============================================================================

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        // Hide header on scroll down, show on scroll up - with threshold to prevent flicker
        if (
          currentScroll > lastScroll &&
          currentScroll > 150 &&
          Math.abs(currentScroll - lastScroll) > 5
        ) {
          header.classList.add("hidden");
        } else if (
          currentScroll < lastScroll &&
          Math.abs(currentScroll - lastScroll) > 5
        ) {
          header.classList.remove("hidden");
        }

        // Add shadow when scrolled
        if (currentScroll > 100) {
          header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
        } else {
          header.style.boxShadow = "";
        }

        lastScroll = currentScroll;
        ticking = false;
      });

      ticking = true;
    }
  });
}

// ============================================================================
// Marquee Duplication (for seamless loop)
// ============================================================================

function initMarquee() {
  const tracks = document.querySelectorAll(".marquee__track");
  // The markup already contains a complete second copy for the seamless
  // loop. Duplicating it again here made the content appear four times and
  // changed the intended animation cadence.
  tracks.forEach((track) => (track.dataset.marqueeReady = "true"));
}

// ============================================================================
// Image Loading Optimization
// ============================================================================

function initLazyLoading() {
  if ("loading" in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.src = img.src; // Trigger loading
    });
  } else {
    // Fallback for older browsers
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    document.body.appendChild(script);
  }
}

// ============================================================================
// Statistics Counter Animation
// ============================================================================

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");

  if (!counters.length) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const animateCounter = (element) => {
    const target = element.getAttribute("data-count");
    const isDecimal = target.includes(".");
    const isFraction = target.includes("/");

    if (isFraction) {
      // Don't animate fractions like "4,9/5"
      element.textContent = target;
      return;
    }

    if (isDecimal) {
      // Don't animate decimals like "4,9"
      element.textContent = target;
      return;
    }

    const endValue = parseInt(target.replace(/\D/g, ""));
    const duration = 2000;
    const increment = endValue / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current < endValue) {
        element.textContent = Math.floor(current).toLocaleString("ru-RU");
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent =
          endValue.toLocaleString("ru-RU") +
          (target.includes("+") ? "+" : "") +
          (target.includes("%") ? "%" : "");
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// ============================================================================
// Rotating Text Animation
// ============================================================================

function initRotatingText() {
  const rotatingElements = document.querySelectorAll(".rotating-text");

  rotatingElements.forEach((element) => {
    const wordsAttr = element.getAttribute("data-words");
    if (!wordsAttr) return;

    let words;
    try {
      words = JSON.parse(wordsAttr);
    } catch {
      return;
    }

    if (!Array.isArray(words) || words.length < 2) return;
    let currentIndex = 0;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;
      element.style.opacity = "0";

      setTimeout(() => {
        element.textContent = words[currentIndex];
        element.style.opacity = "1";
      }, 300);
    }, 3000);
  });
}

// ============================================================================
// Scroll Fade Animations
// ============================================================================

function initScrollFade() {
  const fadeElements = document.querySelectorAll(
    ".scroll-fade, section.section:not(.hero) > .container",
  );

  if (!fadeElements.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // Reset the state after leaving the viewport so the reveal plays
        // again on the next scroll pass, preserving the existing animation.
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  fadeElements.forEach((element) => {
    element.classList.add("scroll-fade");
    observer.observe(element);
  });
}

// ============================================================================
// Initialize Everything
// ============================================================================

function init() {
  // Core functionality
  initPromoFloat();
  initMobileNav();
  initSmoothAnchors();

  // Interactive sections
  initServices();
  initCalculator();
  initComparison();
  initFAQ();
  initContactForm();

  // Visual enhancements
  initScrollReveal();
  initStickyHeader();
  initMarquee();
  initCounters();
  initRotatingText();
  initScrollFade();

  // Performance
  initLazyLoading();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Handle page visibility for animations
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations if needed
  } else {
    // Resume animations if needed
  }
});

// Export for module usage
export { showToast, smoothScroll, initCalculator, initComparison };
