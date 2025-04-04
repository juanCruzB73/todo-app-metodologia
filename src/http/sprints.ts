import { addSprintController, deleteSprintController, getSprintByIdController, getSprintsController,updateSprintController } from "../data/sprintsController";
import { ISprint } from "../types/pop-ups/sprints/ISprint";

export const getSprints=async()=>{  
    try{   
        return await getSprintsController();
    }catch(error){
        console.error(error);
    }
};
export const getSprintById=async(sprintId:string)=>{  
    try{   
        return await getSprintByIdController(sprintId);
    }catch(error){
        console.error(error);
    }
};
export const addSprint=async(sprintIn:ISprint)=>{
    try{    
        return await addSprintController(sprintIn);
    }catch(error){
        console.error(error);
    }
};
export const updateSprint=async(sprintIn:ISprint)=>{
    try{    
        return await updateSprintController(sprintIn);
    }catch(error){
        console.error(error);
    }
};
export const deleteSprint=async(sprintId:string)=>{
    try{    
        return await deleteSprintController(sprintId);
    }catch(error){
        console.error(error);
    }
};