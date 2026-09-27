let toastTimeout;

function fecharToast(toast) {
  window.clearTimeout(toastTimeout);
  toast.classList.add("is-leaving");
  window.setTimeout(() => toast.remove(), 160);
}

window.showToast = (mensagem, tipo = "info") => {
  const regiao = document.querySelector("#toast-region");
  if (!regiao) {
    return;
  }

  regiao.replaceChildren();
  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;
  toast.setAttribute("role", "status");

  const texto = document.createElement("p");
  texto.textContent = mensagem;

  const fechar = document.createElement("button");
  fechar.className = "toast-close";
  fechar.type = "button";
  fechar.textContent = "Fechar";
  fechar.setAttribute("aria-label", "Fechar notificação");
  fechar.addEventListener("click", () => fecharToast(toast));

  toast.append(texto, fechar);
  regiao.append(toast);
  toastTimeout = window.setTimeout(() => fecharToast(toast), 5000);
};

document.addEventListener("click", (evento) => {
  if (evento.target instanceof HTMLDialogElement) {
    if (evento.target.open) {
      evento.target.close();
    }
    return;
  }

  const abrir = evento.target.closest("[data-dialog-open]");
  if (abrir) {
    const dialogo = document.getElementById(abrir.dataset.dialogOpen);
    if (dialogo instanceof HTMLDialogElement && !dialogo.open) {
      dialogo.showModal();
    }
    return;
  }

  const fechar = evento.target.closest("[data-dialog-close]");
  if (fechar) {
    fechar.closest("dialog")?.close();
  }
});
