import { RunTaskCommand } from "@aws-sdk/client-ecs";
import { ecsClient, config } from "../configs/index.js"

export async function ECSRuntaskUp(giturl, projectId, deploymentId) {
    const command = new RunTaskCommand({
        cluster: config.AWS.ECS.CLUSTER_ARN,
        taskDefinition: config.AWS.ECS.TASK_DEFINITION_ARN,
        launchType: "FARGATE",
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: "ENABLED",
                subnets: config.AWS.ECS.SUBNETS,
                securityGroups: config.AWS.ECS.SECURITY_GROUPS
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: config.AWS.ECS.CONTAINER_NAME,
                    environment: [
                        { name: "GIT_RESPOSITRY_URL", value: giturl.toString() },
                        { name: "PROJECT_ID", value: projectId.toString() },
                        { name: "DEPLOYMENT_ID", value: deploymentId.toString() }
                    ]
                }
            ]
        }
    })
    await ecsClient.send(command)

    return true
}



