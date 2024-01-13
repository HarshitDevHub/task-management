import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Form = ({setShowForm, updateTasks }) => {
  const [formData, setFormData] = useState({taskTitle:"", taskContent:""});
  const [loading, setLoading] = useState(false);
  const [formBtn, setFormBtn] = useState(false);

  useEffect(() => {
    if (formData.taskContent.length > 0 && formData.taskTitle.length > 0) {
      setFormBtn(true)
    }
    
  }, [formData.taskContent, formData.taskTitle]);

 

  const handleFormSubmit = async(e)=>{
    e.preventDefault();
    setFormBtn(false)
    try {
      setLoading(true)
      const response = await axios.post('/api/tasks/',formData);

      if (!response.data.success) {
        toast.error(response.data.error)
      }else{
        toast.success(response.data.message)
        updateTasks();
        setShowForm(false)
      }

    } catch (error) {
      console.log('Error during adding task:',error);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="w-full max-w-xs relative">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
        <FontAwesomeIcon
          icon={faTimes}
          id="delete-btn"
          className="absolute right-2 top-2 cursor-pointer text-gray-600"
          onClick={() => setShowForm(false)}
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Task Title"
            onChange={(e)=> setFormData((data)=> ({...data, taskTitle:e.target.value}))}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            placeholder="Content Here"
            onChange={(e)=> setFormData((data)=> ({...data, taskContent:e.target.value}))}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline1 disabled:bg-blue-400`}
            type="submit"
            disabled={!formBtn}
          >
            {loading ? "Adding task ..":"Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
