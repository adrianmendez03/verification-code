import React, { useRef, useEffect, KeyboardEvent, useState } from 'react';

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

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Backspace') {
      onChange('ERASE');
      setValue('');
    } else if (key.match(/[a-z]/)) {
      onChange('WRITE', key);
      setValue(key);
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
