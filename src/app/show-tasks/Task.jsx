import UserContext from '@/context/userContext'
import React, { useContext } from 'react'
import { RxCross1 } from "react-icons/rx"

const Task = ({task, deleteTaskInParent}) => {

    const { user } = useContext(UserContext);

    function deleteTask(taskId){

        deleteTaskInParent(taskId);

    }

  return (
    <div className={ `shadow-lg my-2 rounded ${task.status=="completed"?"bg-green-500":"bg-gray-400"}` }>
        <div className='p-5'>
            <div className='flex justify-between'>
            <h1 className='text-2xl font-semibold'>{task.title}</h1>
            <span onClick={() => deleteTask(task._id)} className='shadow-lg bg-gray-950 hover:bg-gray-900 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer text-white'>
            <RxCross1 />
            </span>
            </div>
            <p className='font-normal'>{task.content}</p>
            <div className='flex justify-between'>
            <p className='text-left'>Status: {task.status.toUpperCase()}</p>
            <p className='text-right'>Author: {user?.user.name}</p>
            </div>
        </div>
    </div>
  )
}

export default Task