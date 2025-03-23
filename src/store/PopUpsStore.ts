import { create } from "zustand";
import { devtools } from "zustand/middleware"; // Import devtools middleware
import { IPopUp } from "../types/pop-ups/IPopUp";

interface IPopUpStore {
  popUps: IPopUp[];
  setChangePopUpStatus: (popUpName: string) => void;
}

export const popUpStore = create<IPopUpStore>(
  devtools(
    (set) => ({
      //variables
      popUps: [{ name: "hamburgerbutton", popUpState: false }],

      // Methods 
      setChangePopUpStatus: (popUpNameIn) =>
        set((state) => {
          const popUpArray = state.popUps.map((popUp) =>popUp.name === popUpNameIn ? { ...popUp, popUpState: !popUp.popUpState } : popUp);
          return { popUps: popUpArray };
        }),
    }),
    { name: "popUpStore" }
  )
);
