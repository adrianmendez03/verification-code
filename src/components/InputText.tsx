import React, { useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';

type Props = {
  focused: boolean;
  onChange(type: 'WRITE' | 'ERASE', value?: string): void;
  value: string;
};

export const InputText = ({ focused, onChange, value }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    if (newValue === '') return;

    onChange('WRITE', newValue);
  };

  const handleKeyboardDownCapture = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Backspace') return;

    onChange('ERASE');
  };

  return (
    <input
      disabled={!focused}
      ref={inputRef}
      type="text"
      maxLength={1}
      value={value}
      onChange={handleChange}
      onKeyDownCapture={handleKeyboardDownCapture}
    />
  );
};
