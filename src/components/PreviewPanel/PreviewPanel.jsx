import React from 'react';
import { FaShieldAlt, FaWineGlass } from 'react-icons/fa';
import styles from './PreviewPanel.module.css';

const PreviewPanel = ({ orderState }) => {
  const { orderId, shipmentDate, deliveryType, consignor, consignee, packages, isInsured, isFragile } = orderState;

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
        <div className={styles.addressRow}>
          <div className={`${styles.addressCard} ${styles.fromCard}`}>
            <span className={styles.fromToLabel}>From</span>
            <p className={styles.name}>{consignor.name || 'Sender Name'}</p>
            <p className={styles.subText}>
              {[consignor.address, consignor.city, consignor.pincode].filter(Boolean).join(', ') || 'City, ZIP'}
            </p>
          </div>

          <div className={`${styles.addressCard} ${styles.toCard}`}>
            <span className={styles.fromToLabel}>To</span>
            <p className={styles.name}>{consignee.name || 'Receiver Name'}</p>
            <p className={styles.subText}>
              {[consignee.address, consignee.city, consignee.pincode].filter(Boolean).join(', ') || 'City, ZIP'}
            </p>
          </div>
        </div>

        {(isFragile || isInsured) && (
          <div className={styles.badgesRow}>
            {isFragile && (
              <div className={styles.fragileBadge}>
                <span className={styles.iconOp}><FaWineGlass /></span> Fragile
              </div>
            )}
            {isInsured && (
              <div className={styles.insuredBadge}>
                <span className={styles.iconOp}><FaShieldAlt /></span> Insured
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.manifestSection}>
        <p className={styles.manifestTitle}>Package Summary ({tCount} ITEM{tCount !== 1 ? 'S' : ''})</p>

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
                <p className={styles.pkgValue}>₹{pkg.value || 0}</p>
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
            <p className={styles.totalValue}>₹{totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
