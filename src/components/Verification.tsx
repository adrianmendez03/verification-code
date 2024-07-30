import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { InputText } from './InputText';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const VERIFICATION_CODE_LENGTH = 6;
const PLACEHOLDER_VALUE = '';

const findActiveIndex = (
  type: 'PUSH' | 'POP',
  code: string[],
  prevActiveIndex: number
) => {
  if (type === 'PUSH') {
    return prevActiveIndex === VERIFICATION_CODE_LENGTH - 1
      ? prevActiveIndex
      : prevActiveIndex + 1;
  }

  if (code[prevActiveIndex] !== PLACEHOLDER_VALUE) {
    return prevActiveIndex;
  }

  return prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;
};

export const Verification = () => {
  const [code, setCode] = useState<string[]>(
    new Array(VERIFICATION_CODE_LENGTH).fill(PLACEHOLDER_VALUE)
  );
  const indexRef = useRef(0);

  const handleChange = (type: 'PUSH' | 'POP', value: string) => {
    const newCode = code.map((char, index) => {
      if (index === indexRef.current) {
        switch (type) {
          case 'PUSH':
            return value;
          case 'POP':
          default:
            return PLACEHOLDER_VALUE;
        }
      } else {
        return char;
      }
    });

    indexRef.current = findActiveIndex(type, code, indexRef.current);

    setCode(newCode);
  };

  return (
    <Column>
      <h1>2-Step Verification</h1>
      <span>Enter the 2-step verification code we texted to your phone</span>
      <label>Verification Code</label>
      <p>{indexRef.current}</p>
      <Row>
        {code.map((_, index) => {
          return (
            <InputText
              key={index}
              focused={indexRef.current === index}
              onChange={handleChange}
            />
          );
        })}
      </Row>
    </Column>
  );
};
