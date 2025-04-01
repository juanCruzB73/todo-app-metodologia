import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Itask } from "../types/pop-ups/sprints/ITask";

interface IBacklogStore {
  backlogs: Itask[];
  activeBacklog: Itask|null;
  setActiveBacklogs:(activeSprint:Itask|null)=>void;
  setBacklogs:(SprintArray:Itask[])=>void;
  setAddNewBacklogs:(newSprint:Itask)=>void;
  setUpdateBacklogs:(newSprint:Itask)=>void;
  setDeleteBacklogs:(sprintId:string)=>void;
}

export const backlogStore  = create<IBacklogStore>()(
  devtools(
    (set) => ({
      backlogs: [],
      activeBacklog: null,
      setActiveBacklogs: (activeBacklog)=>set(()=>({activeBacklog: activeBacklog})),
      setBacklogs: (backlogIn)=>set(()=>({backlogs:backlogIn})),
      setAddNewBacklogs:(backlogIn)=>set(((state)=>({backlogs:[...state.backlogs,backlogIn]}))),
      setUpdateBacklogs:(backlogIn)=>set((state)=>{
        const backlogArr=state.backlogs.map((backlog:Itask)=>backlog.id===backlogIn.id?backlogIn:backlog);
        return {backlogs:backlogArr};
      }),
      setDeleteBacklogs:(backlogIn)=>set((state)=>{
        const sprintArr=state.backlogs.filter((sprint:Itask)=>sprint.id!==backlogIn);
        return {backlogs:sprintArr};
      })
    }),
    { name: "backlogStore" }
  )
);

