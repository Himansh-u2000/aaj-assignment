import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = React.forwardRef(({ label, className = '', ...props }, ref) => {
  return (
    <label className={`${styles.wrapper} ${className}`}>
      <input
        type="checkbox"
        ref={ref}
        className={styles.input}
        {...props}
      />
      <span className={styles.checkbox}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
