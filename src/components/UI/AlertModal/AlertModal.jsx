import React from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import Button from '../Button/Button';
import styles from './AlertModal.module.css';

const AlertModal = ({ title = 'Please fix the following', items = [], onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.modalHeader}>
          <div className={styles.titleRow}>
            <FiAlertCircle className={styles.alertIcon} />
            <h3 className={styles.modalTitle}>{title}</h3>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <ul className={styles.errorList}>
            {items.map((item, i) => (
              <li key={i} className={styles.errorItem}>
                <span className={styles.dot}></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.modalFooter}>
          <Button type="button" variant="primary" onClick={onClose}>
            Got it
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AlertModal;
