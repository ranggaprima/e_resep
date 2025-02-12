import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchDokters } from '../actions/dokterAction';

interface OptionType {
  value: string;
  label: string;
}

interface MedicineSelectProps {
  onSelectChange: (selectedMedicine: any) => void;
  className?: string;
}

const MedicineSelect: React.FC<MedicineSelectProps> = ({ onSelectChange, className }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const { dokter, loading } = useSelector((state: any) => state.dokter);


  useEffect(() => {
    dispatch(fetchDokters('', 1));  // Fetch with default query and page 1
  }, [dispatch]);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        dispatch(fetchDokters(value, 1));
      }, 500) // 500ms delay
    );
  
  };

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      const selectedMedicine = dokter.find((item: any) => item.id === selectedOption.value);
      onSelectChange(selectedMedicine);
    } else {
      onSelectChange(null);
    }
  };

  return (
    <div className={className}>
      <Select
        options={Array.isArray(dokter) ? dokter.map((item: any) => ({ value: item.id, label: item.nama })) : []}
        isLoading={loading}
        onInputChange={handleInputChange}
        onChange={handleChange}
        className={className}
      />
    </div>
  );
};

export default MedicineSelect;
