import styles from './taskCard.module.css';
import { IoEye } from "react-icons/io5";
import { HiPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { Itask } from '../../../types/pop-ups/sprints/ITask';
import { FC } from 'react';
import { taskStore } from '../../../store/TaskStore';
import { popUpStore } from '../../../store/PopUpsStore';
import { deleteTask } from '../../../http/tasks';
import Swal from 'sweetalert2';

interface ITaskCard{
  task:Itask
}

export const TaskCard:FC<ITaskCard> = ({task}) => {
  const setActiveTask = taskStore((state) => (state.setActiveTask));
    const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
  
    const handleTogglePopUp = (popUpName: string) => {
      setChangePopUpStatus(popUpName); 
    };
    const handleDelete=async()=>{
      Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
          }).then(async (result) => { 
            if (result.isConfirmed) {
              if(task.id) await deleteTask(task.id);
              Swal.fire('Deleted!', 'The Task has been removed.', 'success');
            }
          });
    }

  return (
    <div className={styles.taskCardContainer}>
      <div className={styles.taskCardTitle}><h3>{task.title}</h3></div>
      <div className={styles.taskCardButtonsContainer}>
        <button style={{color:"white"}} onClick={()=>{setActiveTask(task);handleTogglePopUp("seetask")}}><IoEye /></button>
        <button style={{color:"white"}} onClick={()=>{setActiveTask(task);handleTogglePopUp("createedittask")}}><HiPencil /></button>
        <button style={{color:"rgba(233, 11, 11, 0.747) "}} onClick={()=>handleDelete()}><FaRegTrashAlt />   </button>
      </div>
    </div>
  )
}
