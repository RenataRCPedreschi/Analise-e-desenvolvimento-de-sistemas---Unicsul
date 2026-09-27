function initializeCadastro() {
  const formCadastro = document.querySelector("#form-cadastro");
  if (!formCadastro || formCadastro.dataset.initialized === "true") {
    return;
  }
  formCadastro.dataset.initialized = "true";

  const cpfInput = document.querySelector("#cpf");
  const telefoneInput = document.querySelector("#telefone");
  const cepInput = document.querySelector("#cep");
  const resultadoCadastro = document.querySelector("#resultado-cadastro");

function somenteDigitos(valor) {
  return valor.replace(/\D/g, "");
}

function formatarCpf(valor) {
  return valor
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarTelefone(valor) {
  const digitos = valor.slice(0, 11);
  if (digitos.length <= 2) {
    return digitos ? `(${digitos}` : "";
  }
  if (digitos.length <= 6) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  }
  const tamanhoPrefixo = digitos.length > 10 ? 5 : 4;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 2 + tamanhoPrefixo)}-${digitos.slice(2 + tamanhoPrefixo)}`;
}

function formatarCep(valor) {
  const digitos = valor.slice(0, 8);
  return digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos;
}

function cpfValido(valor) {
  const digitos = somenteDigitos(valor);
  if (digitos.length !== 11 || /^(\d)\1{10}$/.test(digitos)) {
    return false;
  }

  function calcularDigito(tamanho) {
    let soma = 0;
    for (let indice = 0; indice < tamanho; indice += 1) {
      soma += Number(digitos[indice]) * (tamanho + 1 - indice);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  }

  return calcularDigito(9) === Number(digitos[9])
    && calcularDigito(10) === Number(digitos[10]);
}

function atualizarCpf() {
  cpfInput.setCustomValidity(
    cpfInput.value.length === 14 && !cpfValido(cpfInput.value)
      ? "Informe um CPF válido, incluindo os dígitos verificadores."
      : ""
  );
}

function atualizarEstadoCampo(campo) {
  const preenchido = campo.type === "checkbox" ? campo.checked : campo.value.trim() !== "";
  const invalido = !campo.validity.valid;

  campo.classList.toggle("is-invalid", invalido);
  campo.classList.toggle("is-valid", !invalido && preenchido);
  const contenedor = campo.closest(".field, .consent");
  if (contenedor) {
    contenedor.classList.toggle("field-invalid", invalido);
    contenedor.classList.toggle("field-valid", !invalido && preenchido);
  }
  if (invalido) {
    campo.setAttribute("aria-invalid", "true");
  } else {
    campo.removeAttribute("aria-invalid");
  }
}

function tratarAlteracaoCampo(evento) {
  const campo = evento.target;
  if (!(campo instanceof HTMLInputElement) && !(campo instanceof HTMLSelectElement)) {
    return;
  }

  if (campo.matches(".is-valid, .is-invalid") || campo.hasAttribute("aria-invalid")) {
    atualizarEstadoCampo(campo);
  }

  resultadoCadastro.textContent = "";
  resultadoCadastro.removeAttribute("data-state");
  resultadoCadastro.removeAttribute("data-notified");
}

formCadastro.addEventListener("focusout", (evento) => {
  const campo = evento.target;
  if (campo instanceof HTMLInputElement || campo instanceof HTMLSelectElement) {
    atualizarEstadoCampo(campo);
  }
});
formCadastro.addEventListener("input", tratarAlteracaoCampo);
formCadastro.addEventListener("change", tratarAlteracaoCampo);
formCadastro.addEventListener("invalid", (evento) => {
  atualizarEstadoCampo(evento.target);
  resultadoCadastro.textContent = "Revise os campos destacados e tente novamente.";
  resultadoCadastro.dataset.state = "error";
  if (window.showToast && resultadoCadastro.dataset.notified !== "true") {
    window.showToast("Revise os campos destacados antes de continuar.", "error");
    resultadoCadastro.dataset.notified = "true";
  }
}, true);

if (typeof window.IMask === "function") {
  window.IMask(cpfInput, { mask: "000.000.000-00" });
  window.IMask(telefoneInput, {
    mask: [
      { mask: "(00) 0000-0000" },
      { mask: "(00) 00000-0000" }
    ],
    dispatch: (acrescentado, mascaraDinamica) => {
      const digitos = (mascaraDinamica.value + acrescentado).replace(/\D/g, "");
      return mascaraDinamica.compiledMasks[digitos.length > 10 ? 1 : 0];
    }
  });
  window.IMask(cepInput, { mask: "00000-000" });
  cpfInput.addEventListener("input", atualizarCpf);
} else {
  cpfInput.addEventListener("input", () => {
    cpfInput.value = formatarCpf(somenteDigitos(cpfInput.value).slice(0, 11));
    atualizarCpf();
  });
  telefoneInput.addEventListener("input", () => {
    telefoneInput.value = formatarTelefone(somenteDigitos(telefoneInput.value));
  });
  cepInput.addEventListener("input", () => {
    cepInput.value = formatarCep(somenteDigitos(cepInput.value));
  });
}

formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault();
  atualizarCpf();
  resultadoCadastro.textContent = "";
  resultadoCadastro.removeAttribute("data-state");

  if (!formCadastro.reportValidity()) {
    return;
  }

  resultadoCadastro.textContent = "Cadastro validado no navegador. Nenhum dado foi enviado ou armazenado.";
  resultadoCadastro.dataset.state = "success";
  window.showToast?.("Cadastro validado. Nenhum dado foi enviado ou armazenado.", "success");
});

  formCadastro.querySelector('button[type="submit"]').disabled = false;
}

window.initializeCadastro = initializeCadastro;
initializeCadastro();
