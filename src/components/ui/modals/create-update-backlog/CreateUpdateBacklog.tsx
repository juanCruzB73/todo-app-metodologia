import { FC, FormEvent, useState } from 'react';
import styles from './createUpdateBacklog.module.css';
import { popUpStore } from '../../../../store/PopUpsStore';
import { useForm } from '../../../../hooks/useForm';
import { backlogStore } from '../../../../store/BacklogStore';
import { addBacklog, updateBacklog } from '../../../../http/backlog';

interface ICreateUpdateBacklog{
    modalStatus:boolean;
}

export const CreateUpdateBacklog:FC<ICreateUpdateBacklog> = ({modalStatus}) => {
  
  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
  const activeBacklog = backlogStore((state) => (state.activeBacklog));
  const setActiveBacklogs = backlogStore((state) => (state.setActiveBacklogs));

  const [initialStateEdit,setInitialStateEdit]=useState({
    title:activeBacklog?activeBacklog.title:"",
    description:activeBacklog?activeBacklog.description:"",
    deadLine:activeBacklog?activeBacklog.deadLine:"",
    state:activeBacklog?activeBacklog.state:false
  });
  
  const {title,description,deadLine,onInputChange,onResetForm}=useForm(initialStateEdit);

  const handleTogglePopUp = (popUpName: string) => {
    setChangePopUpStatus(popUpName); 
  };

  const handleCrate=async()=>{
          try{
            const data={title,description,deadLine,state:false}
            await addBacklog(data);
          }catch(err){
            console.error(err);
          }
        };
      
        const handleUpdate=async()=>{
          try{
            const data={id:activeBacklog!.id,title,description,deadLine,state:activeBacklog!.state}
            await updateBacklog(data);
          }catch(err){
            console.error(err);
          }
        };
        const handleSubmit=async(e:FormEvent)=>{
                e.preventDefault();
                if(!activeBacklog){
                  await handleCrate();
                }else{
                  await handleUpdate();
                }
                handleTogglePopUp("createeditbacklog")
              }
  
  return (
    <div className={modalStatus?styles.createUpdateBacklogMainContainer:styles.createUpdateBacklogNotShow}>
        <div className={styles.createUpdateBacklogContainer}>
          <h1>Create backlog</h1>
          <form className={styles.createeditbacklogFormContainer} onSubmit={handleSubmit}>
            <input type="text" placeholder='title' name='title' value={title} onChange={onInputChange}/>
            <input type="text" placeholder='description' name='description' value={description} onChange={onInputChange}/>
            <input type="date" name='deadLine' value={deadLine} onChange={onInputChange}/>
            <div className={styles.taskModalButtons}></div>
            <div className={styles.createeditbacklogButtonContainer}>
              <button type='submit' >submit</button>
              <button type='button' onClick={()=>{handleTogglePopUp("createeditbacklog"),setActiveBacklogs(null)}}>cancel</button>
            </div>
          </form>
        </div>
    </div>
  )
}
