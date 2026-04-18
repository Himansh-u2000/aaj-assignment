import React, { useState } from 'react';
import ShipmentDetails from './ShipmentDetails';
import AddressCard from './AddressCard';
import PackageSection from './PackageSection';
import PackageModal from './PackageModal';
import AlertModal from '../UI/AlertModal/AlertModal';
import Button from '../UI/Button/Button';
import { FiUpload, FiDownload } from 'react-icons/fi';
import styles from './OrderForm.module.css';

const OrderForm = ({ orderState, setOrderState }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleConsignorChange = (data) => setOrderState({ ...orderState, consignor: data });
  const handleConsigneeChange = (data) => setOrderState({ ...orderState, consignee: data });

  const validate = () => {
    const errors = [];
    const { shipmentDate, consignor, consignee, packages } = orderState;

    if (!shipmentDate) errors.push('Shipment Date is required.');
    if (!consignor.name.trim()) errors.push('Sender Name is required.');
    if (!consignor.address.trim()) errors.push('Sender Address is required.');
    if (!consignor.city.trim()) errors.push('Sender City is required.');
    if (!consignor.pincode.trim()) errors.push('Sender Pincode is required.');
    if (!consignee.name.trim()) errors.push('Receiver Name is required.');
    if (!consignee.address.trim()) errors.push('Receiver Address is required.');
    if (!consignee.city.trim()) errors.push('Receiver City is required.');
    if (!consignee.pincode.trim()) errors.push('Receiver Pincode is required.');
    if (packages.length === 0) errors.push('At least one package is required.');

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowErrorModal(true);
      return;
    }
    setValidationErrors([]);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset all fields after successful submission
      setOrderState({
        orderId: 'AAJ - ' + Math.floor(10000 + Math.random() * 90000) + ' - XT',
        shipmentDate: '',
        deliveryType: 'Standard',
        consignor: { name: '', address: '', city: '', pincode: '' },
        consignee: { name: '', address: '', city: '', pincode: '' },
        packages: [],
        isFragile: false,
        isInsured: false,
      });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const handleOpenAddModal = () => { setEditingPackage(null); setShowModal(true); };
  const handleOpenEditModal = (pkg) => { setEditingPackage(pkg); setShowModal(true); };
  const handleCloseModal = () => { setShowModal(false); setEditingPackage(null); };

  const handleSavePackage = (pkg) => {
    if (editingPackage) {
      setOrderState({ ...orderState, packages: orderState.packages.map(p => p.id === pkg.id ? pkg : p) });
    } else {
      setOrderState({ ...orderState, packages: [...orderState.packages, pkg] });
    }
    handleCloseModal();
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

        <PackageSection
          orderState={orderState}
          setOrderState={setOrderState}
          onAddPackage={handleOpenAddModal}
          onEditPackage={handleOpenEditModal}
        />

        <div className={styles.submitRow}>
          <Button type="submit" variant="primary" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (
              <span className={styles.loader}></span>
            ) : isSuccess ? (
              <span className={styles.successText}>Order Submitted ✓</span>
            ) : (
              'Submit Order'
            )}
          </Button>
        </div>
      </form>

      {showModal && (
        <PackageModal
          initialData={editingPackage}
          onSave={handleSavePackage}
          onClose={handleCloseModal}
        />
      )}

      {showErrorModal && (
        <AlertModal
          title="Please fix the following before submitting"
          items={validationErrors}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
};

export default OrderForm;
