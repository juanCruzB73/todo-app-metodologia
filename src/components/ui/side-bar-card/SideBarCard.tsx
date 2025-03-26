import styles from './sideBarCar.module.css';
import { FaLayerGroup } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { FC, useState } from 'react';


interface ISideBar{
    modalOperation:(popUpName:string)=>void;
}

export const SideBarCard:FC<ISideBar> = ({modalOperation}) => {
    const [seeMore,setSeeMore]=useState(false);
  
    return (
      <div className={styles.sideBarCardMainContainer}>
        
        <div className={styles.sideBarButtons}>
            <h3><FaLayerGroup/></h3>
            <h4 style={{cursor: "pointer"}}>Sprint title</h4>
            <h3 onClick={()=>setSeeMore(!seeMore)}><FaArrowDown style={{cursor: "pointer"}}/></h3>
        </div>
        <div className={seeMore?styles.sideBarCardSeeMore:styles.sideBarCardhideMore}>
            <div className={styles.sideBarCardDateInfo}>
                <span>inicio:DD-MM-YYYY</span>
                <span>final:DD-MM-YYYY</span>
            </div>
            <div className={styles.sideBarSeeMoreButtons}>
                <HiPencil style={{cursor:"pointer"}} onClick={()=>modalOperation("createeditsprint")}/>
                <FaRegTrashAlt style={{color:"rgba(233, 11, 11, 0.747)",cursor:"pointer"}}/>
            </div>
        </div>
      </div>
    )
}
