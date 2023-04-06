import React from 'react';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ children, onClose }) => {
  const modal = (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.container}>
        {children}
        <div className={styles.backdoor} onClick={onClose}>
          <CloseIcon type='primary' />
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
};

export default Modal;
