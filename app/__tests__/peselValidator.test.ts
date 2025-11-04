import { describe, it, expect } from 'vitest';
import { isValidPesel } from '../utils/peselValidator';

describe('PESEL validator', () => {
  it('valid PESEL should return true', () => {
    expect(isValidPesel('44051401359')).toBe(true);
  });

  it('wrong control digit returns false', () => {
    expect(isValidPesel('44051401358')).toBe(false);
  });

  it('too short returns false', () => {
    expect(isValidPesel('123')).toBe(false);
  });

  it('invalid date returns false', () => {
    expect(isValidPesel('99023012345')).toBe(false);
  });

  it('non-digit characters return false', () => {
    expect(isValidPesel('440A1401359')).toBe(false);
  });
});
