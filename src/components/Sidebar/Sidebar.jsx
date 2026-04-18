import React from 'react';
import styles from './Sidebar.module.css';
import Button from '../UI/Button/Button';
import { 
  FiGrid, 
  FiPlusSquare, 
  FiTruck, 
  FiFileText, 
  FiHelpCircle,
  FiLogOut
} from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="AAJ Logo" className={styles.logoImage} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
        {/* Fallback mock logo if image not present */}
        <div className={styles.logoBox} style={{display: 'none'}}>
          <span className={styles.logoText}>AAJ</span>
          <div className={styles.logoLine}></div>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              <span className={styles.icon}><FiGrid /></span>
              Overview
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={`${styles.navLink} ${styles.active}`}>
              <span className={styles.icon}><FiPlusSquare /></span>
              Create Order
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              <span className={styles.icon}><FiTruck /></span>
              Tracking
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              <span className={styles.icon}><FiFileText /></span>
              Documents
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              <span className={styles.icon}><FiHelpCircle /></span>
              Support
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.bottomSection}>
        <Button variant="primary" className={styles.newShipmentBtn}>
          New Shipment
        </Button>
      </div>

      <div className={styles.footer}>
        <a href="#" className={styles.navLink}>
          <span className={styles.icon}><FiLogOut /></span>
          Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
