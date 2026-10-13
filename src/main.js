// ============================================================================
// ЧистоПространство — главная логика страницы
// ============================================================================

// Описания услуг для панели «serviceDetail»
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

// Тарифы калькулятора: ₽ за м² в зависимости от типа объекта и типа уборки.
// Ставка по умолчанию — 42 ₽/м² (квартира, регулярная уборка).
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
// Утилиты
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
// Плавающий промо-блок
// ============================================================================

function initPromoFloat() {
  const promo = document.getElementById("promoFloat");
  if (!promo) return;

  const dismissButtons = promo.querySelectorAll("[data-dismiss-promo]");

  dismissButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Ссылка-CTA продолжает работать как обычный якорь на #calculator.
      promo.classList.add("hide");
      sessionStorage.setItem("promoDismissed", "true");
    });
  });

  // Уже скрыт в этой сессии
  if (sessionStorage.getItem("promoDismissed") === "true") {
    promo.classList.add("hide");
  }
}

// ============================================================================
// Мобильная навигация
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

    // Блокируем прокрутку страницы, пока меню открыто
    document.body.style.overflow = nextExpanded ? "hidden" : "";
  });

  // Закрываем меню при клике по ссылке
  navLinks?.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");

      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Открыть меню");
      navMenu.classList.remove("is-open");
      document.body.style.overflow = "";

      // Небольшая пауза, чтобы успела отыграть анимация закрытия меню
      setTimeout(() => {
        smoothScroll(target);
      }, 100);
    });
  });

  // Закрытие меню по Escape
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
// Плавный скролл по якорям
// ============================================================================

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // "#" и ссылки меню обрабатываются отдельно
      if (href === "#" || this.classList.contains("nav-menu__link")) {
        return;
      }

      e.preventDefault();
      smoothScroll(href);
    });
  });
}

// ============================================================================
// Блок услуг
// ============================================================================

function initServices() {
  const serviceButtons = document.querySelectorAll(".service-item");
  const serviceDetail = document.getElementById("serviceDetail");

  if (!serviceDetail) return;

  serviceButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Стрелка в строке услуги — явный переход к калькулятору,
      // сама строка остаётся переключателем услуг.
      if (event.target.closest?.(".service-item__icon")) {
        event.preventDefault();
        smoothScroll("#calculator");
        return;
      }
      // Снимаем выделение со всех строк услуг
      serviceButtons.forEach((btn) => btn.classList.remove("active"));

      // Подсвечиваем выбранную строку
      button.classList.add("active");

      // Данные выбранной услуги
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

  // По умолчанию выбираем первую услугу
  if (serviceButtons.length > 0) {
    serviceButtons[0].click();
  }
}

// ============================================================================
// Калькулятор стоимости
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

    // База: площадь × тариф (₽/м² для выбранного объекта и типа уборки)
    const rate = pricingRates[object]?.[cleaning] || 42;
    const basePrice = areaValue * rate;

    // Допуслуги: фиксированные суммы из value-атрибутов чекбоксов
    let extrasPrice = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        extrasPrice += parseInt(checkbox.value || "0");
      }
    });

    const total = basePrice + extrasPrice;

    // Обновляем итоговую сумму
    if (totalElement) {
      totalElement.textContent = `от ${total.toLocaleString("ru-RU")} ₽`;
    }

    // Обновляем подпись площади
    if (areaOutput && area) {
      areaOutput.textContent = `${area.value} м²`;
    }
  }

  // Пересчёт по любому изменению полей формы
  objectType?.addEventListener("change", calculatePrice);
  area?.addEventListener("input", calculatePrice);
  cleaningType?.addEventListener("change", calculatePrice);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", calculatePrice);
  });

  // Первичный расчёт при загрузке
  calculatePrice();

  // Отправка формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;
    showToast("Демо-форма: данные не отправляются.", 4000);

    // После показа тоста ведём пользователя к контактной форме
    setTimeout(() => {
      smoothScroll("#contact");
      isSubmitting = false;
    }, 1000);
  });
}

// ============================================================================
// Слайдер «до/после»
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

    // Мышь
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

    // Тач-события
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

    // Клик по контейнеру перемещает разделитель
    container.addEventListener("click", (e) => {
      if (e.target === divider || divider.contains(e.target)) return;
      updatePosition(e.clientX);
    });

    // Клавиатура
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
// Аккордеон FAQ
// ============================================================================

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const summary = item.querySelector("summary");

    summary?.addEventListener("click", (e) => {
      // Закрываем остальные вопросы — открытым остаётся только один
      const wasOpen = item.hasAttribute("open");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });

      // Если вопрос был открыт — закрываем его и не даём тут же открыться снова
      if (wasOpen) {
        e.preventDefault();
        item.removeAttribute("open");
      }
    });
  });
}

// ============================================================================
// Форма заявки
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

    // Сбрасываем форму
    form.reset();

    // Гасим случайный даблклик, пока виден тост с подтверждением.
    setTimeout(() => {
      isSubmitting = false;
    }, 1000);
  });
}

// ============================================================================
// Липкая шапка, скрывающаяся при скролле
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

        // Скролл вниз — прячем шапку, вверх — показываем.
        // Порог в 5px отсекает дрожание от микроскроллов.
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

        // Тень появляется после первых 100px прокрутки
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
// Оптимизация загрузки изображений
// ============================================================================

function initLazyLoading() {
  if (!("loading" in HTMLImageElement.prototype)) {
    // Fallback для браузеров без нативного loading="lazy"
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    document.body.appendChild(script);
  }
}

// ============================================================================
// Ротация слов в заголовке
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
// Появление секций при скролле
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
        // Сбрасываем состояние при выходе из вьюпорта,
        // чтобы анимация повторялась при каждом новом проходе.
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
// Инициализация
// ============================================================================

function init() {
  // Базовая функциональность
  initPromoFloat();
  initMobileNav();
  initSmoothAnchors();

  // Интерактивные секции
  initServices();
  initCalculator();
  initComparison();
  initFAQ();
  initContactForm();

  // Визуальные эффекты
  initStickyHeader();
  initRotatingText();
  initScrollFade();

  // Производительность
  initLazyLoading();
}

// Запуск после готовности DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
