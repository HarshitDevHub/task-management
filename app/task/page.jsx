'use client'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import Form from '../components/Form';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import axios from 'axios';

const page = () => {
  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async()=>{
    try {
      const response = await axios.get('/api/tasks/')
      console.log(response)
      setTaskData(response.data.taskData)
    } catch (error) {
      
    }
  }
  const handleClick = ()=>{
    setShowForm(!showForm)
  }

  const handleFormSubmit = async () => {
    // Update tasks after form submission
    await fetchTask();
  };

  return (
    <>
    <Navbar/>
    <main className='flex gap-4 p-4 w-full flex-wrap md:justify-start justify-center'>
      {showForm && (
        <div className='form-area top-0 left-0 absolute min-h-screen  w-full bg-[#0303032c] flex justify-center items-center z-10'> 
        <Form setShowForm={setShowForm} updateTasks={handleFormSubmit}/>
        </div>
      )}
      
      <div className='task-box bg-slate-200 p-2 min-w-60 basis-[23%] rounded-sm max-h-60 min-h-60 flex justify-center items-center'>
        <span  onClick={handleClick} className='text-9xl cursor-pointer'>
          +
        </span>
      </div>
      {taskData && (
      <TaskCard taskData={taskData} updateTasks={handleFormSubmit}/>
      )}

    </main>
    </>
  )
}

export default page