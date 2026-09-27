document.documentElement.classList.add("has-js");

document.querySelectorAll(".site-navigation").forEach((navigation) => {
  const menuToggle = navigation.querySelector(".menu-toggle");
  const primaryMenu = navigation.querySelector(".primary-menu");
  const mobileViewport = window.matchMedia("(max-width: 48rem)");

  if (!menuToggle || !primaryMenu) {
    return;
  }

  function setMenuOpen(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

    if (!isOpen) {
      navigation.querySelectorAll(".nav-dropdown[open]").forEach((dropdown) => {
        dropdown.open = false;
      });
    }
  }

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  primaryMenu.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileViewport.matches) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    const openDropdown = navigation.querySelector(".nav-dropdown[open]");
    if (openDropdown) {
      openDropdown.open = false;
      openDropdown.querySelector("summary").focus();
      return;
    }

    if (menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  mobileViewport.addEventListener("change", (event) => {
    if (!event.matches) {
      setMenuOpen(false);
    }
  });
});
