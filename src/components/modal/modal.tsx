import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEscapeKey } from '../hooks/use-escape-key';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModelOverlay from './model-overlay/model-overlay';
import {
  unSelectIngredient,
  hideOrderDetails,
} from '../../services/ui/ui-actions';
import styles from './modal.module.css';
import { getUiState } from '../../services/ui/ui-selectors';

type TModal = {
  children: JSX.Element;
  hasTitle: boolean;
};

const Modal = ({ children, hasTitle }: TModal): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingredient, orderIsShown } = useSelector(getUiState);

  const handleModalClose = useCallback(() => {
    if (ingredient) {
      dispatch(unSelectIngredient());
      navigate(-1);
    }
    orderIsShown && dispatch(hideOrderDetails());
  }, [dispatch, ingredient, orderIsShown, navigate]);

  useEscapeKey(handleModalClose);

  useEffect(() => {
    document.body.classList.add(styles.hideOverflowInBody);
    return () => {
      document.body.classList.remove(styles.hideOverflowInBody);
    };
  }, [navigate]);

  const modal = (
    <>
      <div className={`${styles.container} p-10`}>
        <div className={styles.info}>
          <div>
            <p className='text text_type_main-large'>
              {hasTitle ? 'Детали ингредиета' : null}
            </p>
          </div>
          <div onClick={handleModalClose} className={styles.backDoor}>
            <CloseIcon type='primary' />
          </div>
        </div>
        {children}
      </div>
      <ModelOverlay onClose={handleModalClose} />
    </>
  );
  return createPortal(modal, document.body);
};

export default Modal;
