const CHAVE_INTERESSES = "patas-que-acolhem:areas-interesse";
const AREAS_INTERESSE = new Set(["doacoes", "voluntariado"]);

function lerInteresses() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_INTERESSES) ?? "[]");
    return Array.isArray(dados) ? dados.filter((area) => AREAS_INTERESSE.has(area)) : [];
  } catch {
    return [];
  }
}

function atualizarBotoesInteresse() {
  const interessesSalvos = new Set(lerInteresses());
  document.querySelectorAll("[data-interest-toggle]").forEach((botao) => {
    const selecionado = interessesSalvos.has(botao.dataset.interest);
    botao.setAttribute("aria-pressed", String(selecionado));
    botao.textContent = selecionado ? "Interesse salvo - remover" : "Tenho interesse";
  });
}

document.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-interest-toggle]");
  if (!botao || !AREAS_INTERESSE.has(botao.dataset.interest)) {
    return;
  }

  const interessesSalvos = new Set(lerInteresses());
  const area = botao.dataset.interest;
  if (interessesSalvos.has(area)) {
    interessesSalvos.delete(area);
  } else {
    interessesSalvos.add(area);
  }

  try {
    localStorage.setItem(CHAVE_INTERESSES, JSON.stringify([...interessesSalvos]));
    atualizarBotoesInteresse();
    window.showToast?.("Preferências de interesse salvas neste navegador.", "success");
  } catch {
    window.showToast?.("Não foi possível salvar a preferência neste navegador.", "error");
  }
});

document.addEventListener("DOMContentLoaded", atualizarBotoesInteresse);
document.addEventListener("spa:render", atualizarBotoesInteresse);
window.addEventListener("storage", (evento) => {
  if (evento.key === CHAVE_INTERESSES || evento.key === null) {
    atualizarBotoesInteresse();
  }
});
