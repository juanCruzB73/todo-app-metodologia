import { FC } from 'react';
import styles from './createUpdate.module.css';
import { popUpStore } from '../../../../store/PopUpsStore';


interface ICreateUpdate{
    modalStatus:boolean;
}

export const CreateUpdate:FC<ICreateUpdate> = ({modalStatus}) => {
  const setChangePopUpStatus = popUpStore((state) => (state.setChangePopUpStatus));
    
  const handleTogglePopUp = (popUpName: string) => {
      setChangePopUpStatus(popUpName); 
  };

  return (
    <div className={modalStatus?styles.modalMainContainer:styles.modalMainContainerNotShow}>
      <div className={styles.modalContainer}>
        <h1>this is the modal</h1>
        <button onClick={() => handleTogglePopUp("createeditsprint")}>cancel</button>
      </div>
    </div>
  )
}