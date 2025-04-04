import { ISprint } from "../types/pop-ups/sprints/ISprint";
import { sprintStore } from "../store/SprintStore";
import { v4 as uuidv4 } from 'uuid';

const API_URL = import.meta.env.VITE_SPRINTS_URL;
console.log(API_URL)

export const getSprintsController=async()=>{
    const response = await fetch(API_URL);
    const data = await response.json();
    return sprintStore.getState().setSprints(data.sprints)
};
export const getSprintByIdController=async(sprintId:string)=>{
    const response = await fetch(API_URL);
    let data = await response.json();
    data = data.sprints.filter((sprint:ISprint)=>sprint.id===sprintId);
    return data;
};
export const addSprintController = async(sprintIn:ISprint)=>{
    try {
        const id = uuidv4();
        const response = await fetch(API_URL);
        const data = await response.json();
        sprintIn={...sprintIn,id:id};
        data.sprints.push(sprintIn);
        await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
        return sprintStore.getState().setAddNewSprint(sprintIn);
    } catch (error) {
        console.error(error);
    }
};
export const updateSprintController = async(sprintIn:ISprint)=>{
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        data.sprints = data.sprints.map((sprint:ISprint)=>sprint.id===sprintIn.id?sprintIn:sprint);
        await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
        return sprintStore.getState().setUpdateSprint(sprintIn);
    } catch (error) {
      console.error(error);
    }
};
export const deleteSprintController = async(sprintId:string)=>{
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        data.sprints = data.sprints.filter((sprint:ISprint)=>sprint.id!==sprintId);
        await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
        if(sprintStore.getState().activeSprint?.id == sprintId) sprintStore.getState().setActiveSprint(null);
        return sprintStore.getState().setDeleteSprint(sprintId);
    } catch (error) {
       console.error(error) 
    }
};