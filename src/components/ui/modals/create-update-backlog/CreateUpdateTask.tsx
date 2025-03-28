import { FC } from 'react';
import { Itask } from '../../../../types/pop-ups/sprints/ITask';
import styles from './createUpdateTask.module.css';
import { popUpStore } from '../../../../store/PopUpsStore';
import { useForm } from '../../../../hooks/useForm';

interface ICreateUpdateTask{
    modalStatus:boolean;
};

const initialState:Itask={
    taskName:"",
    taskDescription:"",
    startLine:"",
    endLine:""
};

export const CreateUpdateTask:FC<ICreateUpdateTask> = ({modalStatus}) => {
    
    const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
    
    const handleTogglePopUp = (popUpName: string) => {
        setChangePopUpStatus(popUpName); 
    };

    const {taskName,taskDescription,startLine,endLine,onInputChange,onResetForm}=useForm<ISprint>(initialState);

    return (
    <div className={modalStatus?styles.taskModalMainConainer:styles.taskModalMainConainerNotShow}>
        <div className={styles.taskModalContainer}>
            <h1>Create a backlog</h1>
            <form className={styles.taskModalForm}>
                <input type="text" name='taskName' value={taskName} onChange={onInputChange} placeholder='taskName'/>
                <input type="text" name='taskDescription' value={taskDescription} onChange={onInputChange} placeholder='taskDescription' />
                <input type="date" name='startLine' value={startLine} onChange={onInputChange}/>
                <input type="date" name='endLine' value={endLine} onChange={onInputChange}/>
                <div className={styles.taskModalButtons}>
                    <button>Send</button>
                    <button type='button' onClick={() => {onResetForm();handleTogglePopUp("createedittask")}}>cancel</button>
                </div>    
            </form>  
        </div>
    </div>
  )
}
