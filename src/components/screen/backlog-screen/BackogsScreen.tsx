import { useEffect } from 'react';
import { backlogStore } from '../../../store/BacklogStore';
import { popUpStore } from '../../../store/PopUpsStore';
import { Itask } from '../../../types/pop-ups/sprints/ITask';
import { BacklogCard } from '../../ui/backlog-card/BacklogCard';
import { NavBar } from '../../ui/nav-bar/NavBar';
import { SideBar } from '../../ui/side-bar/SideBar';
import styles from './backlogScreen.module.css';
import { getBacklogs } from '../../../http/backlog';

export const BackogsScreen = () => {
  const popUps = popUpStore((state)=>(state.popUps));
  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
  const backlogs = backlogStore((state)=>(state.backlogTasks));
  const setActiveBacklogs = backlogStore((state)=>(state.setActiveBacklogTasks));

  useEffect(()=>{
    const displayBacklogs=async()=>{
      await getBacklogs();
    }
    displayBacklogs();
  },[backlogs])
  const handleTogglePopUp = (popUpName: string) => {
    setChangePopUpStatus(popUpName); 
  };
  return (
    <div className={styles.springScreenMainContainer}>
      <NavBar/>
      <div className={styles.springScreenContentContainer}>
        <SideBar sidebarStatus={popUps[0].popUpState} />
        <div className={styles.springScreenTaskContainer}>
          <div className={styles.springScreenTaskContainerTitles}>
            <div style={{marginRight:"2rem"}}>
              <h2>Backlogs</h2>
              <h4>Tasks in backlog</h4>
            </div>
            <button type='button' onClick={()=>{handleTogglePopUp("createeditbacklog");setActiveBacklogs(null)}}>Añadir tarea</button>
          </div>
          <div className={styles.springScreenListTaskContainer}>
            <div className={styles.springScreenListTask}>
              {backlogs.map((backlog:Itask)=>(
                <BacklogCard key={backlog._id} backlog={backlog}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
