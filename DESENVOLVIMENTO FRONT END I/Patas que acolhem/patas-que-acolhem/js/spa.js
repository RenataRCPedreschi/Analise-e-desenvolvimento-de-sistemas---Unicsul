(() => {
  const appDirectory = new URL(".", window.location.href);
  let currentPath = window.location.pathname;
  let currentUrl = new URL(window.location.href);

  function notifyRouteError() {
    window.showToast?.("Não foi possível carregar esta página. Verifique a conexão e tente novamente.", "error");
  }

  function isApplicationPage(url) {
    return /^https?:$/.test(url.protocol)
      && url.origin === window.location.origin
      && url.pathname.startsWith(appDirectory.pathname)
      && url.pathname.endsWith(".html");
  }

  function updateCurrentPage(url) {
    const links = [...document.querySelectorAll(".primary-menu > li > a")];
    links.forEach((link) => link.removeAttribute("aria-current"));

    const activeLink = links.find((link) => new URL(link.href, window.location.href).pathname === url.pathname);
    activeLink?.setAttribute("aria-current", "page");
  }

  function closeNavigation() {
    const navigation = document.querySelector(".site-navigation");
    const menuToggle = navigation?.querySelector(".menu-toggle");
    navigation?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
    navigation?.querySelectorAll(".nav-dropdown[open]").forEach((dropdown) => {
      dropdown.open = false;
    });
  }

  function scrollToRoutePosition(url) {
    if (url.hash) {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      target?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }

  async function renderRoute(url, addHistoryEntry = true) {
    try {
      const response = await fetch(url.href, { headers: { Accept: "text/html" } });
      if (!response.ok) {
        return false;
      }

      const source = await response.text();
      const nextDocument = new DOMParser().parseFromString(source, "text/html");
      const nextMain = nextDocument.querySelector("main");
      const currentMain = document.querySelector("main");
      if (!nextMain || !currentMain) {
        return false;
      }

      currentMain.replaceWith(document.importNode(nextMain, true));
      document.querySelectorAll("[data-spa-extra]").forEach((element) => element.remove());
      nextDocument.querySelectorAll("[data-spa-extra]").forEach((element) => {
        document.body.insertBefore(document.importNode(element, true), document.querySelector("footer"));
      });

      document.title = nextDocument.title;
      if (addHistoryEntry) {
        window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      }
      currentPath = url.pathname;
      currentUrl = new URL(window.location.href);

      document.querySelector("#toast-region")?.replaceChildren();
      closeNavigation();
      updateCurrentPage(url);
      window.initializeCadastro?.();
      document.dispatchEvent(new CustomEvent("spa:render", { detail: { url: url.href } }));
      const heading = document.querySelector("main h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
      scrollToRoutePosition(url);
      return true;
    } catch (error) {
      console.warn("Falha ao carregar a rota SPA.", error);
      return false;
    }
  }

  document.addEventListener("click", async (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0
      || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      || link.target || link.hasAttribute("download")) {
      return;
    }

    const url = new URL(link.href, window.location.href);
    if (!isApplicationPage(url)) {
      return;
    }

    if (url.pathname === window.location.pathname && !url.hash) {
      event.preventDefault();
      return;
    }

    if (url.pathname === window.location.pathname && url.hash) {
      event.preventDefault();
      window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      currentUrl = new URL(window.location.href);
      scrollToRoutePosition(url);
      return;
    }

    event.preventDefault();
    const rendered = await renderRoute(url);
    if (!rendered) {
      notifyRouteError();
    }
  });

  window.addEventListener("popstate", async () => {
    const url = new URL(window.location.href);
    if (url.pathname === currentPath) {
      scrollToRoutePosition(url);
      return;
    }

    const rendered = await renderRoute(url, false);
    if (!rendered) {
      window.history.replaceState({}, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
      notifyRouteError();
    }
  });
})();
