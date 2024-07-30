import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

type Props = {
  focused: boolean;
  onChange(type: 'PUSH' | 'POP', value?: string): void;
};

export const InputText = ({ focused, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleValuePropagation = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Backspace') {
      onChange('POP');
      setValue('');
    } else if (key.match(/[a-z]/)) {
      onChange('PUSH', key);
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
      onChange={handleValueChange}
      onKeyDownCapture={handleValuePropagation}
    />
  );
};
