import { connect } from '@/dbconfig/db';
import User from '@/model/Users';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import Task from '@/model/Task';
import { getDataFromToken } from '@/app/helper/getDataFromToken';

connect();

export async function POST(req) {
    try {
        const userId = await getDataFromToken(req)
        const reqBody = await req.json()
        console.log(reqBody);
        const {taskTitle, taskContent} = reqBody;
        if (!userId || !taskTitle || !taskContent) {
            return NextResponse.json({error:"Every fields are  required",success: false})
        }

        const isUserIsValid = await User.findById(userId)

        if (!isUserIsValid) {
            return NextResponse.json({error:"User Does not exists",success: false})
        }

        const newTask = new Task({
            userId,
            taskTitle,
            taskContent
        })
        const savedTask = await newTask.save();
        return NextResponse.json({message:"New Task added successfully",task:savedTask, success: true},{status:201}) 
 
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"Error during adding task"});
    }
  }

//   fetch task data 

export async function GET(req) {
    try {
        const userId = await getDataFromToken(req)
        const taskData = await Task.find({userId:userId}).sort({ createdAt: -1 })
        return NextResponse.json({taskData:taskData})
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"Error during fetching task"});
    }
   
  }

//   delete taskData

export async function DELETE(req) {
    try {
        const reqBody = await req.json()
        const {taskId} = reqBody;

      const id = await getDataFromToken(req);
      const userId = await User.findById(id);
  
      if (!userId) {
        return NextResponse.json({ error: "Invalid User", success: false });
      }
  
      const taskData = await Task.findByIdAndDelete(taskId);
      if (!taskData) {
        return NextResponse.json({ error: "Unable to delete task", success: false });
      }
  
      return NextResponse.json({ message: "Task deleted successfully", success: true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: `Error during deleting task: ${error.message}`, success: false });
    }
  }
  