import connectToDB from "@/src/database";
import Account from "@/src/models/Account";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server"; 

export const dynamic = "force-dynamic"

export async function POST(req) {
    try {
        await connectToDB()

        const {pin, name,  accountId, uid} = await req.json()

        const getCurrentAccount = await Account.findOne({_id : accountId, uid, name})

        if(!getCurrentAccount){
            return NextResponse.json({
                success: false,
                message: "Account not found"
            })
        }

        const checkPin = await compare(pin, getCurrentAccount.pin)

        if(checkPin) {
            return NextResponse.json({
                success: true,
                message: `Welcome ${name} !`
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Incorrect PIN"
            })
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}