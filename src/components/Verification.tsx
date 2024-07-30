import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  VERIFICATION_CODE_LENGTH,
  PLACEHOLDER_VALUE,
  findActiveIndex,
} from './utils';
import { InputText } from './InputText';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

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
  );
};
