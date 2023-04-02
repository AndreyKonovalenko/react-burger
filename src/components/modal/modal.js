import React from 'react';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');
class Modal extends React.Component {
  render() {
    const { children, onClose } = this.props;
    const modal = (
      <div className={styles.container}>
        {children}
        <div className={styles.backdoor} onClick={onClose}>
          <CloseIcon type='primary' />
        </div>
      </div>
    );
    return createPortal(modal, modalRoot);
  }
}
export default Modal;
