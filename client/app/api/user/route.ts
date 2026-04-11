import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function GET(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user===null || !user.id){
        throw new Error("something went wrong while authentication")
    }

    const { data } = await axios.post(`${config.MAIN_SERVER_URL}/api/v1/user`, {
        id :user.id,
        email:user.email,
        name:user.given_name
    },{
        withCredentials:true,
        headers:{
            "Content-Type":"application/json"
        }
    })

    if(!data){
        return NextResponse.redirect(`${config.CLIENT_URL}/api/auth/login`)
    }
    return NextResponse.redirect(config.CLIENT_URL)
}