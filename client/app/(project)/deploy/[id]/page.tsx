"use client"
import { Button } from "@/components/ui/button";
import { ContextTypes, useSocketContext } from "@/context/SocketProvider";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";


interface DataResponsetype{
  success:boolean,
  message:{
    deployment_id:number,
    status:string,
    link:string
  }
}

export default function page({params}:{params:{id:string}}){
  const [isDeploy,setIsDeploy]=useState<boolean>(false)
  const [log,setLog]=useState<string[]>([])
  const router= useRouter()
  const downViewref=useRef<HTMLDivElement>(null)
  const {socket,logs}= useSocketContext() as ContextTypes

  const clickHandler=async()=>{
    setIsDeploy(true)
    const {data}:{data:DataResponsetype} = await axios.get(`http://localhost:4000/api/v1/deploy?projectid=${params.id}`);
    socket.emit('subscribe',data.message.deployment_id)
  }

  useEffect(()=>{
    setLog(prev=>[...prev,logs])
    checkCompleate(logs)
    downViewref.current?.scrollIntoView()
    return()=>{
    }
  },[logs])

  function checkCompleate(log:string){
    if(logs==="Done...."){
      setTimeout(()=>{
        setIsDeploy(false)
        toast({
          title:"deploy successfully redirect to projects"
        })
        router.push("/")
      },1500)
    }
  }

  return(
    <div className="w-80 m-auto mt-[50%] md:mt-10 md:w-1/2 ">
      <h1 className="text-3xl capitalize font-mono text-center">Deploy your project</h1>
        <div className='flex items-center justify-between mt-5 md:mt-2 '>
            <h2 className="text-xl capitalize">{}</h2>
            <Button onClick={clickHandler}>{isDeploy?"Cancel":"Deploy"}</Button>
       </div>

       <div className="bg-neutral-800 max-h-[65vh] overflow-y-auto rounded-md text-white flex flex-col justify-center items-start space-y-3 py-4 mt-3 md:mt-2 p-3">
       {
        log.length>2 && log.map((log,idx)=>log.length<2?null:<p key={idx}>{`> ${log}`}</p> )
       }
       <div ref={downViewref}> </div>
       </div>

    </div>
  )
}