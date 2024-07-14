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

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Backspace') {
      onChange('ERASE');
    } else if (key.match(/[a-z]/)) {
      onChange('WRITE', key);
    }
  };

  return (
    <input
      disabled={!focused}
      ref={inputRef}
      type="text"
      maxLength={1}
      value={value}
      onKeyDown={handleKeyDown}
    />
  );
};
