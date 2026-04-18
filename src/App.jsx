import React, { useState } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import OrderForm from './components/OrderForm/OrderForm';
import PreviewPanel from './components/PreviewPanel/PreviewPanel';
import { FiBell, FiSettings, FiUser } from 'react-icons/fi';

function App() {
  const [orderState, setOrderState] = useState({
    orderId: 'AAJ - ' + Math.floor(10000 + Math.random() * 90000) + ' - XT',
    shipmentDate: '',
    deliveryType: 'Standard',
    consignor: { name: '', address: '', city: '', pincode: '' },
    consignee: { name: '', address: '', city: '', pincode: '' },
    packages: [{ id: Date.now(), name: '', weight: '', length: '', width: '', height: '', value: '', isEditable: true }],
    isFragile: false,
    isInsured: false,
  });

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        
        {/* Global Header */}
        <div className={styles.topHeader}>
          <div className={styles.headerSpacer}></div>
          <div className={styles.headerIcons}>
            <FiBell className={styles.icon} />
            <FiSettings className={styles.icon} />
            <div className={styles.avatar}>
              <FiUser />
            </div>
          </div>
        </div>

        <div className={styles.columnsWrapper}>
          <div className={styles.leftColumn}>
            <OrderForm orderState={orderState} setOrderState={setOrderState} />
          </div>
          <div className={styles.rightColumn}>
            <PreviewPanel orderState={orderState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
