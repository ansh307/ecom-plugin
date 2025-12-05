// apps/cdn/src/index.js

(function () {
  // Guard: avoid initializing twice if script is loaded multiple times
  if (window.__SIZEBOT_WIDGET_LOADED__) return;
  window.__SIZEBOT_WIDGET_LOADED__ = true;

  // 1. Identify the script tag that loaded this file
  const currentScript =
    document.currentScript ||
    Array.from(document.getElementsByTagName("script")).find(
      (s) => s.src && s.src.includes("plugin")
    );

  if (!currentScript) {
    console.warn("[SizeBot] Could not find script tag.");
    return;
  }

  // 2. Read config from attributes or URL query params
  const scriptSrc = currentScript.src || "";
  const url = new URL(scriptSrc, window.location.origin);

  const storeId = currentScript.getAttribute("data-store");

  const apiBase =
    currentScript.getAttribute("data-api-base") ||
    url.searchParams.get("apiBase") ||
    // fallback: same-origin /api
    window.location.origin + "/api";

  async function fetchStoreSettings() {
    try {
      const res = await fetch(
        apiBase.replace(/\/$/, "") + `/store?storeId=${storeId}`
      );

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("[SizeBot] Failed to load store settings:", err);
      return null;
    }
  }

  if (!storeId) {
    console.warn(
      "[SizeBot] storeId is missing. Please set data-store or ?storeId=..."
    );
    return;
  }

  // 3. Basic CSS constants (inline to avoid CSS collisions)
  const Z_INDEX = 999999;
  const WIDGET_ID_PREFIX = "sizebot-";

  // 4. Helper: create elements with styles
  function createElement(tag, styleObj, attrs = {}) {
    const el = document.createElement(tag);
    Object.assign(el.style, styleObj);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "text") el.textContent = v;
      else if (k === "html") el.innerHTML = v;
      else el.setAttribute(k, v);
    });
    return el;
  }

  // 5. Create floating button
  const button = createElement(
    "div",
    {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: "#000",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: Z_INDEX,
      boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
      fontSize: "24px",
      transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
    },
    {
      id: WIDGET_ID_PREFIX + "button",
      "aria-label": "Open size assistant",
      title: "Size assistant",
    }
  );

  button.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 12h8M9.5 15H14"></path>
    </svg>
  `;

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.05) translateY(-1px)";
    button.style.boxShadow = "0 10px 24px rgba(0,0,0,0.45)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1) translateY(0)";
    button.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
  });

  document.body.appendChild(button);

  // 6. Create modal container (hidden initially)
  const modal = createElement(
    "div",
    {
      position: "fixed",
      bottom: "96px",
      right: "24px",
      width: "360px",
      maxWidth: "90vw",
      height: "480px",
      maxHeight: "70vh",
      background: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
      display: "none",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: Z_INDEX,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, system-ui, -system-ui, "Segoe UI", sans-serif',
    },
    {
      id: WIDGET_ID_PREFIX + "modal",
      "aria-label": "Size assistant chat",
    }
  );

  // Header
  const header = createElement(
    "div",
    {
      padding: "12px 16px",
      background: "#f5f5f5",
      borderBottom: "1px solid #e5e5e5",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "14px",
      fontWeight: "600",
    },
    {}
  );
  const headerTitle = createElement(
    "div",
    {
      display: "flex",
      flexDirection: "column",
    },
    {}
  );

  const titleLine = createElement(
    "span",
    {
      fontSize: "14px",
      fontWeight: "600",
      color: "#111827",
    },
    { text: "Size Assistant" }
  );

  const subtitleLine = createElement(
    "span",
    {
      fontSize: "11px",
      color: "#6b7280",
      marginTop: "2px",
    },
    { text: "Tell me what fits you well." }
  );

  headerTitle.appendChild(titleLine);
  headerTitle.appendChild(subtitleLine);

  const closeBtn = createElement(
    "button",
    {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: "4px",
      marginLeft: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    { "aria-label": "Close size assistant" }
  );
  closeBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" stroke="#6b7280" stroke-width="2" fill="none">
      <path d="M18 6L6 18M6 6l12 12"></path>
    </svg>
  `;

  header.appendChild(headerTitle);
  header.appendChild(closeBtn);

  // 7. Chat area
  const chatContainer = createElement(
    "div",
    {
      flex: "1",
      padding: "12px 16px",
      overflowY: "auto",
      background: "#fafafa",
      fontSize: "13px",
    },
    { id: WIDGET_ID_PREFIX + "chat" }
  );

  // initial message
  function addBotMessage(text) {
    const msg = createElement(
      "div",
      {
        marginBottom: "10px",
        display: "flex",
      },
      {}
    );
    const bubble = createElement(
      "div",
      {
        background: "#111827",
        color: "#f9fafb",
        padding: "8px 10px",
        borderRadius: "10px",
        borderTopLeftRadius: "2px",
        maxWidth: "80%",
        whiteSpace: "pre-wrap",
      },
      { text }
    );
    msg.appendChild(bubble);
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function addUserMessage(text) {
    const msg = createElement(
      "div",
      {
        marginBottom: "10px",
        display: "flex",
        justifyContent: "flex-end",
      },
      {}
    );
    const bubble = createElement(
      "div",
      {
        background: "#e5e7eb",
        color: "#111827",
        padding: "8px 10px",
        borderRadius: "10px",
        borderTopRightRadius: "2px",
        maxWidth: "80%",
        whiteSpace: "pre-wrap",
      },
      { text }
    );
    msg.appendChild(bubble);
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function addTypingIndicator() {
    const id = WIDGET_ID_PREFIX + "typing";
    const existing = document.getElementById(id);
    if (existing) return existing;

    const wrapper = createElement(
      "div",
      {
        marginBottom: "10px",
        display: "flex",
      },
      { id }
    );
    const bubble = createElement(
      "div",
      {
        background: "#111827",
        color: "#f9fafb",
        padding: "8px 10px",
        borderRadius: "10px",
        borderTopLeftRadius: "2px",
        maxWidth: "60%",
        display: "flex",
        gap: "4px",
        alignItems: "center",
      },
      {}
    );
    for (let i = 0; i < 3; i++) {
      const dot = createElement(
        "div",
        {
          width: "4px",
          height: "4px",
          borderRadius: "999px",
          background: "#d1d5db",
          opacity: String(0.4 + i * 0.2),
        },
        {}
      );
      bubble.appendChild(dot);
    }
    wrapper.appendChild(bubble);
    chatContainer.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return wrapper;
  }

  function removeTypingIndicator() {
    const el = document.getElementById(WIDGET_ID_PREFIX + "typing");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  // 8. Input area
  const inputWrapper = createElement(
    "div",
    {
      padding: "10px 12px",
      borderTop: "1px solid #e5e7eb",
      background: "#ffffff",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    {}
  );

  const input = createElement(
    "input",
    {
      flex: "1",
      padding: "8px 10px",
      borderRadius: "999px",
      border: "1px solid #d1d5db",
      fontSize: "13px",
      outline: "none",
    },
    {
      type: "text",
      placeholder: "e.g. Nike size 9 fits me well",
    }
  );

  input.addEventListener("focus", () => {
    input.style.borderColor = "#111827";
  });
  input.addEventListener("blur", () => {
    input.style.borderColor = "#d1d5db";
  });

  const sendBtn = createElement(
    "button",
    {
      borderRadius: "999px",
      border: "none",
      background: "#111827",
      color: "#f9fafb",
      padding: "8px 10px",
      fontSize: "12px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "42px",
    },
    { text: "Send" }
  );

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(sendBtn);

  // 9. Assemble modal and attach to DOM
  modal.appendChild(header);
  modal.appendChild(chatContainer);
  modal.appendChild(inputWrapper);
  document.body.appendChild(modal);

  button.style.display = "none";

  (async function init() {
    const settings = await fetchStoreSettings();

    if (!settings || settings.enabled === false) {
      console.warn("[SizeBot] Widget disabled for store:", storeId);
      return;
    }

    // APPLY THEME COLOR
    const theme = settings.themeColor || "#111827";
    button.style.background = theme;
    button.style.display = "flex";

    // APPLY TITLE / SUBTITLE
    titleLine.textContent = settings.title || "Size Assistant";
    subtitleLine.textContent =
      settings.subtitle || "Tell me what fits you well.";

    // default brand (optional future feature)
    window.__SIZEBOT_DEFAULT_BRAND__ = settings.defaultBrand || null;

    // Show widget after settings load
    button.style.display = "flex";
  })();

  // Greeting
  addBotMessage(
    "Hi! Tell me which brand and size fits you well.\nFor example: “Nike size 9 fits me well”."
  );

  // 10. Toggle modal visibility
  function toggleModal() {
    const isOpen = modal.style.display === "flex";
    modal.style.display = isOpen ? "none" : "flex";
    if (!isOpen) {
      setTimeout(() => input.focus(), 50);
    }
  }

  button.addEventListener("click", toggleModal);
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 11. Send message handler
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    addUserMessage(text);
    const typingEl = addTypingIndicator();

    try {
      const res = await fetch(apiBase.replace(/\/$/, "") + "/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ storeId, message: text }),
      });

      const data = await res.json();
      removeTypingIndicator();

      if (!res.ok || !data || !data.reply) {
        addBotMessage("Sorry, I couldn't process that. Please try again.");
        return;
      }

      addBotMessage(data.reply);
    } catch (err) {
      console.error("[SizeBot] Chat error:", err);
      removeTypingIndicator();
      addBotMessage(
        "Something went wrong talking to the size assistant. Please try again in a moment."
      );
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  sendBtn.addEventListener("click", () => {
    sendMessage();
  });

  // 12. Optional: fetch store settings (colors, text, etc.) later
  // You can extend this part to call `${apiBase}/store?storeId=${storeId}`
  // and adjust title, subtitle, colors based on response.
})();
