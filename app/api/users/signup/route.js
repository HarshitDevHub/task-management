import { connect } from '@/dbconfig/db';
import User from '@/model/Users';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(req) {
    try {
        const reqBody = await req.json()

        const {name, email, password}= reqBody
        if (!name || !email || !password) {
            return NextResponse.json({error:"Every fields required"},{status:400})
        }

        const isEmailExists = await User.findOne({email});

        if(isEmailExists){
            return NextResponse.json({error:"User already exists",success:false},{status:201})
        }

        // hash password

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashpassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser)

        return NextResponse.json({message:"Account created successfully",success:true}, {status:201})
    } catch (error) {
        console.log("Internal server error")
        console.log('Error in signup:',error);
    }
}