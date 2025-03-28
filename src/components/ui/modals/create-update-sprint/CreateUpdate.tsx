import { FC, FormEvent } from 'react';
import styles from './createUpdate.module.css';
import { popUpStore } from '../../../../store/PopUpsStore';
import { useForm } from '../../../../hooks/useForm';
import { ISprint } from '../../../../types/pop-ups/sprints/ISprint';
import { sprintStore } from '../../../../store/SprintStore';
import { addSprint } from '../../../../http/sprints';

interface ICreateUpdate{
    modalStatus:boolean;
};

const initialState:ISprint={
    name:"",
    beginLine:"",
    deadLine:"",
    tasks:[]
};

export const CreateUpdate:FC<ICreateUpdate> = ({modalStatus}) => {

  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
  const activeSprint = sprintStore((state) => (state.activeSprint));
    
  const handleTogglePopUp = (popUpName: string) => {
    setChangePopUpStatus(popUpName); 
  };

  const {name,beginLine,deadLine,onInputChange,onResetForm}=useForm<ISprint>(initialState);

  const handleCrate=async()=>{
    try{
      const data={name,beginLine,deadLine,tasks:[]}
      await addSprint(data);
    }catch(err){
      console.error(err);
    }
  };

  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault();
    if(!activeSprint){
      await handleCrate()
    }
    handleTogglePopUp("createeditsprint");
  }

  return (
    <div className={modalStatus?styles.modalMainContainer:styles.modalMainContainerNotShow}>
      <div className={styles.modalContainer}>
        <h1>Create a sprint</h1>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <input type="text" placeholder='name' name='name' value={name} onChange={onInputChange}/>
          <input type="date" name='beginLine' value={beginLine} onChange={onInputChange}/>
          <input type="date" name='deadLine' value={deadLine} onChange={onInputChange}/>
          <div className={styles.sprintsModalButtons}>
            <button type='submit'>Submit</button>
            <button type='button' onClick={() => {onResetForm();handleTogglePopUp("createeditsprint")}}>cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}