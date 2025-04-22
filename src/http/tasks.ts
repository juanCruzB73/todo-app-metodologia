import { addTaskController, deleteTaskController, getTaskController, updateTaskController } from "../data/taskController";
import { sprintStore } from "../store/SprintStore";
import { Itask } from "../types/pop-ups/sprints/ITask";

const API_URL = import.meta.env.VITE_SPRINTS_URL;

export const getTasksBySprint=async(idSprint:string)=>{  
    try{
        //http://localhost:3000/api/sprints/6801859783fbc8949ddd92fc/tasks
        const response = await fetch(`API_URL/${idSprint}/tasks`);
        const data = await response.json();
        return sprintStore.getState().setSprints(data.sprints.sprintTasks);
    }catch(error){
        console.error(error);
    }
};
export const addTask=async(taskIn:Itask)=>{  
    try{   
        return await addTaskController(taskIn);
    }catch(error){
        console.error(error);
    }
};
export const updateTask=async(taskIn:Itask)=>{  
    try{   
        return await updateTaskController(taskIn);
    }catch(error){
        console.error(error);
    }
};
export const deleteTask=async(taskId:string)=>{  
    try{   
        return await deleteTaskController(taskId);
    }catch(error){
        console.error(error);
    }
};