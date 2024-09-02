import { pClient } from "../configs/index.js"
import {ECSRuntaskUp} from "../services/runtask.js"
import {generateSlug} from "random-word-slugs"

export const user =async(req,res,next)=>{
    try {
        const {name,email,id}= req.body
        if(!name || !email ){
            return res.status(400).json({
                success:false,
                messages:"fill require things"
            })
        }
        const user = await pClient.user.findFirst({
            where:{ email:email }
        })
        if(user){
            return res.status(200).json({
                success:true,
                messages:"sign in successfully"
            })
        }
            await pClient.user.create({
                data:{id:id, name:name, email:email}
            })
            return res.status(201).json({
                success:true,
                messages:"signup successfully"
            })
    } catch (error) {
        console.log(error)
    }
}

export const project =async(req,res,next)=>{
    try {
        const {name,giturl,createdId}= req.body
        const subDomain= generateSlug(3)

        if(!name || !giturl ){
            return res.status(400).json({
                success:false,
                messages:"fill require things"
            })
        }

        const isProject = await pClient.projects.findFirst({
            where:{ name }
        })
        if(isProject){
            return res.status(400).json({
                success:false,
                messages:"project already exist"
            })
        }

           const project= await pClient.projects.create({
                data:{ 
                       name, 
                       gitURL:giturl,
                       createdId,
                       subDomain
                    }
            })
            return res.status(201).json({
                success:true,
                response:{
                    project_id:project.id,
                    message:"Project Created"
                }
            })
    } catch (error) {
        console.log(error)
    }
}
export const getProject =async(req,res,next)=>{
    try {
        console.log(1)
        const {userid}= req.query
        const Projects = await pClient.projects.findMany({
            where:{ createdId:userid }
        })
            return res.status(201).json({
                success:true,
                Projects
            })
    } catch (error) {
        console.log(error)
    }
}

export const deploy= async(req,res,next)=>{
    try {
        const {projectid}= req.query
        const project= await pClient.projects.findFirst({ where:{ id:Number(projectid) } })

        if(!project){
            return res.status(404).json({
                success:false,
                messages:"project not exist"
            })
        }
        
        const deployment = await pClient.deployments.create({
            data:{ projectId:project.id }
        })

        const success= await ECSRuntaskUp(project.gitURL,project.id,deployment.id)
        if(success){
            return res.status(201).json({
                success:true,
                message:{
                    deployment_id:deployment.id,
                    status:"queed",
                    link:`http://${project.subDomain}.localhost:9000`
                }
            })
        }
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}