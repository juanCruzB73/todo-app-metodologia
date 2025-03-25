import styles from './taskCard.module.css';
import { IoEye } from "react-icons/io5";
import { HiPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";



export const TaskCard = () => {
  return (
    <div className={styles.taskCardContainer}>
      <div className={styles.taskCardTitle}><h3>task name</h3></div>
      <div className={styles.taskCardButtonsContainer}>
        <button style={{color:"white"}}><IoEye /></button>
        <button style={{color:"white"}}><HiPencil /></button>
        <button style={{color:"rgba(233, 11, 11, 0.747) "}}><FaRegTrashAlt />   </button>
      </div>
    </div>
  )
}
