import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ISprint } from "../types/pop-ups/sprints/ISprint";

interface ISprintStore {
  sprints: ISprint[];
  activeSprint: ISprint|null;
  setActiveSprint:(activeSprint:ISprint|null)=>void;
  setSprints:(SprintArray:ISprint[])=>void;
  setAddNewSprint:(newSprint:ISprint)=>void;
}

export const sprintStore  = create<ISprintStore>()(
  devtools(
    (set) => ({
      sprints: [],
      activeSprint: null,
      setActiveSprint: (activeSprintIn)=>set(()=>({activeSprint: activeSprintIn})),
      setSprints: (sprintsIn)=>set(()=>({sprints:sprintsIn})),
      setAddNewSprint:(sprintsIn)=>set(((state)=>({sprints:[...state.sprints,sprintsIn]})))
    }),
    { name: "sprintStore" }
  )
);

