import { popUpStore } from '../../../store/PopUpsStore';
import { NavBar } from '../../ui/nav-bar/NavBar';
import { SideBar } from '../../ui/side-bar/SideBar';
import { TaskCard } from '../../ui/task-card/TaskCard';
import styles from './taskScreen.module.css';

export const TaskScreen = () => {
  const popUps = popUpStore((state)=>(state.popUps));
  return (
    <div className={styles.taskScreenMainContainer}>
      <NavBar/>
      <div className={styles.taskScreenContentMainContainer}>
        <SideBar sidebarStatus={popUps[0].popUpState} />
        <div className={styles.taskScreenContent}>
            <div className={styles.taskScreenTitle}><h2>Sprint name</h2></div>
            <div className={styles.taskScreenBoardsBackground}>
              <div className={styles.taskScreenBoard}>
                <h2>TODO</h2>
                <div className={styles.taskScreenCardContainer}>
                  <TaskCard/>
                  <TaskCard/>
                  <TaskCard/>
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
