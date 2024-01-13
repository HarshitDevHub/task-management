// Import necessary modules and configurations
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const response = NextResponse.json({
      message:"Logout successfully",
      sucess: true
    })

    response.cookies.set('token', '', {httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred during logout" });
  }
}
