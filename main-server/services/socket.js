import {Server} from "socket.io"
import { CHClient, kafka } from "../configs/index.js"
import {v4} from "uuid"

export class IoServer {
    constructor(){
        this.PORT=9002
        this.io= new Server({
            cors:"http://localhost:3000",
            method:["GET","POST"]
        })
        this.consumer= kafka.consumer({groupId:"api-build-logs-consumer"})
    }

    async initKafakConsumer(){
        this.consumer.connect();
        this.consumer.subscribe({topics:["build-logs"]})

        this.consumer.run({
            eachBatch:async({batch,heartbeat,resolveOffset,commitOffsetsIfNecessary})=>{
                let messages= batch.messages;

                for(const message of messages){
                    const messagestring = message.value.toString()
                    const {PROJECT_ID,DEPLOYMENT_ID,logs}= JSON.parse(messagestring)
                    this.io.to(DEPLOYMENT_ID.toString()).emit("LOGS",JSON.stringify(logs))
                      try {
                        const {query_id}= await CHClient.insert({
                            table:"log_events",
                            values:[{event_id: v4(),deployment_id:DEPLOYMENT_ID,log:logs}],
                            format:"JSONEachRow"
                        })

                        await commitOffsetsIfNecessary(message.offset)
                        resolveOffset(message.offset)
                        await heartbeat()
                      
                    } catch (error) {
                        console.log({Error:error})
                        process.exit(0)
                      }
                }
            }
        })
    }

    intiIo(){
        this.io.on("connection",(socket)=>{
            socket.on("subscribe",(channelName)=>{
                socket.join(channelName.toString())
                console.log(channelName)
            })
        })

        this.io.listen(this.PORT,()=>console.log("socket initialized"))
    }
}