import { backlogStore } from "../store/BacklogStore";
import { v4 as uuidv4 } from 'uuid';
import { Itask } from "../types/pop-ups/sprints/ITask";

const API_URL = import.meta.env.VITE_BACKLOG_URL;

export const getBacklogsController=async()=>{
    const response = await fetch(API_URL);
    const data = await response.json();
    return backlogStore.getState().setBacklogTasks(data.tasks);
};

export const addBacklogController=async(backlogIn:Itask)=>{
    try{
        const id = uuidv4();
        const response = await fetch(API_URL);
        const data = await response.json();
        backlogIn={...backlogIn,id:id};
        data.tasks.push(backlogIn);
        await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
        return backlogStore.getState().setAddNewBacklogTasks(backlogIn);
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
        return backlogStore.getState().setUpdateBacklogTasks(backlogIn);
    } catch (error) {
        
    }
};

export const deleteBacklogController = async(backlogId:string)=>{
    try {
            const response = await fetch(API_URL);
            const data = await response.json();
            data.tasks = data.tasks.filter((backlog:Itask)=>backlog.id!==backlogId);
            await fetch(API_URL,{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)});
            return backlogStore.getState().setDeleteBacklogTasks(backlogId);
    } catch (error) {
        console.error(error) 
    }
};
