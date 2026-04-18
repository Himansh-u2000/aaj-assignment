import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import Button from '../UI/Button/Button';
import styles from './PackageModal.module.css';

const EMPTY_PKG = { name: '', weight: '', length: '', width: '', height: '', value: '' };

const PackageModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState(
    initialData
      ? { name: initialData.name, weight: initialData.weight, length: initialData.length, width: initialData.width, height: initialData.height, value: initialData.value }
      : EMPTY_PKG
  );
  const isEditMode = !!initialData;
  const [errors, setErrors] = useState({});

  const preventNegative = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault();
  };

  const handleChange = (field, val) => {
    if (['weight', 'length', 'width', 'height', 'value'].includes(field)) {
      if (val !== '' && Number(val) < 0) return;
    }
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Package name is required';
    if (!form.weight) newErrors.weight = 'Weight is required';
    if (!form.length) newErrors.length = 'Length is required';
    if (!form.width) newErrors.width = 'Width is required';
    if (!form.height) newErrors.height = 'Height is required';
    if (!form.value) newErrors.value = 'Declared value is required';
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave({
      ...form,
      id: initialData ? initialData.id : Date.now(),
      isEditable: false,
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{isEditMode ? 'Edit Package' : 'Add Package'}</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="pkg-name">Package Name / Label</Label>
            <Input
              id="pkg-name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Server Rack"
              hasError={!!errors.name}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="pkg-weight">Weight (kg)</Label>
              <Input
                id="pkg-weight"
                type="number"
                min="0"
                value={form.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                onKeyDown={preventNegative}
                placeholder="45"
                hasError={!!errors.weight}
              />
              {errors.weight && <span className={styles.error}>{errors.weight}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="pkg-value">Declared Value (₹)</Label>
              <Input
                id="pkg-value"
                type="number"
                min="0"
                value={form.value}
                onChange={(e) => handleChange('value', e.target.value)}
                onKeyDown={preventNegative}
                placeholder="2500"
                hasError={!!errors.value}
              />
              {errors.value && <span className={styles.error}>{errors.value}</span>}
            </div>
          </div>

          <div className={styles.dimSection}>
            <Label>Dimensions (cm)</Label>
            <div className={styles.dimRow}>
              <div className={styles.dimField}>
                <Input
                  id="pkg-length"
                  type="number"
                  min="0"
                  value={form.length}
                  onChange={(e) => handleChange('length', e.target.value)}
                  onKeyDown={preventNegative}
                  placeholder="Length"
                  hasError={!!errors.length}
                />
                {errors.length && <span className={styles.error}>{errors.length}</span>}
              </div>
              <span className={styles.cross}>×</span>
              <div className={styles.dimField}>
                <Input
                  id="pkg-width"
                  type="number"
                  min="0"
                  value={form.width}
                  onChange={(e) => handleChange('width', e.target.value)}
                  onKeyDown={preventNegative}
                  placeholder="Width"
                  hasError={!!errors.width}
                />
                {errors.width && <span className={styles.error}>{errors.width}</span>}
              </div>
              <span className={styles.cross}>×</span>
              <div className={styles.dimField}>
                <Input
                  id="pkg-height"
                  type="number"
                  min="0"
                  value={form.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  onKeyDown={preventNegative}
                  placeholder="Height"
                  hasError={!!errors.height}
                />
                {errors.height && <span className={styles.error}>{errors.height}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="button" variant="primary" onClick={handleSave}>
            {isEditMode ? 'Update Package' : 'Save Package'}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default PackageModal;
