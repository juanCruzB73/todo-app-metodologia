import { popUpStore } from '../../../store/PopUpsStore';
import { BacklogCard } from '../../ui/backlog-card/BacklogCard';
import { NavBar } from '../../ui/nav-bar/NavBar';
import { SideBar } from '../../ui/side-bar/SideBar';
import styles from './backlogScreen.module.css';

export const BackogsScreen = () => {
  const popUps = popUpStore((state)=>(state.popUps));
  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
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
            <button type='button' onClick={()=>handleTogglePopUp("createedittask")}>Añadir tarea</button>
          </div>
          <div className={styles.springScreenListTaskContainer}>
            <div className={styles.springScreenListTask}>
              <BacklogCard/>
              <BacklogCard/>
              <BacklogCard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
