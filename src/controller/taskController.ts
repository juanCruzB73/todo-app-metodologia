import { sprintStore } from "../store/SprintStore";
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
    data.sprints.tasks.push(taskIn);
    await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
};
export const updateTaskController=async(taskIn:Itask)=>{
    let data = sprintStore.getState().activeSprint
    data!.tasks = data!.tasks.map((task:Itask)=>task.id===taskIn.id?taskIn:task);
    await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
    return data && sprintStore.getState().setUpdateSprint(data);
};
export const deleteTaskController=async(taskId:string)=>{
    const response = await fetch(API_URL);
    const data = await response.json();
    data.sprints.tasks = data.sprints.tasks.filter((task:Itask)=>task.id!==taskId);
    await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
    return sprintStore.getState().setSprints(data.sprints);
};