import React, { useState } from "react";

function NumberInputWithNumber({ onChange }) {
  const [number, setNumber] = useState(0);

  const handleNumberChange = (value) => {
    setNumber(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleNext = () => {
    handleNumberChange(number + 1);
  };

  const handlePrevious = () => {
    handleNumberChange(number - 1);
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <button className="btn-sidebar-number" onClick={handlePrevious}>
        -
      </button>
      <input
        className="w-25"
        type="number"
        value={number}
        onChange={(e) => handleNumberChange(parseInt(e.target.value))}
      />
      <button className="btn-sidebar-number" onClick={handleNext}>
        +
      </button>
    </div>
  );
}

export default NumberInputWithNumber;
