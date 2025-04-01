import { useEffect } from 'react';
import { popUpStore } from '../../../store/PopUpsStore';
import { sprintStore } from '../../../store/SprintStore';
import { taskStore } from '../../../store/TaskStore';
import { Itask } from '../../../types/pop-ups/sprints/ITask';
import { NavBar } from '../../ui/nav-bar/NavBar';
import { SideBar } from '../../ui/side-bar/SideBar';
import { TaskCard } from '../../ui/task-card/TaskCard';
import styles from './taskScreen.module.css';
import { getTasks } from '../../../http/tasks';

export const TaskScreen = () => {
  const popUps = popUpStore((state)=>(state.popUps));
  const sprints = sprintStore((state) => (state.sprints));
  const activeSprint = sprintStore((state) => (state.activeSprint));
  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
  const tasks = taskStore((state) => (state.tasks));

  const handleTogglePopUp = (popUpName: string) => {
    setChangePopUpStatus(popUpName); 
  };

  useEffect(()=>{
    const getTaskToDisplay=async()=>{
      await getTasks()
    }
    if(activeSprint)getTaskToDisplay();
  },[sprints,activeSprint])

  return (
    <div className={styles.taskScreenMainContainer}>
      <NavBar/>
      <div className={styles.taskScreenContentMainContainer}>
        <SideBar sidebarStatus={popUps[0].popUpState} />
        <div className={styles.taskScreenContent}>
            <div className={styles.taskScreenTitle}>
              <h2>Sprint name</h2>
              <button onClick={()=>handleTogglePopUp("createedittask")}>Add Todo</button>
            </div>
            <div className={styles.taskScreenBoardsBackground}>
              <div className={styles.taskScreenBoard}>
                <h2>TODO</h2>
                <div className={styles.taskScreenCardContainer}>
                  {tasks.map((task:Itask)=><TaskCard task={task} key={task.id}/>)}
                </div>
              </div>
              <div className={styles.taskScreenBoard}> <h2>IN PROGRESS</h2> </div>
              <div className={styles.taskScreenBoard}><h2>COMPLETED</h2></div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
