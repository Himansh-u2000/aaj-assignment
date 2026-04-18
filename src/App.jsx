import React, { useState } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import OrderForm from './components/OrderForm/OrderForm';
import PreviewPanel from './components/PreviewPanel/PreviewPanel';
import { FiBell, FiSettings, FiUser, FiMenu } from 'react-icons/fi';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orderState, setOrderState] = useState({
    orderId: 'AAJ - ' + Math.floor(10000 + Math.random() * 90000) + ' - XT',
    shipmentDate: '',
    deliveryType: 'Standard',
    consignor: { name: '', address: '', city: '', pincode: '' },
    consignee: { name: '', address: '', city: '', pincode: '' },
    packages: [],
    isFragile: false,
    isInsured: false,
  });

  return (
    <div className={styles.appContainer}>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={styles.mainContent}>
        <div className={styles.topHeader}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FiMenu />
          </button>

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
