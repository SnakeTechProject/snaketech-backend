# snaketech-backend

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

### Dependências globais

Você precisa ter três dependencias instaladas:

- Node.js LTS v16 (ou superior, utilizaremos o nvm para gerenciar os pacotes node)
- Yarn (caso não tenha instalado, poderá utilizar: `npm install --global yarn`)
- Docker Engine v17.12.0 com Docker Compose v1.24.1 (ou qualquer versão superior)

<br>

Utiliza `nvm`? (Node Version Manager) Então pode executar `nvm install v16.17.0` na pasta do projeto para instalar e utilizar a versão mais apropriada do Node.js.

Execute no terminal `nvm use v16.17.0` para utilizar o node v16 com todas dependencias inclusas dentro do pacote node
<br>
Testar versões únicas caso você prefira (apenas verificar as versões)
`yarn -v` retornara `yarn v1.22 1.22.19`
`node -v ` retornara `v16.17.0`
`npm -v` retornara `8.15.0`

Para usuarios do windows utilize a extensão editor config
Inicie a abertura rápida do VS Code `CTRL+P`
E execute este codigo `ext install EditorConfig.EditorConfig`

### Dependências locais

Após baixar o repositório, não se esqueça de instalar as dependências locais do projeto:

```bash
yarn
```

### Rodar o projeto

Para rodar o projeto localmente, basta rodar o comando abaixo:
```bash
yarn dev
```

- Para reiniciar o servidor (docker compose), basta utilizar as teclas `rs` e enter no terminal que estiver rodando
