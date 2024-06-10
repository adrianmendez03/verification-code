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

export const Verification = () => {
  const [verificationCode, setVerificationCode] = useState<string>('');

  const handleChange = (type: 'WRITE' | 'ERASE', value?: string) => {
    let newCode = '';

    switch (type) {
      case 'WRITE':
        newCode = verificationCode + value;
        break;
      case 'ERASE':
        newCode = verificationCode.slice(0, verificationCode.length - 1);
        break;
      default:
        break;
    }

    setVerificationCode(newCode);
  };

  return (
    <Column>
      <h1>2-step verifcation</h1>
      <p>Enter the 2-step verification code we texted to your phone</p>
      <label>Code</label>
      <Row>
        {new Array(6).fill(null).map((_, index) => {
          const activeIndex = verificationCode.length;
          const isFocused =
            activeIndex === index || (activeIndex === 6 && index === 5);

          return (
            <InputText
              key={index}
              focused={isFocused}
              onChange={handleChange}
              value={verificationCode[index]}
            />
          );
        })}
      </Row>
    </Column>
  );
};
