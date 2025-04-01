import { addTaskController, deleteTaskController, getTaskController, updateTaskController } from "../data/taskController";
import { Itask } from "../types/pop-ups/sprints/ITask";

export const getTasks=async()=>{  
    try{   
        return await getTaskController();
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