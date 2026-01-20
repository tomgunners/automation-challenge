![CI](https://github.com/tomgunners/automation-challenge/actions/workflows/ci.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-E2E%20%7C%20API-green?logo=playwright)
![Allure](https://img.shields.io/badge/Allure-Reports-orange)
![k6](https://img.shields.io/badge/k6-Performance-blueviolet?logo=k6)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![pnpm](https://img.shields.io/badge/pnpm-workspaces-yellow?logo=pnpm)

# 🧪 QA Automation Monorepo

Este repositório é um **monorepo de qualidade de software** projetado para centralizar **testes Web, API, Mobile e Performance**, seguindo boas práticas.

Ele utiliza **PNPM Workspaces** para gerenciamento eficiente de dependências e execução isolada por pacote.

---

## 📦 Visão Geral do Monorepo

```text
/
automation-challenge/
│
├── api/			# Testes de API
│   ├── builders/
│   ├── clients/
│   ├── schemas/
│   ├── tests/
│   ├── utils/
│   ├── global-setup.ts
│   ├── package.json
│   └── playwright.config.ts
│
├── mobile/			# Testes Mobile (futuramente)
│   └── requirements/
│
├── web/			# Testes Web (UI / E2E)
│   ├── data/
│   ├── fixtures/
│   ├── helpers/
│   ├── pages/
│   ├── scripts/
│   ├── tests/
│   ├── package.json
│   ├── playwright.config.ts
│   └── tsconfig.json
│
├── performance/		# Testes de Performance (k6)
│   ├── config/
│   └─ k6.config.js		# Configuração global de performance
│   ├── data/
│   ├── results/
│   ├── scenarios/		# Orquestração dos testes
│   ├── scripts/		# Fluxos reutilizáveis (list, get, create)
│   ├── utils/
│   └── package.json
│
├── shared/
│   ├── utils/
│   └── config/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .gitignore
├─  package.json                # Configuração raiz
├─  pnpm-lock.yaml              # Lockfile único do monorepo
├─  pnpm-workspace.yaml         # Definição dos workspaces
└── README.md                  # Documentação do projeto
```

---

## 🎯 Objetivos do Projeto

* Centralizar testes **Web, API, Mobile e Performance**
* Executar testes localmente e via **CI/CD**
* Garantir **contratos de performance (SLA)**
* Manter histórico de execuções e resultados
* Escalabilidade para múltiplos times e projetos

---

## 🧰 Tecnologias Utilizadas

* **Node.js 20+**
* **PNPM 9+ (Workspaces)**
* **k6** (Testes de Performance)
* **JavaScript (ESM)**
* **GitHub Actions** (CI/CD)

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto localmente, certifique-se de ter instalado:

```bash
node --version   # >= 20
pnpm --version   # >= 9
k6 version
```

Instalação do PNPM (caso não tenha):

```bash
npm install -g pnpm
```

Instalação do k6:

* [https://k6.io/docs/get-started/installation/](https://k6.io/docs/get-started/installation/)

---

## 📦 Instalação das Dependências

Na raiz do projeto, execute:

```bash
pnpm install
```

Isso irá instalar todas as dependências de todos os pacotes do monorepo.

---

## ▶️ Executando os Testes Localmente

### 🖥️ Testes Web

```bash
pnpm test: web
```

Relatórios gerados em:

```text
web/results/
```

---

### 🔌 Testes de API

```bash
pnpm test: api
```

Relatórios gerados em:

```text
api/results/
```

---

### ⚡ Testes de Performance (k6)

```bash
pnpm test: performance
```

Relatórios gerados em:

```text
performance/results/
```

Os testes utilizam:

* Cenários configurados em `performance/scenarios`
* Contratos de performance definidos em `performance/config/k6.config.js`

---

## 📊 Testes de Performance – O que é Validado

* ⏱️ **Tempo de resposta (p95, média, p99)**
* ❌ **Taxa de erro**
* 📈 **Throughput mínimo**
* ✅ **Checks funcionais**
* 🏷️ Tags por domínio e tipo de teste

Exemplo de SLA:

```js
http_req_duration: ['p(95)<800', 'avg<500'],
http_req_failed: ['rate<0.01'],
checks: ['rate>0.99'],
```

---

## 🤖 CI/CD – GitHub Actions

O pipeline está configurado para:

* ⏰ Executar automaticamente **a cada 1 hora**
* ▶️ Permitir execução manual
* 🧪 Rodar testes **Web, API e Performance em paralelo**
* 📦 Cache inteligente por workspace (PNPM)
* 📊 Publicar artifacts de cada execução

Arquivo:

```text
.github/workflows/ci.yml
```

---

## 📁 Artifacts e Resultados

Cada execução do pipeline gera artifacts versionados:

```text
results-web-<run_id>
results-api-<run_id>
results-performance-<run_id>
```

Esses artifacts podem ser usados para:

* Auditoria
* Comparação entre execuções
* Análise de regressão

---

## 🧠 Boas Práticas Adotadas

* Monorepo com isolamento por pacote
* Scripts reutilizáveis
* Separação clara de responsabilidades
* Contratos de performance explícitos
* Pipeline escalável e observável

---

## 👨‍💻 Autor

Wellington de Oliveira - QA SÊNIOR

---

✅ **Projeto pronto para escala, auditoria e evolução contínua.**
