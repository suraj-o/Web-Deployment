<div align="center">

<div>
    <img src="https://img.shields.io/badge/-javascript-black?style=for-the-badge&logoColor=white&logo=javascript&color=f5e942" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Docker-black?style=for-the-badge&logoColor=white&logo=docker&color=3178C6"alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-kafka-black?style=for-the-badge&logoColor=white&logo=kafka" alt="tailwind" />
    <img src="https://img.shields.io/badge/AWS-grey?style=for-the-badge&logo=aws" alt="tailwind" />
  </div>

<h3 align="center">vite deployment system</h3>

</div>  

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Tailwind CSS
- Shadcn
- Socket.Io
- Node JS
- Express Js
- Kafka
- Docker
- AWS
- PostgresDB
- ClickHouseDB

## <a name="features">🔋 Features</a>

👉 **Scalable Deployment**: Scalable Deployment: Efficiently deploy and manage builds with a robust build server.

👉 **API Management**: Core API functionalities managed by the Main API Server.

👉 **Dynamic Routing**: The Proxy component ensures seamless routing and request handling.

👉 **Real-time Communication**: Socket.IO integration for real-time logs updates and communication while deploying app.

👉 **Reliable Logging**: Kafka ensures reliable log delivery and ClickHouse facilitates fast log querying.

👉 **Database Integration**: PostgreSQL for structured data and ClickHouse for high-performance analytics.

👉 *Automated Builds**: Utilize Docker and AWS ECS (Elastic Container Service) for seamless build automation.

👉 **Code Storage**: AWS S3 for storing and managing code artifacts.
 

## <a name="quick-start">🤸 Quick Start Locally</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker](https://docker.com/)
- [AWS](https://aws.amazon.com/)
- [kafka](https://kafka.apache.org/)
- [clickHouse](https://clickhouse.com/)

**Cloning the Repository**

```bash or powershell
git clone https://github.com/suraj-o/https://github.com/suraj-o/Web-Deployment
cd Web-Deployment
```

**First of all start server**

**NOTE**: change aws, kafka, clickhouse, postgresDB  crediential with your credentials  

```bash
---you must change credentials given following fields below---

--AWS--
1=> /build/script.js:11
2=> /main-server/configs/index.js:9

--kafka--
1=> /main-server/configs/index.js:17
2=> /build/script.js:21

--CLickhouseDB--
1=> /main-server/configs/index.js:30

```


**Installation**

**build-server**
```bash
---Install the project dependencies using npm:---

cd build-server
npm install

npm start
```

**main-server**
```bash
---run following command---
cd main-server
npm install

npm start

```
**proxy**
```bash
---run following command---
cd proxy
npm install

npm start

```

**Docker Setup (Optional)**

To simplify running the project using Docker, create a docker-compose.yml file at the root of your project:

```bash
version: '3'
services:
  main-server:
    build: ./main-server
    command: npm start
    volumes:
      - ./main-server:/app
    ports:
      - "4000:4000"

  proxy:
    build: ./proxy
    command: npm run dev
    volumes:
      - ./proxy:/app
    ports:
      - "9000:9000"
```

To start the services with Docker Compose, use:
```bash
docker-compose up --build
```

**Go to client folder**
```bash
---run following command---
cd ..
cd client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
