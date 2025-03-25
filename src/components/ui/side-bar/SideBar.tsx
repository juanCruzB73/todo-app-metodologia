import { FC } from 'react';
import styles from './sideBar.module.css';
import { FaPlus } from "react-icons/fa";
import { SideBarCard } from '../side-bar-card/SideBarCard';
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

interface ISideBar{
  sidebarStatus:boolean;
}

export const SideBar:FC<ISideBar> = ({sidebarStatus}) => {
  const navigate=useNavigate()
  return (
    <div className={sidebarStatus? styles.sideBarMainContainer:styles.sideBarMainContainerNotShow}>
      <div className={styles.sideBarContainer}>
      <button onClick={()=>{navigate('/backlogs')}}>Backlogs <FaBookOpen /></button>
        <div className={styles.sideBarTitle}>
          <h2>Your sprints</h2>
          <h3><FaPlus /></h3>
        </div>
        <div className={styles.sideBarListContent}>
            <SideBarCard/>
            <SideBarCard/>
            <SideBarCard/>
        </div>
      </div>
    </div>
  )
}