import { connect } from '@/dbconfig/db';
import User from '@/model/Users';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json({ error: "All fields are required",success:false});
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Email is invalid",success:false});
    }

    // Compare the provided plaintext password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Email or password wrong",success:false});
    }

    const tokenData = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({
      message: "Login successful",
      token: token,
      success: true,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error:"An error occurred during authentication" },{error});
  }
}