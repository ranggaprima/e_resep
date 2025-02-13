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
  const [defaultOption, setDefaultOption] = useState<OptionType | null>({ value: '000820', label: 'Admin Farmagitechs' });
  const dispatch = useDispatch();
  const { dokter, loading } = useSelector((state: any) => state.dokter);

  useEffect(() => {
    dispatch(fetchDokters('', 1));  // Fetch with default query and page 1
  }, [dispatch]);

  useEffect(() => {
    if (dokter && dokter.length > 0) {
      // Set the default option based on the fetched data
      const firstDokter = dokter[0];
      setDefaultOption({ value: firstDokter.id, label: firstDokter.nama });
    }
  }, [dokter]);

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
      const selectedDokter = dokter.find((item: any) => item.id === selectedOption.value);
      onSelectChange(selectedDokter);
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
        defaultValue={defaultOption}
        className={className}
      />
    </div>
  );
};

export default MedicineSelect;
