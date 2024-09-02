
import React from 'react'
import avavtar from "@/assets/png.png"
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
import { Button } from '../ui/button'
import Image, { StaticImageData } from 'next/image'

interface ProjectCardProps{
  name:string
  subdomain:string
  image:StaticImageData
}

const ProjectCard:React.FC<ProjectCardProps> = ({name,subdomain,image}) => {
  return (
    <Card>
        <CardHeader className='p-2 flex flex-row justify-between items-center'>
            <h3 className='text-xl capitalize'>{name}</h3>
            <div className='flex space-x-3'>
             <Button className='px-3'>Logs</Button>
             <a href={`http://${subdomain}.localhost:7000`} target="_blank"><Button className='px-3'>Visit</Button></a>
            </div>
        </CardHeader>
        <CardContent className='flex justify-center' >
            <Image src={image} height={160} alt='project fit'/>
        </CardContent>
    </Card>
  )
}

export default ProjectCard