import express from "express";
import { IoServer } from "./services/socket.js";
import { deploy, getProject, project, user } from "./routes/deploy.js";
import cors from "cors"
import morgan from "morgan";

const app = express();
const PORT = 4000;
const ioSocket = new IoServer()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    method:["GET","POST"],
    credential:true
}))
app.use(morgan("dev"))


app.post("/api/v1/user",user)
app.post("/api/v1/project",project)
app.get("/api/v1/projects",getProject)
app.get("/api/v1/deploy",deploy)


ioSocket.intiIo()
ioSocket.initKafakConsumer()
app.listen(PORT,()=>console.log("server is working",4000))
