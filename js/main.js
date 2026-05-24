const packages = {
  landing: {
    eyebrow: "Paquete 01",
    title: "Landing Express",
    description: "Presencia profesional. Pedidos por WhatsApp.",
    price: "3,800",
    meta: "MXN · Entrega 24–72 hrs",
    footer: "Ideal para negocios que necesitan verse profesionales rápido.",
    features: [
      "Landing page profesional",
      "Diseño adaptable a celular",
      "Botón directo a WhatsApp",
      "Google Maps integrado",
      "SEO básico local",
      "Analytics y seguimiento",
      "Dominio incluido 1 año",
      "Hosting hasta 4 años",
    ],
  },
  pro: {
    eyebrow: "Paquete 02 · Más popular",
    title: "Web Negocio Pro",
    description: "Autoridad digital. Agenda y formularios avanzados.",
    price: "5,900",
    meta: "MXN · 3–5 días hábiles",
    footer:
      "Ideal para negocios que quieren una presencia digital más completa.",
    features: [
      "Todo del plan Landing Express",
      "Hasta 5 secciones / páginas",
      "Diseño más personalizado",
      "Agenda Google Calendar / Notion",
      "Formularios avanzados",
      "Integración redes sociales",
      "Optimización SEO inicial",
      "Soporte inicial extendido",
    ],
  },
  mini: {
    eyebrow: "Paquete 03",
    title: "Mini Tienda Digital",
    description: "Catálogo completo. Clientes comprando desde el día 1.",
    price: "7,500",
    meta: "MXN · 5–7 días hábiles",
    footer:
      "Ideal para negocios que venden productos y quieren mostrar catálogo.",
    features: [
      "Todo del plan Web Negocio Pro",
      "Catálogo digital completo",
      "Productos con fotos y precios",
      "Botón WhatsApp por producto",
      "Categorías organizadas",
      "Solicitud de cotización",
      "SEO catálogo optimizado",
      "Capacitación rápida incluida",
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll();
  setupServicesCarousel();
  setupPackageButtons();
});

function setupSmoothScroll() {
  const header = document.querySelector(".site-header");

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

function setupServicesCarousel() {
  const strip = document.querySelector(".services-strip, .services-strips");
  if (!strip) return;

  const items = Array.from(strip.querySelectorAll("span"));
  if (!items.length) return;

  const track = document.createElement("div");
  track.className = "services-track";

  items.forEach((item) => track.appendChild(item));
  items.forEach((item) => track.appendChild(item.cloneNode(true)));

  strip.appendChild(track);
}

function setupPackageButtons() {
  const buttons = document.querySelectorAll(".package-switcher button");
  const summaryCards = document.querySelectorAll(".package-summary-card");
  const order = ["landing", "pro", "mini"];

  buttons.forEach((button, index) => {
    button.dataset.package = order[index];

    button.addEventListener("click", () => {
      renderPackage(button.dataset.package);
      setActiveButton(button);
    });
  });

  summaryCards.forEach((card, index) => {
    card.dataset.package = order[index];

    card.addEventListener("click", () => {
      renderPackage(card.dataset.package);
      setActiveButton(buttons[index]);
    });
  });
}

function setActiveButton(activeButton) {
  document
    .querySelectorAll(".package-switcher button")
    .forEach((button) => button.classList.remove("is-active"));

  activeButton.classList.add("is-active");
}

function renderPackage(packageKey) {
  const data = packages[packageKey];
  const card = document.querySelector(".package-detail-card");
  if (!data || !card) return;

  card.querySelector(".package-detail-header").innerHTML = `
    <div>
      <p class="section-eyebrow">${data.eyebrow}</p>
      <h3>${data.title}</h3>
      <p>${data.description}</p>
    </div>

    <div class="package-price">
      <span>$</span>
      <strong>${data.price}</strong>
      <p>${data.meta}</p>
    </div>
  `;

  card.querySelector(".features-list").innerHTML = data.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  card.querySelector(".package-footer p").textContent = data.footer;
}
