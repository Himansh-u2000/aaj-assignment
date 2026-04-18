import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({ className = '', hasError, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`${styles.input} ${hasError ? styles.error : ''} ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
