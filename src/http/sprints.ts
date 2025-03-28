import { addSprintController, getSprintsController } from "../controller/sprintsController";
import { ISprint } from "../types/pop-ups/sprints/ISprint";

export const getSprints=async()=>{  
    try{   
        return await getSprintsController();
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
}