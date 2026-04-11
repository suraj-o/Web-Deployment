const { PrismaClient } = require("@prisma/client");
const express = require("express");
const httpProxy = require("http-proxy")
const config = require("./config")

const app = express();
const PORT = config.PORT;
let basePath = config.S3_BASE_URL
const proxy = httpProxy.createProxy()


const pclient = new PrismaClient()

app.use(async(req,res)=>{
    const host=req.hostname
    const subdomain=host.split(".")[0]

    const project = await pclient.projects.findFirst({
        where:{ subDomain:subdomain }
    })

    let resolvesTo= `${basePath}/${project.id}`
    proxy.web(req,res,{target:resolvesTo , changeOrigin:true})
    
})

proxy.on("proxyReq",(proxyreq,req,res)=>{
    if(req.url==="/") proxyreq.path+="index.html"
})

app.listen(PORT,()=>console.log(`server working on ${PORT}`))