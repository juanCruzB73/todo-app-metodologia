import styles from './taskCard.module.css';
import { IoEye } from "react-icons/io5";
import { HiPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { Itask } from '../../../types/pop-ups/sprints/ITask';
import { FC } from 'react';
import { taskStore } from '../../../store/TaskStore';
import { popUpStore } from '../../../store/PopUpsStore';

interface ITaskCard{
  task:Itask
}

export const TaskCard:FC<ITaskCard> = ({task}) => {
  const setActiveTask = taskStore((state) => (state.setActiveTask));
    const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
  
    const handleTogglePopUp = (popUpName: string) => {
      setChangePopUpStatus(popUpName); 
    };

  return (
    <div className={styles.taskCardContainer}>
      <div className={styles.taskCardTitle}><h3>{task.title}</h3></div>
      <div className={styles.taskCardButtonsContainer}>
        <button style={{color:"white"}}><IoEye /></button>
        <button style={{color:"white"}} onClick={()=>{setActiveTask(task);handleTogglePopUp("createedittask")}}><HiPencil /></button>
        <button style={{color:"rgba(233, 11, 11, 0.747) "}}><FaRegTrashAlt />   </button>
      </div>
    </div>
  )
}
