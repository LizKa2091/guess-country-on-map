import { type FC, type ReactNode } from 'react';

import styles from './FormPortal.module.scss';

interface IFormPortalProps {
   isShowing: boolean;
   setIsShowing: (status: boolean) => void;
   children: ReactNode;
}

const FormPortal: FC<IFormPortalProps> = ({ isShowing, setIsShowing, children }) => {
   const appContainer = document.querySelector('.app-container');

   const handleClose = () => {
      setIsShowing(false);
   }

   if (!appContainer || !children || !isShowing) return null;

   return (
      <div className={styles.modalOverlay} onClick={handleClose}>
         <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.buttonContainer}>
               <button onClick={handleClose} className={styles.closeButton}>x</button>
            </div>
            {children}
         </div>  
      </div>
   )
}

export default FormPortal;