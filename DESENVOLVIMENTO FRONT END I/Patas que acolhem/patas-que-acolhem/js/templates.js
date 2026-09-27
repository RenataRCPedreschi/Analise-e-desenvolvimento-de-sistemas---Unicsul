const projectLists = {
  doacoes: [
    "Ração para cães e gatos",
    "Itens de higiene e limpeza",
    "Jornais, cobertores e outros materiais de cuidado",
    "Contribuições financeiras para despesas de atendimento e acolhimento"
  ],
  atividades: [
    "Apoiar os cuidados e a organização dos espaços dos animais",
    "Colaborar em eventos, feiras de adoção e campanhas",
    "Contribuir com comunicação, divulgação ou tarefas administrativas, conforme a necessidade"
  ]
};

function renderProjectLists() {
  const page = document.querySelector(".projects-page");
  const template = page?.querySelector("#template-item-lista");
  if (!page || !template) {
    return;
  }

  page.querySelectorAll("[data-template-list]").forEach((list) => {
    const items = projectLists[list.dataset.templateList] ?? [];
    const fragment = document.createDocumentFragment();

    items.forEach((text) => {
      const item = template.content.cloneNode(true);
      item.querySelector("[data-template-text]").textContent = text;
      fragment.append(item);
    });

    list.replaceChildren(fragment);
  });
}

document.addEventListener("DOMContentLoaded", renderProjectLists);
document.addEventListener("spa:render", renderProjectLists);
