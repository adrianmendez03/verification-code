import React, { useRef, useEffect, useState, ChangeEvent } from 'react';

type Props = {
  focused: boolean;
  onChange(type: 'WRITE' | 'ERASE', value?: string): void;
};

export const InputText = ({ focused, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value.match(/[a-z]/)) {
      onChange('WRITE', value);
    } else if (value === '') {
      onChange('ERASE');
    }

    setValue(value);
  };

  return (
    <input
      disabled={!focused}
      ref={inputRef}
      type="text"
      maxLength={1}
      value={value}
      onChange={handleChange}
    />
  );
};
