import { VERIFICATION_CODE_LENGTH, PLACEHOLDER_VALUE } from './constants';

export const findActiveIndex = (
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
