import { useState } from 'react';
import AlertModal from '../UI/AlertModal/AlertModal';
import Button from '../UI/Button/Button';
import AddressCard from './AddressCard';
import styles from './OrderForm.module.css';
import PackageModal from './PackageModal';
import PackageSection from './PackageSection';
import ShipmentDetails from './ShipmentDetails';

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
            icon={<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2V0H17V2H1V2M1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1V16M3 14H9V10H3V14V14M2.05 8V8H15.95V8H2.05V8M2.05 8H15.95L15.35 5H2.65L2.05 8V8" fill="#B91B2C" />
            </svg>
            }
            data={orderState.consignor}
            onChange={handleConsignorChange}
          />
          <AddressCard
            title="Consignee (Receiver)"
            icon={<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 6H18V4H16V6V6M16 10H18V8H16V10V10M16 14H18V12H16V14V14M16 18V16H20V2H11V3.4L9 1.95V0H22V18H16V18M0 18V8L7 3L14 8V18H8V13H6V18H0V18M2 16H4V11H10V16H12V9L7 5.45L2 9V16V16M16 7V7V7V7V7V7V7V7M10 16V16V11H4V16V16V11H7H10V16V16" fill="#B91B2C" />
            </svg>
            }
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
