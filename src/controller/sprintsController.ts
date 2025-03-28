import { ISprint } from "../types/pop-ups/sprints/ISprint";
import { sprintStore } from "../store/SprintStore";
import { v4 as uuidv4 } from 'uuid';

const API_URL = "http://localhost:3000/sprintList";

export const getSprintsController=async()=>{
    const response = await fetch(API_URL);
        const data = await response.json();
        return sprintStore.getState().setSprints(data.sprints)
}

export const addSprintController = async(sprintIn:ISprint)=>{
    try {
        const id = uuidv4();
        const response = await fetch(API_URL);
        const data = await response.json();
        sprintIn={...sprintIn,id:id};
        data.sprints.push(sprintIn)
        await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)})
        return sprintStore.getState().setAddNewSprint(sprintIn);
    } catch (error) {
        console.error(error);
    }
}
