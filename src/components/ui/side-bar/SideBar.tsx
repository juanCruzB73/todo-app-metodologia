import { FC } from 'react';
import styles from './sideBar.module.css';
import { FaPlus } from "react-icons/fa";
import { SideBarCard } from '../side-bar-card/SideBarCard';
import { FaBookOpen } from "react-icons/fa";

interface ISideBar{
  sidebarStatus:boolean;
}

export const SideBar:FC<ISideBar> = ({sidebarStatus}) => {
  return (
    <div className={sidebarStatus? styles.sideBarMainContainer:styles.sideBarMainContainerNotShow}>
      <div className={styles.sideBarContainer}>
      <button>Backlogs <FaBookOpen /></button>
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