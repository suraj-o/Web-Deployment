import { RunTaskCommand } from "@aws-sdk/client-ecs";
import { ecsClient } from "../configs/index.js"

export async function ECSRuntaskUp(giturl,projectId,deploymentId){
    const command = new RunTaskCommand({
        cluster:"",
        taskDefinition:"",
        launchType:"",
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp:"",
                subnets:["","",""],
                securityGroups:[""]
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name:"b",
                    environment:[
                        {name:"GIT_RESPOSITRY_URL",value:giturl.toString()},
                        {name:"PROJECT_ID",value:projectId.toString()},
                        {name:"DEPLOYMENT_ID",value:deploymentId.toString()}
                    ]
                }
            ]
        }
    })
    await ecsClient.send(command)

    return true
}



