import { FC, FormEvent, useEffect, useState } from 'react';
import styles from './createUpdate.module.css';
import { popUpStore } from '../../../../store/PopUpsStore';
import { useForm } from '../../../../hooks/useForm';
import { ISprint } from '../../../../types/pop-ups/sprints/ISprint';
import { sprintStore } from '../../../../store/SprintStore';
import { addSprint, updateSprint } from '../../../../http/sprints';
import Swal from 'sweetalert2';

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
  const setActiveSprint  = sprintStore((state) => (state.setActiveSprint ));
    
  const handleTogglePopUp = (popUpName: string) => {
    setChangePopUpStatus(popUpName); 
  };
  const [initialStateEdit,setInitialStateEdit]=useState<ISprint>({
    name:activeSprint?activeSprint.name:"",
    beginLine:activeSprint?activeSprint.beginLine:"",
    deadLine:activeSprint?activeSprint.deadLine:"",
    tasks:activeSprint?activeSprint.tasks:[]
  });

  const {name,beginLine,deadLine,onInputChange,onResetForm}=useForm<ISprint>(initialStateEdit);

  const handleCrate=async()=>{
    try{
      const data={name,beginLine,deadLine,tasks:[]}
      await addSprint(data);
    }catch(err){
      console.error(err);
    }
  };

  const handleUpdate=async()=>{
    try{
      const data:ISprint={id:activeSprint!.id,name,beginLine,deadLine,tasks:activeSprint!.tasks}
      await updateSprint(data);
    }catch(err){
      console.error(err);
    }
  };

  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault();
    Swal.fire({
                      title: 'Do you want to submit this?',
                      text: 'continue?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, submit it!',
                      cancelButtonText: 'Cancel'
                  }).then(async(result)=>{
                      if (result.isConfirmed){
                        if(!activeSprint){
                          await handleCrate();
                          Swal.fire('Done!', 'The Sprint has been added.', 'success');
                        }else{
                          Swal.fire('Done!', 'The Sprint has been added.', 'success');
                          await handleUpdate();
                        }
                        handleTogglePopUp("createeditsprint");
                      }
                  });
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
            <button type='button' onClick={() => {handleTogglePopUp("createeditsprint");setActiveSprint(null);onResetForm();}}>cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}