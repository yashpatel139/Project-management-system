"use client";
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '@/context/userContext';
import { getTasksOfUser } from '@/services/userService';
import Task from './Task';
import { toast } from 'react-toastify';
import { deleteTask } from '@/services/taskService';

const ShowTasks = () => {

    const [tasks, setTasks] = useState([]);
    const context = useContext(UserContext);

    async function loadTasks(userId){
        try {
            const tasks = await getTasksOfUser(userId);  
            setTasks([...tasks].reverse());
            console.log(tasks);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(context.user){
            loadTasks(context.user?.user._id);
        }
    }, [context.user]);

    async function deleteTaskInParent(taskId){
        try {
            console.log(taskId);
            const result = await deleteTask(taskId);
            console.log(result);

            const newTasks = tasks.filter(item => item._id != taskId);
            setTasks(newTasks);

            toast.success("Your task is deleted.")
        } catch (error) {
            console.log(error);
            toast.error("Error while deleting task!!!");
        }
    }

  return (
    <div className='grid grid-cols-12 mt-3'>
        <div className='col-span-6 col-start-4'>
            <h1 className='text-3xl text-center mb-3'>Your Task's ( {tasks.length} )</h1>

            {tasks.map((task) => (
                <Task task={task} key={task._id} deleteTaskInParent={deleteTaskInParent} />
            ))}

        </div>
    </div>
  )
}

export default ShowTasks