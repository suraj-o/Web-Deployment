import { ModeToggle } from "@/providers/theme-menu";

export default function Nav(){
    return(
        <div className="padding flex justify-between ">
            <h1 className="text-2xl font-semibold font-serif">Deploy Web</h1>
            <ModeToggle/>
        </div>
    )
}