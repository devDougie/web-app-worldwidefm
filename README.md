# 📻 World Wide FM

> Projeto de aprendizado e portfólio — Web rádio global com mapa interativo, construída com Java 17, Spring Boot 3 e Angular 21.

Este projeto foi desenvolvido em fases com o objetivo de praticar um conjunto de tecnologias do ecossistema Java/Spring e Angular em um contexto realista: uma aplicação fullstack que consome uma API pública de rádios do mundo inteiro, exibe os resultados em um mapa interativo e permite reproduzir os streams de áudio diretamente no navegador.

**Não se trata de um sistema pronto para produção**, mas de um projeto estruturado para aprendizado e portfólio.

---

## 🛠️ Stack

### Backend

| Tecnologia | Descrição |
| --- | --- |
| Java 17 | Linguagem principal |
| Spring Boot 3 | Framework principal |
| Spring Web + WebClient | API REST e consumo da API externa |
| Spring Cache + Caffeine | Cache em memória das respostas da Radio Browser API |
| Maven | Gerenciador de dependências |
| Docker + Docker Compose | Containerização |

### Frontend

| Tecnologia | Versão | Descrição |
| --- | --- | --- |
| Angular | 21.2.9 | Framework frontend |
| TypeScript | — | Linguagem do frontend |
| Leaflet.js | 1.9.4 via CDN | Mapa interativo 2D |
| leaflet.markercluster | 1.5.3 via CDN | Agrupamento de marcadores no mapa |
| HTML5 Audio API | — | Reprodução dos streams de áudio |
| RxJS | — | Programação reativa |
| SCSS | — | Estilização com variáveis CSS |
| Google Fonts | via CDN | Space Mono (logo) e DM Sans (texto geral) |

### APIs & Serviços Externos

| Serviço | Descrição |
| --- | --- |
| Radio Browser API | API gratuita e sem autenticação com dados de rádios do mundo inteiro |
| OpenStreetMap | Tiles gratuitos para o mapa visual |

---

## 🗂️ Arquitetura de Pacotes

### Backend (Spring Boot)

```
src/
├── main/
│   ├── java/com/webapp/worldwidefm/
│   │   ├── config/
│   │   │   ├── WebClientConfig.java       ← configura WebClient com timeout
│   │   │   ├── CacheConfig.java           ← configura Caffeine cache
│   │   │   └── CorsConfig.java            ← libera requisições do Angular e do Nginx
│   │   ├── controller/
│   │   │   └── RadioController.java       ← endpoints GET /api/radios e GET /api/radio/{id}
│   │   ├── service/
│   │   │   └── RadioService.java          ← lógica de busca e cache
│   │   ├── client/
│   │   │   └── RadioBrowserClient.java    ← consumo da Radio Browser API via POST
│   │   ├── model/
│   │   │   └── Radio.java                 ← representa uma rádio da API externa
│   │   ├── dto/
│   │   │   └── RadioResponseDTO.java      ← dados enviados ao frontend
│   │   └── WorldwidefmApplication.java    ← classe principal
│   └── resources/
│       ├── application.properties
│       └── application-docker.properties  ← perfil ativado pelo Docker Compose
└── test/
    └── java/com/webapp/worldwidefm/
        ├── service/
        │   └── RadioServiceTest.java
        └── controller/
            └── RadioControllerTest.java
```

