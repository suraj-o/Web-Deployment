const {exec}= require("child_process")
const path = require("path")
const {S3Client,PutObjectCommand}= require("@aws-sdk/client-s3")
const fs = require("fs")
const mime = require('mime-types')
const {Kafka}=require("kafkajs")

const PROJECT_ID=process.env.PROJECT_ID
const DEPLOYMENT_ID=process.env.DEPLOYMENT_ID

// AWS S3 CLIENT INSTANCE
const client = new S3Client({
    region:"",
    credentials:{
        accessKeyId:"",
        secretAccessKey:""
    }
})


const kafka = new Kafka({
    clientId:`dokcer-deployment-${DEPLOYMENT_ID}`,
    brokers:[""],
    sasl:{
        username:"",
        password:"",
        mechanism:"",
    },
    ssl:{
        ca:[fs.readFileSync(path.join(__dirname,"ca.pem"),"utf-8")]
    }
})

let producer;
async function createProducer() {
    if (producer) return producer;
  
    const _producer = kafka.producer();
    await _producer.connect();
    producer = _producer;
    return producer;
  }

async function logPublisher(logs){
    const producer = await createProducer()
    await producer.send({
        topic:"build-logs",
        messages:[
        {key:`logs-${DEPLOYMENT_ID}`,value:JSON.stringify({PROJECT_ID,DEPLOYMENT_ID,logs})}
        ]
    })
}


async function init(){
    console.log("executing script.js file")
    await logPublisher("Build Stared....")


    const outdirPath = path.join(__dirname,"output");
    const p = exec(`cd ${outdirPath} && npm  install && npm run build`)

    p.stdout.on("data",async(data)=>{
        console.log(data.toString())
        await logPublisher(data.toString())
    })

    p.stdout.on("error",async(data)=>{
        console.log("Error",data.toString())
        await logPublisher(`Error:${data.toString()}`)
    })

    p.on("close",async(data)=>{
        const distfolderContent=fs.readdirSync(path.join(__dirname,"output","dist"),{recursive:true})

        for(const filePath of distfolderContent){
            console.log("checking dir & file recursivly");
            await logPublisher(`checking folder structure`);

            const file = path.join(__dirname,"output","dist", filePath)
            if (fs.lstatSync(file).isDirectory()) continue;

            console.log("Uploading->",filePath)
            await logPublisher(`Uploading -> ${filePath} `);

            const command = new PutObjectCommand({
                Bucket:"vercel-builder-outputs",
                Key:`_ouput/${PROJECT_ID}/${filePath}`,
                Body:fs.createReadStream(file),
                ContentType:mime.lookup(file),
            })

            await client.send(command)
            await logPublisher(`Uploaded -> ${filePath} `);
        }
        console.log("Done")
        await logPublisher(`Done....`);
        process.exit(0)
    })
}
init()