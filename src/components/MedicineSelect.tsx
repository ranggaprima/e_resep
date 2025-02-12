import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { StylesConfig } from 'react-select';
import { fetchMedicines } from '../actions/medicineAction';

interface OptionType {
  value: string;
  label: string;
}

interface MedicineSelectProps {
  onSelectChange: (selectedMedicine: any) => void;
  className?: string;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    minHeight: '30px', // Adjust the minimum height
    height: '30px', // Adjust the height
  }),
  input: (provided) => ({
    ...provided,
    fontSize: '12px', // Adjust the font size
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '12px', // Adjust the font size
  }),
};

const MedicineSelect: React.FC<MedicineSelectProps> = ({ onSelectChange, className }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();
  const { medicine, loading } = useSelector((state: any) => state.medicine);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Shift') {
      dispatch(fetchMedicines(inputValue));
    }
  };

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      const selectedMedicine = medicine.find((med: any) => med.id === selectedOption.value);
      onSelectChange(selectedMedicine);
    } else {
      onSelectChange(null);
    }
  };

  return (
    <div className={className}>
      <Select
        options={Array.isArray(medicine) ? medicine.map((med: any) => ({ value: med.id, label: med.nama })) : []}
        isLoading={loading}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className={className}
      />
    </div>
  );
};

export default MedicineSelect;
