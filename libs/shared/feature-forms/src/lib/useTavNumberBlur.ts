import { FocusEvent, useState } from 'react';
import { isValidBelgianVatNumber } from './form-validation';

export const useTavNumberBlur = () => {
  const [tavNumber, setTavNumber] = useState('');
  const [tavNumberIsValid, setTavNumberIsValid] = useState(false);

  const handleTavNumberBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== tavNumber) {
      setTavNumber(e.target.value);
      const isValid = isValidBelgianVatNumber(e.target.value);
      setTavNumberIsValid(isValid);
    }
  };

  return {
    handleTavNumberBlur,
    tavNumber,
    tavNumberIsValid,
  };
};
