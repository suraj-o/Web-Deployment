"use client"
import { getUserData } from "@/actions/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import {useRouter} from "next/navigation"
export default function page(){

  const router = useRouter()

   async function submitHandler(e:FormData){
    "use Server";
  try {
    const user = await getUserData()
    const {data}=await axios.post("http://localhost:4000/api/v1/project",{
      name: e.get("name") as string,
      giturl: e.get("gitUrl") as string,
      createdId: user.id as string
    },{
      headers:{
        "Content-Type":"application/json"
      }
    })
    toast({
      title:`project ${data.response.project_id} created`
    })
    router.push(`/deploy/${data.response.project_id!}`)
  } catch (error) {
    console.log(`error while creating project`)
  }
  }

  return(
    <div className="w-80 m-auto mt-[50%] md:mt-10 md:w-1/3 ">
      <form className="flex flex-col space-y-4" action={submitHandler}>
      <h2 className="capitalize text-3xl text-center font-mono ">create project</h2>
        <div className="flex flex-col space-y-2">
          <Label className="capitalize text-lg" htmlFor="project_name">Project Name</Label>
          <Input id="project_name" name="name" placeholder="write your project name"/>
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="capitalize text-lg" htmlFor="git_url">github url</Label>
          <Input id="git_url" name="gitUrl" placeholder="write github repositary url"/>
        </div>
        <Button type="submit" className="mt-4">Create</Button>
      </form>
    </div>
  )
}