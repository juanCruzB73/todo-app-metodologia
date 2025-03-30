import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Itask } from "../types/pop-ups/sprints/ITask";

interface ITaskStore {
  tasks: Itask[];
  activeTask: Itask|null;
  setActiveTask:(activeTask:Itask|null)=>void;
  
}

export const taskStore  = create<ITaskStore>()(
  devtools(
    (set) => ({
      tasks: [],
      activeTask: null,
      setActiveTask: (activeTaskIn)=>set(()=>({activeTask: activeTaskIn})),
    }),
    { name: "taskStore" }
  )
);

