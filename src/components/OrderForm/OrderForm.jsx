import React from 'react';
import ShipmentDetails from './ShipmentDetails';
import AddressCard from './AddressCard';
import PackageSection from './PackageSection';
import Button from '../UI/Button/Button';
import { FiUpload, FiDownload } from 'react-icons/fi';
import styles from './OrderForm.module.css';

const OrderForm = ({ orderState, setOrderState }) => {
  const handleConsignorChange = (data) => setOrderState({ ...orderState, consignor: data });
  const handleConsigneeChange = (data) => setOrderState({ ...orderState, consignee: data });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting order:', orderState);
    alert('Order Submitted Successfully!');
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Create Order</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.formBody}>
        <ShipmentDetails orderState={orderState} setOrderState={setOrderState} />

        <div className={styles.addressRow}>
          <AddressCard 
            title="Consignor (Sender)" 
            icon={<FiUpload />}
            data={orderState.consignor} 
            onChange={handleConsignorChange} 
          />
          <AddressCard 
            title="Consignee (Receiver)" 
            icon={<FiDownload />}
            data={orderState.consignee} 
            onChange={handleConsigneeChange} 
          />
        </div>

        <PackageSection orderState={orderState} setOrderState={setOrderState} />

        <div className={styles.submitRow}>
          <Button type="submit" variant="primary" className={styles.submitBtn}>
            Submit Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
