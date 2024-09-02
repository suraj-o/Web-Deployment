'use client'
import { getUserData } from "@/actions/actions";
import ProjectCard from "@/components/helper/Project-card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { images } from "@/actions";

interface ProjectsType{
  name:string,
  gitUrl:string,
  id:number,
  subDomain:string,
  createdAt:Date,
  updatedAt:Date
}


export default function page(){
  const router = useRouter()
  const [projects,setProjects]=useState<ProjectsType[]>([{
    name:"",
    gitUrl:"",
    id:0,
    subDomain:"",
    createdAt:new Date,
    updatedAt:new Date
  }])

  async function getProjects(){
    try {
      const user= await getUserData()
      const {data}:{data:{success:boolean,Projects:ProjectsType[]}}= await axios.get(`http:///localhost:4000/api/v1/projects?userid=${user.id}`,{
      })
      setProjects(prev=>[...data.Projects])

    } catch (error) {
      console.log("error")
    }
  }
useEffect(()=>{
  getProjects()

  return()=>{

  }
},[])

return(
    <div className="p-2">
    <div className="flex justify-between px-3">
      <h1 className="text-3xl font-mono font-bold ml-4">Projects</h1>
      <Link href={"/new"}>
        <Button onClick={()=>router.push("/new")}>Create Project</Button>
      </Link>
    </div>
    <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {
         projects.map((project,ind)=>(
          <ProjectCard name={project.name} subdomain={project.subDomain} image={images[Math.floor(Math.random() * 8)]}/>
        ))
      }
    </div>
    </div>
)
}