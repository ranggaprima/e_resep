import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchRules } from '../actions/ruleAction';

interface OptionType {
  value: string;
  label: string;
}

interface RuleSelectProps {
  onSelectChange: (selectedOption: OptionType | null) => void;
  id_medicine: string | null;
  className?: string;
}

const RuleSelect: React.FC<RuleSelectProps> = ({ onSelectChange, id_medicine, className }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const { rule, loading } = useSelector((state: any) => state.rule);

  useEffect(() => {
    if (id_medicine) {
      dispatch(fetchRules(inputValue, page, 104));
    }
  }, [id_medicine, page, dispatch, inputValue]);

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      const selectedRule = rule.find((data: any) => data.id === selectedOption.value);
      onSelectChange(selectedRule);
    } else {
      onSelectChange(null);
    }
  };

  const handleMenuScrollToBottom = () => {
    if (!loading && id_medicine) {
      if(page < 3 ) setPage((prevPage) => prevPage + 1); // Increment the page number
    }
  };

  return (
    <div className={className}>
      <Select
        options={Array.isArray(rule) ? rule.map((rule: any) => ({ value: rule.id, label: rule.signa + ' - ' + rule.keterangan })) : []}
        isLoading={loading}
        // onInputChange={handleInputChange}
        onChange={handleChange}
        className={className}
        onMenuScrollToBottom={handleMenuScrollToBottom} // Handle scroll to bottom
      />
    </div>
  );
};

export default RuleSelect;
