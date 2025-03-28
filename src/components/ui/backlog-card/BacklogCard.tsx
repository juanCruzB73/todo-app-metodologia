import styles from './backlockCard.module.css';
import { BsBoxes } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { HiPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { popUpStore } from '../../../store/PopUpsStore';

export const BacklogCard = () => {
  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
  const handleTogglePopUp = (popUpName: string) => {
    setChangePopUpStatus(popUpName); 
  };
  
  return (
    <div className={styles.backlogCardMainContainer}>
      <h3>Task name</h3>
      <div className={styles.backlogCardMainContainerButtons}>
        <button type='button' style={{backgroundColor:"white",border:"none",borderRadius:".5rem"}}>Sent to... <BsBoxes /></button>
        <button type='button' style={{color:"white"}}><IoEye /></button>
        <button type='button' onClick={()=>handleTogglePopUp("createedittask")} style={{color:"white"}}><HiPencil /></button>
        <button type='button' style={{color:"rgba(233, 11, 11, 0.747) "}}><FaRegTrashAlt />   </button>
      </div>
    </div>
  )
}
