import connectToDB from "@/src/database";
import Account from "@/src/models/Account";
import { NextResponse } from "next/server"; 

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        const getAllAccounts = await Account.find({ uid: id });

        return NextResponse.json({
            success: true,
            data: getAllAccounts
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong !!"
        });
    }
}