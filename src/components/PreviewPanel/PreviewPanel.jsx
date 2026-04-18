import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import styles from './PreviewPanel.module.css';

const PreviewPanel = ({ orderState }) => {
  const { orderId, shipmentDate, deliveryType, consignor, consignee, packages, isInsured } = orderState;

  // Formatting date
  const displayDate = shipmentDate 
    ? new Date(shipmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Pending Date';

  // Calculations
  const tCount = packages.length;
  const validPkgs = packages.filter(p => p.weight || p.value || p.name);
  
  const totalWeight = validPkgs.reduce((acc, curr) => acc + (parseFloat(curr.weight) || 0), 0);
  const totalValue = validPkgs.reduce((acc, curr) => acc + (parseFloat(curr.value) || 0), 0);

  return (
    <div className={styles.previewPanel}>
      <div className={styles.header}>
        <p className={styles.pretitle}>WAYBILL PREVIEW</p>
        <span className={styles.badge}>{deliveryType.toUpperCase()}</span>
      </div>

      <div className={styles.orderInfo}>
        <h2 className={styles.orderId}>{orderId}</h2>
        <p className={styles.date}>{displayDate}</p>
      </div>

      <div className={styles.addresses}>
        <div className={styles.addressBlock}>
          <div className={styles.circle}></div>
          <div>
            <p className={styles.addressTitle}>ORIGIN</p>
            <p className={styles.name}>{consignor.name || 'Sender Name'}</p>
            <p className={styles.subText}>
              {consignor.city || 'City'}, {consignor.pincode || 'ZIP'}
            </p>
          </div>
        </div>
        
        <div className={styles.addressBlock}>
          <div className={`${styles.circle} ${styles.circleDest}`}></div>
          <div>
            <p className={styles.addressTitle}>DESTINATION</p>
            <p className={styles.name}>{consignee.name || 'Receiver Name'}</p>
            <p className={styles.subText}>
              {consignee.city || 'City'}, {consignee.pincode || 'ZIP'}
            </p>
          </div>
        </div>
        <div className={styles.connectingLine}></div>
      </div>

      <div className={styles.manifestSection}>
        <p className={styles.manifestTitle}>MANIFEST ({tCount} ITEM{tCount !== 1 ? 'S' : ''})</p>
        
        <div className={styles.packagesList}>
          {packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className={styles.packageItem}>
              <div>
                <p className={styles.pkgName}>{pkg.name || `Package ${idx + 1}`}</p>
                <p className={styles.pkgDim}>
                  {pkg.length || 0}×{pkg.width || 0}×{pkg.height || 0} cm
                </p>
              </div>
              <div className={styles.pkgRight}>
                <p className={styles.pkgWeight}>{pkg.weight || 0} kg</p>
                <p className={styles.pkgValue}>${pkg.value || 0}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.totalsRow}>
          <div>
            <p className={styles.totalLabel}>Total Weight</p>
            <p className={styles.totalValue}>{totalWeight.toFixed(1)} <span className={styles.unit}>kg</span></p>
          </div>
          <div className={styles.textRight}>
            <p className={styles.totalLabel}>Declared Value</p>
            <p className={styles.totalValue}>${totalValue.toLocaleString()}</p>
          </div>
        </div>

        {isInsured && (
          <div className={styles.insuredBadge}>
            <span className={styles.iconOp}><FaShieldAlt /></span> Insured
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
