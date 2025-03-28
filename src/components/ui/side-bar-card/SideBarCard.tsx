import styles from './sideBarCar.module.css';
import { FaLayerGroup } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { FC, useState } from 'react';
import { ISprint } from '../../../types/pop-ups/sprints/ISprint';
import { popUpStore } from '../../../store/PopUpsStore';
import { sprintStore } from '../../../store/SprintStore';
import { deleteSprint } from '../../../http/sprints';


interface ISideBarCard{
    sprint:ISprint;
}

export const SideBarCard:FC<ISideBarCard> = ({sprint}) => {

    const [seeMore,setSeeMore]=useState(false);

    const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
    const setActiveSprint  = sprintStore((state) => (state.setActiveSprint ));
    
    const handleTogglePopUp = (popUpName: string) => {
      setChangePopUpStatus(popUpName); 
    };

    const handleDelete=async()=>{
      if(sprint.id) return await deleteSprint(sprint.id);
    }

    return (
      <div className={styles.sideBarCardMainContainer}>
        
        <div className={styles.sideBarButtons}>
            <h3><FaLayerGroup/></h3>
            <h4 style={{cursor: "pointer"}} onClick={()=>setActiveSprint(sprint)}>{sprint.name}</h4>
            <h3 onClick={()=>setSeeMore(!seeMore)}><FaArrowDown style={{cursor: "pointer"}}/></h3>
        </div>
        <div className={seeMore?styles.sideBarCardSeeMore:styles.sideBarCardhideMore}>
            <div className={styles.sideBarCardDateInfo}>
                <span>Start: {sprint.beginLine}</span>
                <span>Final: {sprint.deadLine}</span>
            </div>
            <div className={styles.sideBarSeeMoreButtons}>
                <HiPencil style={{cursor:"pointer"}} onClick={()=>{setActiveSprint(sprint);handleTogglePopUp("createeditsprint")}}/>
                <FaRegTrashAlt onClick={handleDelete} style={{color:"rgba(233, 11, 11, 0.747)",cursor:"pointer"}}/>
            </div>
        </div>
      </div>
    )
}
