import React from 'react';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import styles from './AddressCard.module.css';

const AddressCard = ({ title, data, onChange, icon }) => {
  const handleChange = (field) => (e) => {
    onChange({ ...data, [field]: e.target.value });
  };

  const headerTitle = (
    <span className={styles.titleWrapper}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {title}
    </span>
  );

  return (
    <Card title={headerTitle} className={styles.addressCard}>
      <div className={styles.formGroup}>
        <Label>Name / Company</Label>
        <Input 
          value={data.name} 
          onChange={handleChange('name')} 
          placeholder="Enter Name"
        />
      </div>
      <div className={styles.formGroup}>
        <Label>Address</Label>
        <Input 
          value={data.address} 
          onChange={handleChange('address')} 
          placeholder="Street Address"
        />
      </div>
      <div className={styles.row}>
        <div className={styles.half}>
          <Label>City</Label>
          <Input 
            value={data.city} 
            onChange={handleChange('city')} 
            placeholder="City"
          />
        </div>
        <div className={styles.half}>
          <Label>Pincode</Label>
          <Input 
            value={data.pincode} 
            onChange={handleChange('pincode')} 
            placeholder="ZIP"
          />
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;
