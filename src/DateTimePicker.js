import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({ value, onChange }) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default DateTimePicker;
