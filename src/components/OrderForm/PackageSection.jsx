import React from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Checkbox from '../UI/Checkbox/Checkbox';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { FaWineGlass, FaShieldAlt } from 'react-icons/fa';
import styles from './PackageSection.module.css';

const PackageSection = ({ orderState, setOrderState, onAddPackage, onEditPackage }) => {
  const { packages, isFragile, isInsured } = orderState;

  const handleRemove = (id) => {
    if (packages.length <= 1) return;
    setOrderState({
      ...orderState,
      packages: packages.filter(pkg => pkg.id !== id),
    });
  };

  const cardTitle = (
    <div className={styles.cardTitleRow}>
      <span>Package Information</span>
      <Button type="button" variant="primary" className={styles.addBtn} onClick={onAddPackage}>
        <FiPlus /> Add Package
      </Button>
    </div>
  );

  return (
    <Card title={cardTitle}>
      {packages.length === 0 ? (
        <p className={styles.emptyText}>No packages added yet. Click "Add Package" to begin.</p>
      ) : (
        <div className={styles.packageList}>
          {packages.map((pkg, idx) => (
            <div key={pkg.id} className={styles.packageItem}>
              <div className={styles.pkgMeta}>
                <div>
                  <p className={styles.pkgName}>{pkg.name}</p>
                  <p className={styles.pkgDetails}>
                    {pkg.weight} kg &bull; {pkg.length}×{pkg.width}×{pkg.height} cm &bull; ₹{pkg.value}
                  </p>
                </div>
              </div>
              <div className={styles.pkgActions}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => onEditPackage(pkg)}
                  title="Edit Package"
                >
                  <FiEdit2 />
                </button>
                {packages.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => handleRemove(pkg.id)}
                    title="Remove Package"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.optionsRow}>
        <Checkbox
          label={<><span className={styles.iconOp}><FaWineGlass /></span> Fragile</>}
          checked={isFragile}
          onChange={(e) => setOrderState({ ...orderState, isFragile: e.target.checked })}
        />
        <Checkbox
          label={<><span className={styles.iconOp}><FaShieldAlt /></span> Insured</>}
          checked={isInsured}
          onChange={(e) => setOrderState({ ...orderState, isInsured: e.target.checked })}
        />
      </div>
    </Card>
  );
};

export default PackageSection;
