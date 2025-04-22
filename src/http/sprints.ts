import { ISprint } from "../types/pop-ups/sprints/ISprint";
import { sprintStore } from "../store/SprintStore";
import { addSprintController, deleteSprintController, getSprintByIdController, getSprintsController,updateSprintController } from "../data/sprintsController";


const API_URL = import.meta.env.VITE_SPRINTS_URL;

export const getSprints=async()=>{  
    try{   
        const response = await fetch(API_URL);
        const data = await response.json();
        return sprintStore.getState().setSprints(data.sprints);
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