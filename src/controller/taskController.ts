import { sprintStore } from "../store/SprintStore";
import { ISprint } from "../types/pop-ups/sprints/ISprint";
import { Itask } from "../types/pop-ups/sprints/ITask";
import { v4 as uuidv4 } from 'uuid';

const API_URL = "http://localhost:3000/sprintList";

export const getTaskController=async()=>{
    const response = await fetch(API_URL);
    const data = await response.json();
    return sprintStore.getState().setSprints(data.sprints)
};

export const addTaskController=async(taskIn:Itask)=>{
    const id = uuidv4();
    const response = await fetch(API_URL);
    const data = await response.json();
    taskIn={...taskIn,id:id};
    data.sprints.forEach((sprint: ISprint)=>{
        if (sprint.id === sprintStore.getState().activeSprint?.id) {
            sprint.tasks.push(taskIn);
            sprintStore.getState().setUpdateSprint(sprint);
            sprintStore.getState().setActiveSprint(sprint);
        }
    });
    await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
};
export const updateTaskController=async(taskIn:Itask)=>{
    const response = await fetch(API_URL);
    const data = await response.json();
    data.sprints.forEach((sprint: ISprint)=>{
        if (sprint.id === sprintStore.getState().activeSprint?.id) {
            sprint.tasks=sprint.tasks.map((task: Itask)=>task.id === taskIn.id ? taskIn : task);
            sprintStore.getState().setUpdateSprint(sprint);
            sprintStore.getState().setActiveSprint(sprint);
        }
    });
    return await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
};
export const deleteTaskController=async(taskId:string)=>{
    const response = await fetch(API_URL);
    const data = await response.json();
    data.sprints.forEach((sprint: ISprint)=>{
        if (sprint.id === sprintStore.getState().activeSprint?.id) {
            sprint.tasks = sprint.tasks.filter((task:Itask)=>task.id!==taskId);
            sprintStore.getState().setUpdateSprint(sprint);
            sprintStore.getState().setActiveSprint(sprint);
        }
    });
    return await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
};