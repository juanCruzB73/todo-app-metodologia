import { backlogStore } from "../store/BacklogStore";
import { v4 as uuidv4 } from 'uuid';
import { Itask } from "../types/pop-ups/sprints/ITask";

const API_URL = "http://localhost:3000/backlog";

export const getBacklogsController=async()=>{
    const response = await fetch(API_URL);
    const data = await response.json();
    return backlogStore.getState().setBacklogs(data.tasks);
};

export const addBacklogController=async(backlogIn:Itask)=>{
    try{
        const id = uuidv4();
        const response = await fetch(API_URL);
        const data = await response.json();
        backlogIn={...backlogIn,id:id};
        data.tasks.push(backlogIn);
        await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
        return backlogStore.getState().setAddNewBacklogs(backlogIn);
    }catch(error){
        console.error(error);
    }
};

export const updateBacklogController = async(backlogIn:Itask)=>{
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        data.tasks = data.tasks.map((backlog:Itask)=>backlog.id===backlogIn.id?backlogIn:backlog);
        await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
        return backlogStore.getState().setUpdateBacklogs(backlogIn);
    } catch (error) {
        
    }
};

export const deleteBacklogController = async(backlogId:string)=>{
    try {
            const response = await fetch(API_URL);
            const data = await response.json();
            data.tasks = data.tasks.filter((backlog:Itask)=>backlog.id!==backlogId);
            await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
            return backlogStore.getState().setDeleteBacklogs(backlogId);
    } catch (error) {
        console.error(error) 
    }
};
