"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {io, Socket} from "socket.io-client"

export interface ContextTypes{
    logs:string
    socket:Socket
}

interface SocketProviderProps{
    children:React.ReactNode
}

const SocketContext= React.createContext<ContextTypes|null>(null)

export function useSocketContext(){
    const state = useContext(SocketContext)
    if(!state) return null

    return {
        logs:state.logs,
        socket:state.socket
    }
}

const SocketProvider:React.FC<SocketProviderProps> = ({children}) => {
   const [socket,setSocket]=useState<Socket>()
   const [logs,setLogs]=useState<string>("")

    useEffect(()=>{
       const _socket=io("http://localhost:9002")
       
       _socket.on('LOGS',(data)=>{
           const parsedData=JSON.parse(data)
           setLogs(parsedData)
        })
        
        setSocket(_socket)

       return()=>{
        _socket.off("logs")
        setLogs("")
       }

    },[])

  return (
    <SocketContext.Provider value={{logs,socket:socket!}}>
        {children}
    </SocketContext.Provider>
  )
}


export default SocketProvider


