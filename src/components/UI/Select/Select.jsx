import React from 'react';
import styles from './Select.module.css';

const Select = React.forwardRef(({ options, className = '', ...props }, ref) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <select ref={ref} className={styles.select} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className={styles.icon}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
