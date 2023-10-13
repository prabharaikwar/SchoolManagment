// Dropdown.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTimeframeThunk } from '../../../redux/reducers/totalIncomeReducer'; 
interface DropdownProps {
  timeframe: string;
}

const Dropdown: React.FC<DropdownProps> = ({ timeframe }) => {
  const dispatch = useDispatch();

  const handleTimeframeChange = (selectedTimeframe: string) => {
    // dispatch(setTimeframeThunk(selectedTimeframe)); 
  };

  return (
    <div>
      <select onChange={(e) => handleTimeframeChange(e.target.value)}>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
    </div>
  );
};

export default Dropdown;
