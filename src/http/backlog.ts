import { addBacklogController, deleteBacklogController, getBacklogsController, updateBacklogController } from "../data/backlogsController";
import { Itask } from "../types/pop-ups/sprints/ITask";

export const getBacklogs=async()=>{  
    try{   
        return await getBacklogsController();
    }catch(error){
        console.error(error);
    }
};

export const addBacklog=async(backlogIn:Itask)=>{  
    try{   
        return await addBacklogController(backlogIn);
    }catch(error){
        console.error(error);
    }
};

export const updateBacklog=async(backlogIn:Itask)=>{  
    try{   
        return await updateBacklogController(backlogIn);
    }catch(error){
        console.error(error);
    }
};

export const deleteBacklog=async(backlogId:string)=>{  
    try{   
        return await deleteBacklogController(backlogId);
    }catch(error){
        console.error(error);
    }
};