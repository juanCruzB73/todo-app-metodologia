import { FC, FormEvent, useState } from 'react';
import { Itask } from '../../../../types/pop-ups/sprints/ITask';
import styles from './createUpdateTask.module.css';
import { popUpStore } from '../../../../store/PopUpsStore';
import { useForm } from '../../../../hooks/useForm';
import { addTask, updateTask } from '../../../../http/tasks';
import { taskStore } from '../../../../store/TaskStore';
import Swal from 'sweetalert2';

interface ICreateUpdateTask{
    modalStatus:boolean;
};

export const CreateUpdateTask:FC<ICreateUpdateTask> = ({modalStatus}) => {
    
    const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
    const activeTask = taskStore((state) => (state.activeTask));
    const setActiveTask = taskStore((state) => (state.setActiveTask));
    const [radiusState,setRadiusState]=useState(activeTask?activeTask.state:"todo");

    const [initialStateEdit,setInitialStateEdit]=useState({
          title:activeTask?activeTask.title:"",
          description:activeTask?activeTask.description:"",
          deadLine:activeTask?activeTask.deadLine:"",
    });

    const {title,description,deadLine,onInputChange,onResetForm}=useForm(initialStateEdit);
    
    const handleTogglePopUp = (popUpName: string) => {
        setChangePopUpStatus(popUpName); 
    };
    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRadiusState(event.target.value);
    };

    const handleCrate=async()=>{
        try{
          const data={title,description,deadLine,state:radiusState}
          await addTask(data);
        }catch(err){
          console.error(err);
        }
      };
    
      const handleUpdate=async()=>{
        try{
          const data={id:activeTask!.id,title,description,deadLine,state:radiusState}
          await updateTask(data);
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
                                if(!activeTask){
                                  await handleCrate();
                                  Swal.fire('Deleted!', 'The Task has been added.', 'success');
                                }else{
                                  await handleUpdate();
                                  Swal.fire('Deleted!', 'The Task has been updated.', 'success');
                                }
                                handleTogglePopUp("createedittask")
                              }
                          });
      }

    return (
      <div className={modalStatus?styles.taskModalMainConainer:styles.taskModalMainConainerNotShow}>
          <div className={styles.taskModalContainer}>
              <h1>Create a Task</h1>
              <form className={styles.taskModalForm} onSubmit={handleSubmit}>
                  <input type="text" name='title' value={title} onChange={onInputChange} placeholder='title'/>
                  <input type="text" name='description' value={description} onChange={onInputChange} placeholder='description' />
                  <input type="date" name='deadLine' value={deadLine} onChange={onInputChange}/>
                  <div className={styles.taskModalMainConainerRadius}>
                    <label key="todo"><input type="radio" name='radiusState' value="todo" checked={radiusState === "todo"} onChange={handleRadiusChange}/>To do</label>
                    <label key="inprogress"><input type="radio" name='radiusState' value={"inprogress"} checked={radiusState === "inprogress"} onChange={handleRadiusChange}/>In progress</label>
                    <label key="completed"><input type="radio" name='radiusState' value={"completed"} checked={radiusState === "completed"} onChange={handleRadiusChange}/>Completed</label>
                  </div>
                  <div className={styles.taskModalButtons}>
                      <button>Send</button>
                      <button type='button' onClick={() => {onResetForm();setActiveTask(null);handleTogglePopUp("createedittask")}}>cancel</button>
                  </div>    
              </form>  
          </div>
      </div>
    )
}
