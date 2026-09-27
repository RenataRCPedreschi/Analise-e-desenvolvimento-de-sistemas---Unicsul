# Patas que Acolhem

Site informativo de uma organizacao de protecao animal. Apresenta a ONG, explica como contribuir ou participar como voluntario e oferece um formulario demonstrativo de cadastro. A navegacao entre paginas usa uma SPA progressiva: com HTTP, o roteador substitui o conteudo de `main`; sem JavaScript ou sem rede, os links HTML continuam disponiveis como fallback.

## Funcionalidades

- Paginas de inicio, projetos e cadastro.
- Navegacao SPA com History API, templates HTML e renderizacao pelo DOM.
- Menu responsivo, dialogo informativo, alertas e toasts.
- Validacao de formulario, formatacao de CPF/telefone/CEP e estados acessiveis.
- Preferencias de interesse em Doacoes e Voluntariado salvas no `localStorage`. Dados pessoais do cadastro nao sao persistidos.
- Imagem de caes e gatos oferecida em WebP, PNG e JPG.

## Tecnologias

- HTML5 semantico, incluindo `<template>` e `<dialog>`.
- CSS3 com variaveis, Grid, Flexbox e breakpoints responsivos.
- JavaScript nativo: DOM, Fetch, DOMParser, History API e Web Storage.
- IMask 7.6.1 via CDN para mascaras dos campos; o cadastro possui formatacao nativa alternativa se o CDN estiver indisponivel.

## Estrutura

```text
patas-que-acolhem/
|-- html/       # Paginas index.html, projetos.html e cadastro.html
|-- css/        # Folha compartilhada styles.css
|-- imagens/    # Recursos de imagem em JPG, PNG e WebP
|-- js/         # cadastro, feedback, interesses, navegacao, SPA e templates
`-- README.md
```

## Pre-requisitos

- Navegador moderno com suporte a HTML5, JavaScript e `localStorage`.
- Python 3 para servir o site localmente e testar a navegacao SPA.
- Acesso a internet para carregar IMask pelo CDN; sem rede, as mascaras do formulario usam o fallback local.

## Executar localmente

No PowerShell, a partir da raiz `patas-que-acolhem`:

```powershell
python -m http.server 8000
```

Abra `http://localhost:8000/html/index.html`. O servidor e necessario para a navegacao SPA baseada em Fetch; abrir o HTML diretamente continua permitindo a navegacao tradicional.

## Dependencias e build

Nao ha `package.json`, dependencias NPM ou etapa de build configurada. O CSS e o JavaScript sao servidos diretamente pelo Python HTTP Server. A unica biblioteca externa e IMask, carregada pela pagina de cadastro via CDN.

## Testes e validacao

Nao ha suite automatizada configurada. Os fluxos foram verificados manualmente no navegador: navegacao e historico SPA, menu e dialogo, validacao de dados, toasts, persistencia das preferencias e fallback das mascaras sem CDN. Para validar o HTML, envie individualmente `html/index.html`, `html/projetos.html` e `html/cadastro.html` ao [Nu Html Checker do W3C](https://validator.w3.org/nu/); os tres passaram sem erros ou avisos.

## GitFlow

`main` representa a versao estavel e `develop` a integracao. Novas tarefas devem partir de `develop` em branches `feature/<nome>`; correcoes urgentes partem de `main` em `hotfix/<nome>`. Branches de release podem ser criadas como `release/<versao>` durante a estabilizacao. Atualmente, `main` e `develop` estao no mesmo commit; nao ha tags de versao criadas.

