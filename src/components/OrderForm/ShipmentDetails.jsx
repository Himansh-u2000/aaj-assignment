import React from 'react';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import Select from '../UI/Select/Select';
import styles from './ShipmentDetails.module.css';

const ShipmentDetails = ({ orderState, setOrderState }) => {
  const handleDateChange = (e) => {
    setOrderState({ ...orderState, shipmentDate: e.target.value });
  };

  const handleDeliveryChange = (e) => {
    setOrderState({ ...orderState, deliveryType: e.target.value });
  };

  return (
    <Card title="Shipment Details">
      <div className={styles.grid}>
        <div className={styles.field}>
          <Label>Order ID</Label>
          <Input value={orderState.orderId} disabled />
        </div>
        <div className={styles.field}>
          <Label>Shipment Date</Label>
          <Input 
            type="date" 
            value={orderState.shipmentDate} 
            onChange={handleDateChange} 
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div className={styles.field}>
          <Label>Delivery Type</Label>
          <Select 
            value={orderState.deliveryType} 
            onChange={handleDeliveryChange}
            options={[
              { value: 'Standard', label: 'Standard' },
              { value: 'Express', label: 'Express' }
            ]}
          />
        </div>
      </div>
    </Card>
  );
};

export default ShipmentDetails;
