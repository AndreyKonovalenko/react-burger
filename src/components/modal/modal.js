import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeKey } from '../hooks/use-escape-key';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ModelOverlay from './model-overlay/model-overlay';

import styles from './modal.module.css';

const Modal = ({ onClose, ingredient }) => {
  useEscapeKey(onClose);
  useEffect(() => {
    document.body.classList.add(styles.hideOverflowInBody);
    return () => {
      document.body.classList.remove(styles.hideOverflowInBody);
    };
  }, []);

  const modal = (
    <>
      <div className={`${styles.container} p-10`}>
        <div className={styles.info}>
          <div>
            <p className='text text_type_main-large'>Детали ингредиета</p>
          </div>
          <div onClick={onClose} className={styles.backDoor}>
            <CloseIcon type='primary' />
          </div>
        </div>
        <IngredientDetails ingredient={ingredient} />
      </div>
      <ModelOverlay onClose={onClose} />
    </>
  );
  return createPortal(modal, document.body);
};

export default Modal;
