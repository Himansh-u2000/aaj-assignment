import React, { useState } from 'react';
import ShipmentDetails from './ShipmentDetails';
import AddressCard from './AddressCard';
import PackageSection from './PackageSection';
import Button from '../UI/Button/Button';
import { FiUpload, FiDownload } from 'react-icons/fi';
import styles from './OrderForm.module.css';

const OrderForm = ({ orderState, setOrderState }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConsignorChange = (data) => setOrderState({ ...orderState, consignor: data });
  const handleConsigneeChange = (data) => setOrderState({ ...orderState, consignee: data });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // It is just for UI purpose
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log('Submitting order:', orderState);


      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
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
          <Button type="submit" variant="primary" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (
              <span className={styles.loader}></span>
            ) : isSuccess ? (
              <span className={styles.successText}>Order Submitted ✓</span>
            ) : (
              "Submit Order"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
