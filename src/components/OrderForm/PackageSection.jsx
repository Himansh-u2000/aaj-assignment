import React from 'react';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import Checkbox from '../UI/Checkbox/Checkbox';
import { FiTrash2, FiPlus, FiEdit2, FiCheck } from 'react-icons/fi';
import { FaWineGlass, FaShieldAlt } from 'react-icons/fa';
import styles from './PackageSection.module.css';

const PackageSection = ({ orderState, setOrderState }) => {
  const { packages, isFragile, isInsured } = orderState;

  // New packages start in edit mode (isEditable: true) so user can fill them in.
  // Clicking the tick saves (locks) the row; clicking pencil re-opens for editing.
  const handleAddPackage = () => {
    setOrderState({
      ...orderState,
      packages: [
        // Auto-save (lock) all existing packages first
        ...packages.map(pkg => ({ ...pkg, isEditable: false })),
        // Add new blank package in edit mode
        { id: Date.now(), name: '', weight: '', length: '', width: '', height: '', value: '', isEditable: true }
      ]
    });
  };

  // Block minus, 'e', 'E' from being typed in numeric fields
  const preventNegative = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  };

  const handleRemovePackage = (id) => {
    if (packages.length <= 1) return;
    setOrderState({
      ...orderState,
      packages: packages.filter(pkg => pkg.id !== id)
    });
  };

  const handlePackageChange = (id, field, val) => {
    // Double-guard: reject negative values via state too
    if (['weight', 'length', 'width', 'height', 'value'].includes(field)) {
      if (val !== '' && Number(val) < 0) return;
    }
    setOrderState({
      ...orderState,
      packages: packages.map(pkg =>
        pkg.id === id ? { ...pkg, [field]: val } : pkg
      )
    });
  };

  // Toggle between edit mode and saved (read-only) mode
  const toggleEditStatus = (id) => {
    setOrderState({
      ...orderState,
      packages: packages.map(pkg =>
        pkg.id === id ? { ...pkg, isEditable: !pkg.isEditable } : pkg
      )
    });
  };

  return (
    <Card title="Package Information" className={styles.card}>
      <div className={styles.tableHeader}>
        <div className={styles.colName}><Label>Package Name</Label></div>
        <div className={styles.colWt}><Label>Wt (kg)</Label></div>
        <div className={styles.colDim}><Label>L × W × H (cm)</Label></div>
        <div className={styles.colVal}><Label>Value (₹)</Label></div>
        <div className={styles.colAction}></div>
      </div>

      {packages.map((pkg) => (
        <div key={pkg.id} className={styles.packageRow}>
          <div className={styles.colName}>
            <Input 
              value={pkg.name} 
              onChange={(e) => handlePackageChange(pkg.id, 'name', e.target.value)} 
              placeholder="Server Rack"
              disabled={!pkg.isEditable}
              required
            />
          </div>
          <div className={styles.colWt}>
            <Input 
              value={pkg.weight} 
              onChange={(e) => handlePackageChange(pkg.id, 'weight', e.target.value)} 
              onKeyDown={preventNegative}
              type="number"
              min="0"
              placeholder="45"
              disabled={!pkg.isEditable}
              required
            />
          </div>
          <div className={`${styles.colDim} ${styles.dimGroup}`}>
            <Input 
              value={pkg.length} 
              onChange={(e) => handlePackageChange(pkg.id, 'length', e.target.value)} 
              onKeyDown={preventNegative}
              type="number"
              min="0"
              placeholder="L"
              className={styles.dimInput}
              disabled={!pkg.isEditable}
              required
            />
            <span className={styles.cross}>×</span>
            <Input 
              value={pkg.width} 
              onChange={(e) => handlePackageChange(pkg.id, 'width', e.target.value)} 
              onKeyDown={preventNegative}
              type="number"
              min="0"
              placeholder="W"
              className={styles.dimInput}
              disabled={!pkg.isEditable}
              required
            />
            <span className={styles.cross}>×</span>
            <Input 
              value={pkg.height} 
              onChange={(e) => handlePackageChange(pkg.id, 'height', e.target.value)} 
              onKeyDown={preventNegative}
              type="number"
              min="0"
              placeholder="H"
              className={styles.dimInput}
              disabled={!pkg.isEditable}
              required
            />
          </div>
          <div className={styles.colVal}>
            <Input 
              value={pkg.value} 
              onChange={(e) => handlePackageChange(pkg.id, 'value', e.target.value)} 
              onKeyDown={preventNegative}
              type="number"
              min="0"
              placeholder="2500"
              disabled={!pkg.isEditable}
              required
            />
          </div>
          <div className={styles.colAction}>
            {pkg.isEditable ? (
              <button 
                type="button"
                className={styles.actionBtn} 
                onClick={() => toggleEditStatus(pkg.id)}
                title="Save Package"
              >
                <FiCheck className={styles.saveIcon} />
              </button>
            ) : (
              <button 
                type="button"
                className={styles.actionBtn} 
                onClick={() => toggleEditStatus(pkg.id)}
                title="Edit Package"
              >
                <FiEdit2 />
              </button>
            )}

            {packages.length > 1 && (
              <button 
                type="button"
                className={`${styles.actionBtn} ${styles.removeIcon}`} 
                onClick={() => handleRemovePackage(pkg.id)}
                title="Remove Package"
              >
                <FiTrash2 />
              </button>
            )}
          </div>
        </div>
      ))}

      <button type="button" className={styles.addBtn} onClick={handleAddPackage}>
        <FiPlus /> Add Package
      </button>

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
