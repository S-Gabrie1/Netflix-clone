import connectToDB from "@/src/database";
import Account from "@/src/models/Account";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server"; 

export const dynamic = "force-dynamic"

export async function POST(req) {
    try {
        await connectToDB()

        const {name, pin, uid} = await req.json()

        const isAccountAlreadyExists = await Account.find({uid, name})
        const allAccounts = await Account.find({})

        if(isAccountAlreadyExists === name) {
            return NextResponse.json({
                success: false,
                message: "Please try with a different name"
            })
        }

        if(allAccounts && allAccounts.length === 4) {
            return NextResponse.json({
                success: false,
                message: "You can only add 4 accounts"
            })
        }

        const hasPin = await hash(pin, 12);

        const newlyCreatedAccount = await Account.create({
            name,
            pin: hasPin,
            uid,
        })

        if(newlyCreatedAccount) {
            return NextResponse.json({
                success: true,
                message: "Account created successfully !"
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong"
            })
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong !"
        })
    }
}