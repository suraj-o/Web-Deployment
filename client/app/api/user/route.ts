import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user===null || !user.id){
        throw new Error("something went wrong while authentication")
    }

    const {data} = await axios.post("http://localhost:4000/api/v1/user",{
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
        return NextResponse.redirect("http://localhost:3000/api/auth/login")
    }
    return NextResponse.redirect("http://localhost:3000")
}