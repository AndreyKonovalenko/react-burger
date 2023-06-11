import { useEffect, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeKey } from '../hooks/use-escape-key';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModelOverlay from './model-overlay/model-overlay';
import styles from './modal.module.css';

type TModal = {
  title?: string;
  titleStyle?: string;
  handleModalClose: () => void;
};
const Modal = ({
  handleModalClose,
  title,
  titleStyle,
  children,
}: PropsWithChildren<TModal>): JSX.Element => {
  useEscapeKey(handleModalClose);
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
            <p
              className={titleStyle ? titleStyle : 'text text_type_main-large'}>
              {title}
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
  return createPortal(modal, document.getElementById('modals')!);
};

export default Modal;
