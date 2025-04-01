import styles from './backlockCard.module.css';
import { BsBoxes } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { HiPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { popUpStore } from '../../../store/PopUpsStore';
import React, { FC, useState } from 'react';
import { Itask } from '../../../types/pop-ups/sprints/ITask';
import { backlogStore } from '../../../store/BacklogStore';
import { deleteBacklog } from '../../../http/backlog';
import { sprintStore } from '../../../store/SprintStore';
import { ISprint } from '../../../types/pop-ups/sprints/ISprint';
import { getSprintById, updateSprint } from '../../../http/sprints';

interface IBacklogCard{
  backlog:Itask
}

export const BacklogCard:FC<IBacklogCard> = ({backlog}) => {

  const [sentTo,setSendTo]=useState(false);
  const [selectOption,setSelectOption]=useState("");

  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
  const setActiveBacklogs = backlogStore((state) => (state.setActiveBacklogs));
  const sprints = sprintStore((state) => (state.sprints));

  const handleTogglePopUp = (popUpName: string) => {
    setChangePopUpStatus(popUpName); 
  };

  const handleDelete=async(id:string)=>{
    deleteBacklog(id);
  }

  const handleMoveBacklog=async(sprintId:string)=>{
    const sprint=await getSprintById(sprintId);
    appenBacklog(sprint)
    await updateSprint(sprint[0]);
    backlog.id&&await deleteBacklog(backlog.id);
  }
  const appenBacklog=(sprint:ISprint[])=>{
    sprint[0].tasks.push(backlog);
    return sprint;
  }

  const handleSelectOption=async(event:React.ChangeEvent<HTMLSelectElement>)=>{
    const value=event.target.value;
    if (value=="") return
    setSelectOption(value);
    console.log(selectOption);
    await handleMoveBacklog(value)    
  }

  return (
    <div className={styles.backlogCardMainContainer}>
      <h3>{backlog.title}</h3>
      <div className={styles.backlogCardMainContainerButtons}>
        <select name="selectOption" value={selectOption} onChange={handleSelectOption}  className={sentTo?styles.backlockCardSelect:styles.backlockCardSelectNotShow}>
          <option value="">Select Sprint</option>
            {
              sprints.map((sprint:ISprint)=>(
                <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
              ))
            }
          </select>
        <button type='button' style={{backgroundColor:"white",border:"none",borderRadius:".5rem"}} onClick={()=>setSendTo(!sentTo)}>{!sentTo?"Sent to...":"Cancel"} <BsBoxes /></button>
        <button type='button' style={{color:"white"}}><IoEye /></button>
        <button type='button' onClick={()=>{handleTogglePopUp("createeditbacklog");setActiveBacklogs(backlog)}} style={{color:"white"}}><HiPencil /></button>
        <button type='button' style={{color:"rgba(233, 11, 11, 0.747) "}} onClick={()=>{backlog.id&&handleDelete(backlog.id)}}><FaRegTrashAlt /></button>
      </div>
    </div>
  )
}
