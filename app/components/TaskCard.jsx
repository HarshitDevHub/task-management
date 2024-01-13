import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const TaskCard = ({taskData, updateTasks}) => {
  const handleDelete = async(taskId)=>{
    try {
      const response = await fetch('/api/tasks/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          updateTasks();
          toast.success(data.message)
        }else{
          toast.error(data.error)
        }

      } else {
        toast.error("Unable to delete task")

        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error during delete request:', error);
    }
  }
  return (
    <>
    {taskData.map((task)=>(
      <div className='task-box bg-slate-200 p-4 min-w-60 basis-[24%] rounded-sm max-h-60 min-h-60 relative' key={task._id}>
      <h1 className='font-bold text-lg'>{task.taskTitle}</h1>
      <p className='taskContent text-sm relative h-40 overflow-y-scroll'>{task.taskContent}</p>
      <div className='task-action mt-4 flex gap-4 items-center bottom-2 absolute'>
        <label htmlFor='delete-btn' className='flex gap-2 text-sm items-center cursor-pointer' onClick={() => handleDelete(task._id)}>
        <FontAwesomeIcon icon={faTrash} id='delete-btn'  className='w-3 text-red-600'/>
        Delete
        </label>
        <label htmlFor='complete-btn' className='flex gap-2 text-sm items-center cursor-pointer'>
        <FontAwesomeIcon icon={faCheck} id='complete-btn'  className='w-3 text-gray-600 cursor-pointer'/>
        Complete
        </label>
      </div>
    </div>
    ))}
    </>
  )
}


export default TaskCard