(() => {
  "use strict";

  const menu = window.TOKYSEN_MENU;
  const config = Object.assign({
    address: "[ADRESSE]",
    phone: "[TELEFON]",
    openingHours: "[ÖFFNUNGSZEITEN]",
    mapsUrl: "#",
    reservationUrl: "#",
    whatsappNumber: "",
    pickupMinutes: 25,
    deliveryMinutes: 45,
    deliveryFee: 3.9,
    minimumDelivery: 20,
    freeDeliveryFrom: 45
  }, window.TOKYSEN_CONFIG || {});

  const STORAGE_KEY = "tokysen-figma-cart";
  const state = {
    topSections: [],
    items: [],
    itemMap: new Map(),
    activeSection: "all",
    search: "",
    cart: [],
    selectedItem: null,
    service: "pickup"
  };
  const SECTION_META = {
    "vorspeisen": {
      index: "01",
      eyebrow: "Der erste Eindruck",
      description: "Suppen, Salate und kleine Gerichte zum Ankommen."
    },
    "hauptgerichte": {
      index: "02",
      eyebrow: "Aus Wok & Küche",
      description: "Nudeln, Reis und kräftige Hauptgerichte, frisch zubereitet."
    },
    "sushi": {
      index: "03",
      eyebrow: "20+ Jahre Handwerk",
      description: "Nigiri, Maki, Inside-Out, Spezial Rolls, Sashimi und Sets."
    },
    "beilagen": {
      index: "04",
      eyebrow: "Dazu bestellt",
      description: "Kleine Ergänzungen, Saucen und Extras für dein Gericht."
    },
    "desserts": {
      index: "05",
      eyebrow: "Zum Abschluss",
      description: "Süße Kleinigkeiten und ein frischer letzter Eindruck."
    },
    "alkoholfreie-getraenke": {
      index: "06",
      eyebrow: "Frisch eingeschenkt",
      description: "Softdrinks, Säfte, Tee, Kaffee, Lassi und Hausgemachtes."
    },
    "alkoholische-getraenke": {
      index: "07",
      eyebrow: "Für den Abend",
      description: "Cocktails, Bier, Aperitifs und ausgewählte Weine."
    }
  };

  const $ = id => document.getElementById(id);
  const el = {};

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function slug(value) {
    return String(value ?? "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function number(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value !== "string") return null;
    const parsed = Number.parseFloat(value.replace(/[^\d,.-]/g, "").replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function euro(value) {
    const amount = number(value);
    return amount === null ? String(value ?? "") :
      new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);
  }

  function normalizeMenu() {
    let itemCount = 0;
    state.topSections = (menu.sections || []).map((section, sectionIndex) => {
      const sectionId = slug(section.id || section.title || `section-${sectionIndex}`);
      const categories = (section.categories || []).map((category, categoryIndex) => {
        const categoryId = slug(category.id || category.title || `category-${categoryIndex}`);
        const items = (category.items || []).map((item, itemIndex) => {
          const id = `${sectionId}-${categoryId}-${item.id || item.code || itemIndex}`;
          const options = Array.isArray(item.options) ? item.options.map((option, optionIndex) => ({
            id: String(option.code || option.id || optionIndex),
            label: option.name || option.volume || option.size || `Option ${optionIndex + 1}`,
            price: number(option.price) || 0
          })) : [];
          const normalized = {
            id,
            sectionId,
            sectionTitle: section.title || "",
            categoryId,
            categoryTitle: category.title || "",
            categoryDescription: category.description || "",
            code: item.code || "",
            name: item.name || "Gericht",
            description: item.description || "",
            portion: item.portion || category.portion || "",
            note: item.note || "",
            allergens: Array.isArray(item.allergens) ? item.allergens : [],
            price: number(item.price),
            options,
            searchText: [
              item.code, item.name, item.description, item.portion,
              category.title, section.title,
              ...(item.allergens || []),
              ...options.map(option => option.label)
            ].filter(Boolean).join(" ").toLocaleLowerCase("de-DE")
          };
          state.items.push(normalized);
          state.itemMap.set(id, normalized);
          itemCount += 1;
          return normalized;
        });
        return { id: categoryId, title: category.title || "", items };
      });
      return {
        id: sectionId,
        title: section.title || "",
        count: categories.reduce((sum, category) => sum + category.items.length, 0),
        categories
      };
    });
    $("heroDishCount").textContent = String(itemCount);
  }

  function categoryImage(sectionId, index) {
    const map = {
      "vorspeisen": "fruit-platter.webp",
      "hauptgerichte": "exterior-front.webp",
      "sushi": "fruit-art.webp",
      "beilagen": "fruit-mosaic.webp",
      "desserts": "fruit-platter.webp",
      "alkoholfreie-getraenke": "juice-line.webp",
      "alkoholische-getraenke": "orange-press.webp"
    };
    return map[sectionId] || ["fruit-cups.webp", "juice-line.webp", "fruit-art.webp"][index % 3];
  }

  function renderCategories() {
    el.categoryCarousel.innerHTML = state.topSections.map((section, index) => `
      <article class="category-card" data-category-card="${esc(section.id)}">
        <img src="./assets/${categoryImage(section.id, index)}" alt="${esc(section.title)}">
        <div class="category-card-body">
          <h3>${esc(section.title)}</h3>
          <p>${section.count} Produkte</p>
        </div>
      </article>
    `).join("");
  }

  function sectionMeta(sectionId) {
    return SECTION_META[sectionId] || {
      index: "—",
      eyebrow: "Tokysen Speisekarte",
      description: "Frisch zubereitet und direkt bestellbar."
    };
  }

  function renderTabs() {
    const tabs = [
      { id: "all", title: "Gesamte Karte", count: state.items.length, index: "00" },
      ...state.topSections.map(section => ({
        id: section.id,
        title: section.title,
        count: section.count,
        index: sectionMeta(section.id).index
      }))
    ];

    el.menuTabs.innerHTML = tabs.map(tab => `
      <button class="${state.activeSection === tab.id ? "active" : ""}"
        type="button" data-menu-tab="${esc(tab.id)}" aria-pressed="${state.activeSection === tab.id}">
        ${esc(tab.title)} <small>${tab.count}</small>
      </button>
    `).join("");

    el.menuSidebarTabs.innerHTML = tabs.map(tab => `
      <button class="${state.activeSection === tab.id ? "active" : ""}"
        type="button" data-menu-tab="${esc(tab.id)}" aria-pressed="${state.activeSection === tab.id}">
        <span class="sidebar-tab-index">${esc(tab.index)}</span>
        <span class="sidebar-tab-title">${esc(tab.title)}</span>
        <small>${tab.count}</small>
      </button>
    `).join("");
  }

  function filteredSections() {
    const term = state.search.trim().toLocaleLowerCase("de-DE");
    return state.topSections
      .filter(section => state.activeSection === "all" || section.id === state.activeSection)
      .map(section => ({
        ...section,
        categories: section.categories
          .map(category => ({
            ...category,
            items: category.items.filter(item => !term || item.searchText.includes(term))
          }))
          .filter(category => category.items.length)
      }))
      .filter(section => section.categories.length);
  }

  function startingPrice(item) {
    if (item.options.length) {
      const prices = item.options.map(option => option.price).filter(Number.isFinite);
      return prices.length ? `ab ${euro(Math.min(...prices))}` : "";
    }
    return item.price !== null ? euro(item.price) : "";
  }

  function itemBadge(item) {
    const haystack = `${item.name} ${item.description} ${item.note}`.toLocaleLowerCase("de-DE");
    if (haystack.includes("tokysen")) return "TOKYSEN EMPFIEHLT";
    if (haystack.includes("vegan")) return "VEGAN";
    if (haystack.includes("vegetar")) return "VEGETARISCH";
    if (haystack.includes("scharf") || haystack.includes("chili")) return "SCHARF";
    return "";
  }

  function renderMenuItem(item) {
    const badge = itemBadge(item);
    const optionLabel = item.options.length
      ? `${item.options.length} ${item.options.length === 1 ? "Variante" : "Varianten"}`
      : "";
    const description = item.description || item.categoryDescription || "";
    const meta = [
      item.portion,
      optionLabel,
      item.allergens.length ? `Allergene ${item.allergens.join(", ")}` : ""
    ].filter(Boolean);

    return `
      <article class="menu-line-item">
        <div class="menu-line-code">${esc(item.code || "—")}</div>
        <div class="menu-line-copy">
          <div class="menu-line-heading">
            <h5>${esc(item.name)}</h5>
            ${badge ? `<span class="menu-badge">${esc(badge)}</span>` : ""}
          </div>
          ${description ? `<p>${esc(description)}</p>` : ""}
          ${meta.length ? `<div class="menu-line-meta">${meta.map(value => `<span>${esc(value)}</span>`).join("")}</div>` : ""}
        </div>
        <div class="menu-line-action">
          <strong>${esc(startingPrice(item))}</strong>
          <button class="menu-add-button" type="button" data-add-item="${esc(item.id)}"
            aria-label="${esc(item.name)} auswählen">
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </article>
    `;
  }

  function renderCategory(category, categoryIndex) {
    return `
      <section class="menu-category" id="menu-category-${esc(category.id)}">
        <header class="menu-category-head">
          <span>${String(categoryIndex + 1).padStart(2, "0")}</span>
          <div>
            <h4>${esc(category.title)}</h4>
            <p>${category.items.length} ${category.items.length === 1 ? "Position" : "Positionen"}</p>
          </div>
        </header>
        <div class="menu-item-grid">
          ${category.items.map(renderMenuItem).join("")}
        </div>
      </section>
    `;
  }

  function renderMenuSection(section) {
    const meta = sectionMeta(section.id);
    const itemCount = section.categories.reduce((sum, category) => sum + category.items.length, 0);
    return `
      <section class="menu-section-block" data-menu-section="${esc(section.id)}">
        <header class="menu-section-cover">
          <span class="menu-section-index">${esc(meta.index)}</span>
          <div class="menu-section-cover-copy">
            <p>${esc(meta.eyebrow)}</p>
            <h3>${esc(section.title)}</h3>
            <span>${esc(meta.description)}</span>
          </div>
          <div class="menu-section-count">
            <strong>${itemCount}</strong>
            <span>${itemCount === 1 ? "Position" : "Positionen"}</span>
          </div>
        </header>
        <div class="menu-category-stack">
          ${section.categories.map(renderCategory).join("")}
        </div>
      </section>
    `;
  }

  function renderMenu() {
    const sections = filteredSections();
    const matchCount = sections.reduce(
      (sum, section) => sum + section.categories.reduce(
        (categorySum, category) => categorySum + category.items.length,
        0
      ),
      0
    );

    el.menuGrid.innerHTML = sections.length
      ? sections.map(renderMenuSection).join("")
      : `
        <div class="menu-empty-state">
          <span>⌕</span>
          <h3>Kein Gericht gefunden</h3>
          <p>Versuche einen anderen Suchbegriff oder öffne die gesamte Karte.</p>
          <button class="primary-button" type="button" data-reset-menu>Suche zurücksetzen</button>
        </div>
      `;

    const activeTitle = state.activeSection === "all"
      ? "Gesamte Karte"
      : state.topSections.find(section => section.id === state.activeSection)?.title || "Speisekarte";
    el.menuResultCount.textContent = `${activeTitle} · ${matchCount} ${matchCount === 1 ? "Position" : "Positionen"}`;
  }

  function selectSection(id, scroll = false) {
    state.activeSection = id;
    renderTabs();
    renderMenu();
    if (scroll) $("menu").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderRestaurantData() {
    const intro = menu.restaurant?.introduction || [];
    $("restaurantIntroduction").innerHTML = intro.map(text => `<p>${esc(text)}</p>`).join("");
    $("addressText").textContent = config.address;
    $("phoneText").textContent = config.phone;
    $("hoursText").textContent = config.openingHours;
    $("mapsLink").href = config.mapsUrl || "#";
    $("reservationLink").href = config.reservationUrl || "#";
    $("footerMessage").textContent = menu.footer || "";
    $("allergenNotice").textContent = menu.allergen_notice || "";
    $("allergenGrid").innerHTML = Object.entries(menu.additives_and_allergens || {}).map(([code, label]) =>
      `<div><strong>${esc(code)}</strong> · ${esc(label)}</div>`
    ).join("");
  }

  function selectedOption() {
    if (!state.selectedItem?.options.length) return null;
    const selectedId = el.itemForm.querySelector('input[name="dishOption"]:checked')?.value;
    return state.selectedItem.options.find(option => option.id === selectedId) || state.selectedItem.options[0];
  }

  function unitPrice(item, option = null) {
    return option ? option.price : (item.price || 0);
  }

  function updateModalTotal() {
    const item = state.selectedItem;
    if (!item) return;
    const qty = Math.max(1, Number($("modalQuantity").value || 1));
    $("modalTotal").textContent = euro(unitPrice(item, selectedOption()) * qty);
  }

  function openItem(itemId) {
    const item = state.itemMap.get(itemId);
    if (!item) return;
    state.selectedItem = item;
    $("modalCode").textContent = item.code ? `NR. ${item.code} · ${item.categoryTitle}` : item.categoryTitle;
    $("modalName").textContent = item.name;
    $("modalDescription").textContent = item.description || item.categoryDescription || "";
    $("modalMeta").textContent = [
      item.portion,
      item.note,
      item.allergens.length ? `Allergene: ${item.allergens.join(", ")}` : ""
    ].filter(Boolean).join(" · ");
    $("modalQuantity").value = "1";
    $("modalNote").value = "";
    $("modalOptions").innerHTML = item.options.length ? `
      <div class="option-list">
        ${item.options.map((option, index) => `
          <label class="option-choice">
            <input type="radio" name="dishOption" value="${esc(option.id)}" ${index === 0 ? "checked" : ""}>
            <span>${esc(option.label)}</span>
            <strong>${euro(option.price)}</strong>
          </label>
        `).join("")}
      </div>
    ` : "";
    updateModalTotal();
    openLayer("item");
  }

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      state.cart = Array.isArray(saved) ? saved : [];
    } catch {
      state.cart = [];
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
  }

  function addSelectedItem() {
    const item = state.selectedItem;
    if (!item) return;
    const option = selectedOption();
    const quantity = Math.max(1, Number($("modalQuantity").value || 1));
    const note = $("modalNote").value.trim();
    const key = `${item.id}|${option?.id || "base"}|${note}`;
    const existing = state.cart.find(entry => entry.key === key);
    if (existing) existing.quantity += quantity;
    else state.cart.push({
      key,
      itemId: item.id,
      name: item.name,
      code: item.code,
      option: option ? { id: option.id, label: option.label } : null,
      unitPrice: unitPrice(item, option),
      quantity,
      note
    });
    saveCart();
    renderCart();
    closeLayer("item");
    toast(`${item.name} wurde hinzugefügt`);
  }

  function cartQty() {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  function subtotal() {
    return state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }
  function deliveryFee() {
    if (state.service !== "delivery") return 0;
    return subtotal() >= config.freeDeliveryFrom ? 0 : Number(config.deliveryFee || 0);
  }
  function total() { return subtotal() + deliveryFee(); }

  function renderCart() {
    const qty = cartQty();
    document.querySelectorAll("[data-cart-count]").forEach(node => node.textContent = qty);
    document.querySelectorAll("[data-cart-total]").forEach(node => node.textContent = euro(total()));
    document.querySelectorAll("[data-cart-label]").forEach(node => node.textContent = qty === 1 ? "1 Artikel" : `${qty} Artikel`);
    el.floatingCart.classList.toggle("visible", qty > 0);

    if (!state.cart.length) {
      el.cartBody.innerHTML = `
        <div class="empty-cart">
          <h3>Noch nichts ausgewählt</h3>
          <p>Öffne die Speisekarte und füge deine Lieblingsgerichte hinzu.</p>
          <button class="primary-button" type="button" data-go-menu>Zur Speisekarte</button>
        </div>`;
      renderCheckout();
      return;
    }

    const shortfall = Math.max(0, Number(config.minimumDelivery || 0) - subtotal());
    el.cartBody.innerHTML = `
      ${state.cart.map((entry, index) => `
        <article class="cart-item">
          <div>
            <h3>${esc(entry.name)}</h3>
            ${entry.option ? `<p>${esc(entry.option.label)}</p>` : ""}
            ${entry.note ? `<p>Hinweis: ${esc(entry.note)}</p>` : ""}
          </div>
          <strong class="cart-item-price">${euro(entry.unitPrice * entry.quantity)}</strong>
          <div class="cart-controls">
            <div class="qty">
              <button type="button" data-cart-index="${index}" data-delta="-1">−</button>
              <span>${entry.quantity}</span>
              <button type="button" data-cart-index="${index}" data-delta="1">+</button>
            </div>
            <button class="remove" type="button" data-remove-index="${index}">Entfernen</button>
          </div>
        </article>
      `).join("")}

      <div class="service-tabs">
        <button class="${state.service === "pickup" ? "active" : ""}" type="button" data-service="pickup">
          Abholung · ${esc(config.pickupMinutes)} Min.
        </button>
        <button class="${state.service === "delivery" ? "active" : ""}" type="button" data-service="delivery">
          Lieferung · ${esc(config.deliveryMinutes)} Min.
        </button>
      </div>

      <div class="cart-totals">
        <div class="total-line"><span>Zwischensumme</span><strong>${euro(subtotal())}</strong></div>
        ${state.service === "delivery" ? `<div class="total-line"><span>Liefergebühr</span><strong>${deliveryFee() ? euro(deliveryFee()) : "Kostenlos"}</strong></div>` : ""}
        <div class="total-line final"><span>Gesamt</span><strong>${euro(total())}</strong></div>
      </div>

      ${state.service === "delivery" && shortfall > 0 ? `<p class="minimum-warning">Noch ${euro(shortfall)} bis zum Mindestbestellwert für Lieferung.</p>` : ""}

      <div class="cart-actions">
        <button class="primary-button primary-button--red" type="button" data-open-checkout
          ${state.service === "delivery" && shortfall > 0 ? "disabled" : ""}>Weiter zur Bestellung</button>
        <button class="secondary-button" type="button" data-go-menu>Weitere Gerichte</button>
      </div>
    `;
    renderCheckout();
  }

  function updateCart(index, delta) {
    const entry = state.cart[index];
    if (!entry) return;
    entry.quantity += delta;
    if (entry.quantity <= 0) state.cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function setService(service) {
    state.service = service;
    $("deliveryAddressField").hidden = service !== "delivery";
    $("deliveryAddress").required = service === "delivery";
    document.querySelectorAll("[data-service]").forEach(button => button.classList.toggle("active", button.dataset.service === service));
    renderCart();
  }

  function renderCheckout() {
    $("checkoutItems").innerHTML = state.cart.map(entry => `
      <div class="checkout-row">
        <span>${entry.quantity} × ${esc(entry.name)}${entry.option ? `<small style="display:block;color:#777">${esc(entry.option.label)}</small>` : ""}</span>
        <strong>${euro(entry.quantity * entry.unitPrice)}</strong>
      </div>
    `).join("") || "<p>Keine Artikel.</p>";
    $("checkoutTotals").innerHTML = `
      <div class="total-line"><span>Zwischensumme</span><strong>${euro(subtotal())}</strong></div>
      ${state.service === "delivery" ? `<div class="total-line"><span>Liefergebühr</span><strong>${deliveryFee() ? euro(deliveryFee()) : "Kostenlos"}</strong></div>` : ""}
      <div class="total-line final"><span>Gesamt</span><strong>${euro(total())}</strong></div>
    `;
  }

  function openLayer(type) {
    el.overlay.classList.add("open");
    document.body.classList.add("locked");
    if (type === "item") {
      el.itemModal.classList.add("open");
      el.itemModal.setAttribute("aria-hidden", "false");
    }
    if (type === "cart") {
      el.cartDrawer.classList.add("open");
      el.cartDrawer.setAttribute("aria-hidden", "false");
    }
  }

  function closeLayer(type = "all") {
    if (type === "all" || type === "item") {
      el.itemModal.classList.remove("open");
      el.itemModal.setAttribute("aria-hidden", "true");
    }
    if (type === "all" || type === "cart") {
      el.cartDrawer.classList.remove("open");
      el.cartDrawer.setAttribute("aria-hidden", "true");
    }
    if (!el.itemModal.classList.contains("open") && !el.cartDrawer.classList.contains("open")) {
      el.overlay.classList.remove("open");
      document.body.classList.remove("locked");
    }
  }

  function openCheckout() {
    if (!state.cart.length) return;
    closeLayer();
    el.checkout.classList.add("open");
    el.checkout.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    renderCheckout();
  }

  function closeCheckout() {
    el.checkout.classList.remove("open");
    el.checkout.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
  }

  function orderMessage(data, ref) {
    return [
      `TOKYSEN BESTELLUNG ${ref}`,
      "",
      `Service: ${state.service === "delivery" ? "Lieferung" : "Abholung"}`,
      `Name: ${data.name}`,
      `Telefon: ${data.phone}`,
      data.email ? `E-Mail: ${data.email}` : "",
      state.service === "delivery" ? `Adresse: ${data.address}` : "",
      `Zeit: ${data.time}`,
      `Zahlung: ${data.payment}`,
      "",
      "ARTIKEL:",
      ...state.cart.flatMap(entry => [
        `${entry.quantity}x ${entry.name}${entry.option ? ` — ${entry.option.label}` : ""} (${euro(entry.quantity * entry.unitPrice)})`,
        entry.note ? `  Küchenhinweis: ${entry.note}` : ""
      ]),
      "",
      data.note ? `Bestellhinweis: ${data.note}` : "",
      `Zwischensumme: ${euro(subtotal())}`,
      state.service === "delivery" ? `Liefergebühr: ${euro(deliveryFee())}` : "",
      `GESAMT: ${euro(total())}`
    ].filter(Boolean).join("\n");
  }

  function downloadOrder(ref, message) {
    const blob = new Blob([message], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${ref}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function submitOrder(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const date = new Date();
    const ref = `TKY-${date.getFullYear()}${String(date.getMonth()+1).padStart(2,"0")}${String(date.getDate()).padStart(2,"0")}-${String(date.getHours()).padStart(2,"0")}${String(date.getMinutes()).padStart(2,"0")}`;
    const message = orderMessage(data, ref);
    const numberValue = String(config.whatsappNumber || "").replace(/\D/g, "");

    if (numberValue) {
      window.open(`https://wa.me/${numberValue}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    } else {
      downloadOrder(ref, message);
    }

    $("checkoutResult").hidden = false;
    $("checkoutResult").innerHTML = `
      <h3>Bestellung vorbereitet</h3>
      <p>${numberValue
        ? "WhatsApp wurde geöffnet. Bitte sende die vorbereitete Nachricht ab."
        : "Noch keine WhatsApp-Nummer konfiguriert. Die Bestellung wurde als Textdatei heruntergeladen."}</p>
      <code>${esc(ref)}</code>
    `;
    $("checkoutResult").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function toast(message) {
    el.toast.textContent = message;
    el.toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.toast.classList.remove("show"), 2200);
  }

  function bindEvents() {
    window.addEventListener("scroll", () => el.siteHeader.classList.toggle("scrolled", scrollY > 20), { passive: true });

    el.menuToggle.addEventListener("click", () => {
      const open = !el.mobileMenu.classList.contains("open");
      el.mobileMenu.classList.toggle("open", open);
      el.mobileMenu.setAttribute("aria-hidden", String(!open));
      el.menuToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("locked", open);
    });
    el.mobileMenu.addEventListener("click", event => {
      if (event.target.closest("a")) {
        el.mobileMenu.classList.remove("open");
        el.mobileMenu.setAttribute("aria-hidden", "true");
        el.menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("locked");
      }
    });

    document.addEventListener("click", event => {
      const card = event.target.closest("[data-category-card]");
      if (card) selectSection(card.dataset.categoryCard, true);

      const tab = event.target.closest("[data-menu-tab]");
      if (tab) selectSection(tab.dataset.menuTab);

      const add = event.target.closest("[data-add-item]");
      if (add) openItem(add.dataset.addItem);

      if (event.target.closest("[data-reset-menu]")) {
        state.search = "";
        state.activeSection = "all";
        el.menuSearch.value = "";
        el.clearSearch.hidden = true;
        renderTabs();
        renderMenu();
      }

      if (event.target.closest("[data-open-allergens]")) {
        $("allergenDialog").showModal();
      }

      if (event.target.closest("[data-open-cart]")) openLayer("cart");
      if (event.target.closest("[data-close-cart]")) closeLayer("cart");
      if (event.target.closest("[data-close-item]")) closeLayer("item");
      if (event.target.closest("[data-open-checkout]")) openCheckout();
      if (event.target.closest("[data-close-checkout]")) closeCheckout();

      const cartChange = event.target.closest("[data-cart-index]");
      if (cartChange) updateCart(Number(cartChange.dataset.cartIndex), Number(cartChange.dataset.delta));
      const remove = event.target.closest("[data-remove-index]");
      if (remove) {
        state.cart.splice(Number(remove.dataset.removeIndex), 1);
        saveCart();
        renderCart();
      }
      const service = event.target.closest("[data-service]");
      if (service) setService(service.dataset.service);
      if (event.target.closest("[data-go-menu]")) {
        closeLayer();
        $("menu").scrollIntoView({ behavior: "smooth" });
      }

      const preset = event.target.closest("[data-preset-search]");
      if (preset) {
        state.activeSection = "all";
        state.search = preset.dataset.presetSearch;
        el.menuSearch.value = state.search;
        el.clearSearch.hidden = false;
        renderTabs(); renderMenu();
      }

      const openSection = event.target.closest("[data-open-section]");
      if (openSection) selectSection(openSection.dataset.openSection);

      if (event.target.closest('a[href="#allergenDialog"]')) {
        event.preventDefault();
        $("allergenDialog").showModal();
      }
    });

    el.overlay.addEventListener("click", () => closeLayer());
    el.itemForm.addEventListener("change", updateModalTotal);
    el.itemForm.addEventListener("submit", event => {
      event.preventDefault();
      addSelectedItem();
    });

    el.menuSearch.addEventListener("input", () => {
      state.search = el.menuSearch.value;
      el.clearSearch.hidden = !state.search;
      renderMenu();
    });
    el.clearSearch.addEventListener("click", () => {
      state.search = "";
      el.menuSearch.value = "";
      el.clearSearch.hidden = true;
      renderMenu();
      el.menuSearch.focus();
    });

    document.querySelector("[data-category-prev]")?.addEventListener("click", () => el.categoryCarousel.scrollBy({ left: -310, behavior: "smooth" }));
    document.querySelector("[data-category-next]")?.addEventListener("click", () => el.categoryCarousel.scrollBy({ left: 310, behavior: "smooth" }));

    document.querySelectorAll("[data-combo-image]").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-combo-image]").forEach(other => other.classList.toggle("active", other === button));
        $("comboImage").style.opacity = ".25";
        setTimeout(() => {
          $("comboImage").src = `./assets/${button.dataset.comboImage}`;
          $("comboImage").style.opacity = "1";
        }, 180);
      });
    });

    el.checkoutForm.addEventListener("submit", submitOrder);
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (el.checkout.classList.contains("open")) closeCheckout();
      else closeLayer();
    });
  }

  function cache() {
    [
      "siteHeader","menuToggle","mobileMenu","categoryCarousel","menuTabs","menuSidebarTabs",
      "menuSearch","clearSearch","menuGrid","menuResultCount",
      "floatingCart","overlay","itemModal","itemForm","cartDrawer","cartBody",
      "checkout","checkoutForm","toast"
    ].forEach(id => el[id] = $(id));
  }

  function init() {
    cache();
    normalizeMenu();
    loadCart();
    renderRestaurantData();
    renderCategories();
    renderTabs();
    renderMenu();
    renderCart();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init, { once: true });
})();