### Frontend (Angular)

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── map/                  ← mapa Leaflet com marcadores e clusters
│   │   │   ├── player/               ← player de áudio com controles
│   │   │   ├── sidebar/              ← painel lateral com lista de rádios
│   │   │   └── favorites/            ← rádios favoritadas (localStorage)
│   │   ├── services/
│   │   │   ├── radio.service.ts      ← consumo da API do backend
│   │   │   └── favorites.service.ts  ← gerenciamento de favoritos
│   │   └── models/
│   │       └── radio.model.ts        ← interface TypeScript da rádio
│   ├── environments/
│   │   ├── environment.ts            ← URL do backend para desenvolvimento
│   │   └── environment.prod.ts       ← URL do backend para produção/Docker
│   └── index.html                    ← CDN do Leaflet, MarkerCluster e Google Fonts
├── Dockerfile                        ← build Angular + Nginx Alpine
├── nginx.conf                        ← configuração do Nginx para SPA
└── package.json
```

---

## 🐳 Infraestrutura Docker

O projeto roda completamente em containers com dois serviços:

| Container | Imagem base | Porta | Descrição |
| --- | --- | --- | --- |
| `worldwidefm-frontend` | Node 22 → Nginx Alpine | `80` | Build Angular servido pelo Nginx |
| `worldwidefm-backend` | Maven 3.9 → JRE 17 Alpine | `8080` | API Spring Boot |

Ambos se comunicam via rede interna `worldwidefm-net`. O build é multi-stage — a imagem final do backend tem ~80MB (apenas JRE Alpine, sem Maven).

---

## 🚀 Como rodar

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e **em execução**
- Git instalado

> ✅ **Não é necessário ter Java, Maven, Node.js ou npm instalados na máquina.** O Docker cuida de tudo isso durante o build.

### 1. Clone o repositório

```bash
git clone https://github.com/devDougie/web-app-worldwidefm.git
cd web-app-worldwidefm
```

### 2. Suba os containers

```bash
docker-compose up --build
```

Na primeira execução isso pode demorar alguns minutos — o Maven baixa as dependências do backend e o npm instala as dependências do frontend dentro dos containers.

### 3. Acesse no navegador

| O que acessar | URL |
| --- | --- |
| Aplicação (frontend) | `http://localhost` |
| API (backend) | `http://localhost:8080/api/radios` |

> ⚠️ **Windows:** se o Docker retornar erro de conexão ao iniciar, verifique se o Docker Desktop está aberto na bandeja do sistema.

---

## 📺 Demonstração

> 💡 **Como adicionar os GIFs:** grave cada interação com o [ScreenToGif](https://www.screentogif.com/) (gratuito), salve os arquivos na pasta `docs/` na raiz do projeto e substitua os blocos abaixo pela sintaxe `![descrição](docs/nome-do-arquivo.gif)`.

**Mapa interativo com clusters de rádios**

<!-- ![Mapa interativo](docs/mapa.gif) -->

**Player de áudio tocando uma rádio**

<!-- ![Player de áudio](docs/player.gif) -->

**Painel lateral e busca de rádios**

<!-- ![Painel lateral](docs/sidebar.gif) -->

**Adicionando e removendo favoritos**

<!-- ![Favoritos](docs/favoritos.gif) -->

---

## ⚙️ Comandos úteis

```bash
# Sobe os containers (sem rebuild)
docker-compose up

# Sobe os containers com rebuild após mudanças no código
docker-compose up --build

# Para os containers (mantém as imagens)
docker-compose down

# Acompanha os logs em tempo real
docker-compose logs -f

# Logs apenas do backend
docker-compose logs -f backend

# Logs apenas do frontend
docker-compose logs -f frontend
```

---

## 🔧 Rodar localmente sem Docker (modo desenvolvimento)

Se preferir rodar pela IDE com hot-reload:

**Backend — IntelliJ IDEA**

1. Abra o projeto no IntelliJ e aguarde o Maven indexar as dependências
2. Execute `WorldwidefmApplication.java` via botão **▶ Play**
3. A API estará disponível em `http://localhost:8080`

**Frontend — Terminal**

1. Acesse a pasta `frontend/`:
```bash
cd frontend
```
2. Instale as dependências (necessário apenas na primeira vez ou após `npm install`):
```bash
npm install
```
3. Suba o servidor de desenvolvimento:
```bash
ng serve
```
4. Acesse `http://localhost:4200`

> ⚠️ No modo desenvolvimento, o frontend aponta para `http://localhost:8080/api`. Certifique-se de que o backend está rodando antes de subir o Angular.

---

## 🎯 Objetivos de aprendizado

Este projeto foi desenvolvido em 8 fases para praticar progressivamente:

- ✅ Estrutura de projeto Spring Boot com Maven
- ✅ Consumo de API externa com WebClient (reativo)
- ✅ Cache em memória com Spring Cache + Caffeine
- ✅ Setup de projeto Angular com CLI
- ✅ Integração de biblioteca JavaScript (Leaflet) via CDN em projeto Angular
- ✅ Mapa interativo com Leaflet e agrupamento de marcadores com MarkerCluster
- ✅ Player de áudio com HTML5 Audio API
- ✅ Painel lateral, busca e favoritos com localStorage
- ✅ UX e polish (loading states, responsividade, animações)
- ✅ Containerização fullstack com Docker multi-stage build e Docker Compose

---

## 📄 Licença

Projeto de uso livre para fins de estudo e portfólio.
