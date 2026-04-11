import { ECSClient } from "@aws-sdk/client-ecs"
import { createClient } from "@clickhouse/client"
import { Kafka } from "kafkajs"
import fs from "fs"
import path from "path"
import { PrismaClient } from "@prisma/client"

// CENTRAL CONFIGURATION OBJECT
export const config = {
    PORT: process.env.MAIN_SERVER_PORT || 4000,
    SOCKET_PORT: process.env.SOCKET_SERVER_PORT || 9002,
    AWS: {
        REGION: process.env.AWS_REGION || "us-east-1",
        ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
        SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        ECS: {
            CLUSTER_ARN: process.env.ECS_CLUSTER_ARN,
            TASK_DEFINITION_ARN: process.env.ECS_TASK_DEFINITION_ARN,
            SUBNETS: (process.env.ECS_SUBNET_IDS || "").split(","),
            SECURITY_GROUPS: (process.env.ECS_SECURITY_GROUP_IDS || "").split(","),
            CONTAINER_NAME: process.env.ECS_CONTAINER_NAME || "builder-container"
        }
    },
    KAFKA: {
        CLIENT_ID: process.env.KAFKA_CLIENT_ID || "docker-deployment-server",
        BROKERS: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
        USERNAME: process.env.KAFKA_USERNAME,
        PASSWORD: process.env.KAFKA_PASSWORD,
        MECHANISM: process.env.KAFKA_MECHANISM || "scram-sha-256",
        CA_PATH: path.join(path.resolve(), "configs", "ca.pem")
    },
    CLICKHOUSE: {
        HOST: process.env.CLICKHOUSE_HOST || "http://localhost:8123",
        DATABASE: process.env.CLICKHOUSE_DATABASE || "default",
        USERNAME: process.env.CLICKHOUSE_USERNAME || "default",
        PASSWORD: process.env.CLICKHOUSE_PASSWORD
    },
    PROXY_BASE_URL: process.env.PROXY_BASE_URL || "localhost:7000"
}

// AWS ECS CLIENT
export const ecsClient = new ECSClient({
    region: config.AWS.REGION,
    credentials: {
        accessKeyId: config.AWS.ACCESS_KEY || "",
        secretAccessKey: config.AWS.SECRET_KEY || ""
    },
})

// KAFKA CLIENT
export const kafka = new Kafka({
    clientId: config.KAFKA.CLIENT_ID,
    brokers: config.KAFKA.BROKERS,
    sasl: config.KAFKA.USERNAME && config.KAFKA.PASSWORD ? {
        username: config.KAFKA.USERNAME,
        password: config.KAFKA.PASSWORD,
        mechanism: config.KAFKA.MECHANISM,
    } : undefined,
    ssl: fs.existsSync(config.KAFKA.CA_PATH) ? {
        ca: [fs.readFileSync(config.KAFKA.CA_PATH, "utf-8")]
    } : undefined
})

// CLICKHOUSE CLIENT
export const CHClient = createClient({
    host: config.CLICKHOUSE.HOST,
    database: config.CLICKHOUSE.DATABASE,
    username: config.CLICKHOUSE.USERNAME,
    password: config.CLICKHOUSE.PASSWORD
})

export const pClient = new PrismaClient()
