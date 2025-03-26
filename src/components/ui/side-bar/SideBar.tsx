import { FC, useEffect, useState } from 'react';
import styles from './sideBar.module.css';
import { FaPlus } from "react-icons/fa";
import { SideBarCard } from '../side-bar-card/SideBarCard';
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { popUpStore } from '../../../store/PopUpsStore';
import { CreateUpdate } from '../modals/create-update-sprint/CreateUpdate';

interface ISideBar{
  sidebarStatus:boolean;
}

export const SideBar:FC<ISideBar> = ({sidebarStatus}) => {

  const navigate=useNavigate();
  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));

  const popUps = popUpStore((state)=>(state.popUps));

  const handleTogglePopUp = (popUpName: string) => {
    setChangePopUpStatus(popUpName); 
  };

  return (
    <div className={sidebarStatus? styles.sideBarMainContainer:styles.sideBarMainContainerNotShow}>
      <CreateUpdate modalStatus={popUps[1].popUpState} />
      <div className={styles.sideBarContainer}>
      <button onClick={()=>{navigate('/backlogs')}}>Backlogs <FaBookOpen style={{marginLeft:"10px"}}/></button>
        <div className={styles.sideBarTitle}>
          <h2>Your sprints</h2>
          <h3 onClick={() => {handleTogglePopUp("createeditsprint")}}><FaPlus /></h3>
        </div>
        <div className={styles.sideBarListContent}>
            <SideBarCard modalOperation={handleTogglePopUp}/>
            <SideBarCard modalOperation={handleTogglePopUp}/>
            <SideBarCard modalOperation={handleTogglePopUp}/>
        </div>
      </div>
    </div>
  )
}