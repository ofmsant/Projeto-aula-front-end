# 🏛 Plataforma Web para ONG Amigos do Bem – Projeto Integrador

[![Versão](https://img.shields.io/badge/versão-1.0.1-blue)](https://github.com/usuario/repositorio/releases/tag/v1.0.1)

## **Resumo**

Este projeto foi desenvolvido como entrega final integradora do curso, aplicando conceitos de **HTML5, CSS3, JavaScript, acessibilidade, responsividade, metodologias ágeis** e **versionamento com Git/GitHub**.

A plataforma simula um sistema real utilizado por ONGs para:

- Divulgar projetos  
- Captar doações  
- Engajar voluntários  
- Manter transparência institucional

## **📌 Sumário**

- [Visão Geral](#visão-geral)  
- [Objetivos do Projeto](#objetivos-do-projeto)  
- [Funcionalidades Principais](#funcionalidades-principais)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Arquitetura do Projeto](#arquitetura-do-projeto)  
- [Acessibilidade – WCAG 2.1 AA](#acessibilidade--wcag-21-aa)  
- [Responsividade e Design System](#responsividade-e-design-system)  
- [JavaScript e Interatividade](#javascript-e-interatividade)  
- [Versionamento e Fluxo Git](#versionamento-e-fluxo-git)  
- [Instalação e Execução](#instalação-e-execução)  
- [Changelog das Releases](#changelog-das-releases)

## **🌍 Visão Geral**

A aplicação consiste em um conjunto de **páginas web responsivas e acessíveis** que simulam uma plataforma institucional para Organizações Não Governamentais.

As páginas atendem três perfis de usuário:

- **Administrador**  
- **Voluntário**  
- **Doador**

## **🎯 Objetivos do Projeto**

### Objetivo Geral

Desenvolver uma **plataforma web completa e funcional** para ONGs, aplicando todos os conceitos aprendidos ao longo do curso.

### Objetivos Específicos

- Estruturar páginas HTML5 completas e semânticas  
- Criar leiautes responsivos com CSS3 avançado  
- Implementar interatividade real com JavaScript  
- Garantir acessibilidade nível AA  
- Aplicar GitFlow, PRs, Milestones e Issues  
- Realizar minificação e otimização para produção  
- Elaborar documentação técnica profissional

## **🧩 Funcionalidades Principais**

### Páginas obrigatórias incluídas

- **index.html** – institucional  
- **projetos.html**  
- **cadastro.html** – formulário completo e interativo  

### Formulário avançado (cadastro)

- Validação **HTML5** + validação dinâmica via JS  
- Máscaras automáticas:
  - CPF  
  - Telefone  
  - CEP  
- Autocompletar endereço via **API ViaCEP**  
- Campos adaptados ao tipo de usuário:
  - Voluntário  
  - Doador  
- Armazenamento em **localStorage**  
- Listagem dinâmica com **edição e exclusão**

### Interface e navegação

- Menu responsivo (hambúrguer)  
- Submenus para desktop e mobile  
- Carrossel funcional com **autoplay** + teclado  
- Gaveta de **acessibilidade** na lateral

## **🛠 Tecnologias Utilizadas**

- **HTML5** semântico  
- **CSS3** com Grid e Flexbox  
- **JavaScript Vanilla (ES6)**  
- **Git + GitHub (GitFlow)**  
- **LocalStorage**  
- **API ViaCEP**  
- **WCAG 2.1 nível AA**


## **♿ Acessibilidade – WCAG 2.1 AA**

✔ Navegação por teclado  
✔ Labels e ARIA roles  
✔ Estados de foco visíveis  
✔ Contraste ≥ 4.5:1  
✔ Modo escuro acessível  
✔ Modo alto contraste  
✔ Preferências salvas no navegador  
✔ HTML semântico revisado

## **📱 Responsividade e Design System**

✔ Layout **mobile-first**  
✔ 5 breakpoints responsivos  
✔ Grid de 12 colunas  
✔ Sistema de espaçamentos 8–64px  
✔ Paleta com 8 cores (primárias, secundárias e neutras)  
✔ Tipografia escalável com 5 níveis  
✔ Componentes reutilizáveis (cards, botões, alerts, badges)

## **⚙ JavaScript e Interatividade**

- SPA básico com carregamento dinâmico de `<main>`  
- Máscaras de input personalizadas  
- Validações contextuais  
- Carrossel acessível  
- Alerts dinâmicos  
- Formulário inteligente por tipo de usuário  
- LocalStorage com CRUD completo

## **🌳 Versionamento e Fluxo Git**

✔ GitFlow completo  
✔ Branches organizadas  
✔ Commits semânticos  
✔ PRs documentados  
✔ Milestones e Issues utilizados  
✔ Releases versionadas (**SemVer**)

## **🚀 Instalação e Execução**

1. Clone o repositório:

```bash
git clone https://github.com/ofmsant/Projeto-aula-front-end.git

# Abra no VS Code e inicie um servidor local (ex: Live Server).

```
## **📝 Changelog das Releases**

v1.0.1
- Minificação de CSS/JS/HTML
- Compressão de imagens
- Ajustes de acessibilidade (WCAG 2.1 AA)
- Otimizações de produção

v1.0.0
- Estrutura base do projeto
- HTML, CSS e JS completos
- Funcionalidades principais implementadas





