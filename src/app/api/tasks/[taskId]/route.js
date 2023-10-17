import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { connectDB } from "@/helper/db";



//api/tasks/{taskId}
export async function GET(request, {params}) {
    try {
        const {taskId} = params;
        await connectDB();
        const task = await Task.findById(taskId);
        return NextResponse.json(task);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in getting this task", 404, false);
    }
}


export async function PUT(request, {params}) {
    try {
        const {taskId} = params;
        const {title, content, status} = await request.json();
        await connectDB();
        let task = await Task.findById(taskId);

        task.title = title;
        task.content = content;
        task.status = status;

        //....

        const updatedTask = await task.save();
        return NextResponse.json(updatedTask);

    } catch (error) {
        console.log(error);
        return getResponseMessage("Error whileupdating task", 404, false);
    }
}

export async function DELETE(request, {params}) {
    try {
        const {taskId} = params;
        await connectDB();
        await Task.deleteOne({
            _id: taskId,
        })
        return getResponseMessage("Task deleted", 200, true);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error while deleting task.", 500, false);
    }
}