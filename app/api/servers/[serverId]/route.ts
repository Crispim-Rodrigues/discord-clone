import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: {params: {serverId: string}}
){
    try {
        const profile = await currentProfile();
        const { name, ImageUrl } = await req.json();
        if(!profile) return new NextResponse("Unauthorized", { status: 401 });

        const server = await db.server.update({
            where: {
                id: params.serverId,
            },
            data: {
                name,
                ImageUrl,
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}