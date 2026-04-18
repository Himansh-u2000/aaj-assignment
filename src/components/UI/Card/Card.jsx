import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, className = '', title }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Card;
