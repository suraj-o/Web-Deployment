import {ECSClient} from "@aws-sdk/client-ecs"
import { createClient } from "@clickhouse/client"
import {Kafka} from "kafkajs"
import fs from "fs"
import path from "path"
import { PrismaClient } from "@prisma/client"

// AWS ECR CLIENT CONFIGS
export const ecsClient= new ECSClient({
    region:"",
    credentials:{
        accessKeyId:"",
        secretAccessKey:""
    },
})

export const kafka = new Kafka({
    clientId:`docker-deployment-server`,
    brokers:[""],
    sasl:{
        username:"",
        password:"",
        mechanism:"",
    },
    ssl:{
        ca:[fs.readFileSync(path.join(path.resolve(),"configs","ca.pem"),"utf-8")]
    }
})

export const CHClient = createClient({
    host: "",
    database:"",
    username:"",
    password:""
})

export const pClient = new PrismaClient()
