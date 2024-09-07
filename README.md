
Vite Deployment System
Welcome to the Vite Deployment System! This project integrates several modern technologies to create a robust deployment and monitoring system. Below you'll find information on the technologies used, as well as instructions on how to set up and run each part of the project.

Technology Stack
Node.js
Express.js
AWS
Docker
Kafka
Socket.IO
PostgreSQL
ClickHouse
Project Structure
The project is divided into three main components:

1. Build Server
The build server handles the build processes for the application.

Commands
To set up and run the Build Server, use the following commands:

bash
Copy code
cd build-server
npm install
npm start
2. Main API Server
The Main API Server provides core API functionality for the application.

Commands
To set up and run the Main API Server, use the following commands:

bash
Copy code
cd main-server
npm install
npm start
3. Proxy
The Proxy component manages routing and API requests between services.

Commands
To set up and run the Proxy, use the following commands:

bash
Copy code
cd proxy
npm install
npm run dev
Running the Project
To run the entire project, navigate to each component’s directory and execute the respective commands. For convenience, you can also use the following commands to start all components:

Start All Components
Build Server

bash
Copy code
cd build-server
npm install
npm start
Main API Server

bash
Copy code
cd main-server
npm install
npm start
Proxy

bash
Copy code
cd proxy
npm install
npm run dev
Docker Setup (Optional)
To streamline running the project with Docker, create a docker-compose.yml file in the root directory:

Docker Compose Configuration
yaml
Copy code
version: '3'
services:
  build-server:
    build: ./build-server
    command: npm start
    volumes:
      - ./build-server:/app
    ports:
      - "3000:3000"

  main-server:
    build: ./main-server
    command: npm start
    volumes:
      - ./main-server:/app
    ports:
      - "3001:3001"

  proxy:
    build: ./proxy
    command: npm run dev
    volumes:
      - ./proxy:/app
    ports:
      - "3002:3002"
To start the services using Docker Compose, run:

bash
Copy code
docker-compose up --build
Contributing
We welcome contributions to enhance this project. Please refer to our CONTRIBUTING.md for guidelines on how to contribute.

License
This project is licensed under the MIT License. See the LICENSE file for details.
