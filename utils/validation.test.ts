import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  validateEmail,
  validatePhone,
  validateUrl,
  validateLinkedInUrl,
  validateGitHubUrl,
  validateDate,
  validateRequired
} from './validation.ts';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return valid for empty email', () => {
      const result = validateEmail('');
      assert.strictEqual(result.isValid, true);
    });

    it('should return valid for correct email format', () => {
      const result = validateEmail('test@example.com');
      assert.strictEqual(result.isValid, true);
    });

    it('should return invalid for incorrect email format', () => {
      const result = validateEmail('invalid-email');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Invalid email format');
    });
  });

  describe('validatePhone', () => {
    it('should return valid for empty phone', () => {
      const result = validatePhone('');
      assert.strictEqual(result.isValid, true);
    });

    it('should return valid for standard international format', () => {
      const result = validatePhone('+1234567890');
      assert.strictEqual(result.isValid, true);
    });

    it('should return valid for format with spaces', () => {
      const result = validatePhone('+1 234 567 8901');
      assert.strictEqual(result.isValid, true);
    });

    it('should return valid for format with parentheses and dashes', () => {
      const result = validatePhone('(123) 456-7890');
      assert.strictEqual(result.isValid, true);
    });

    it('should return valid for format with dots', () => {
      const result = validatePhone('123.456.7890');
      assert.strictEqual(result.isValid, true);
    });

    it('should return valid for local format without +', () => {
      const result = validatePhone('1234567890');
      assert.strictEqual(result.isValid, true);
    });

    it('should return invalid for too short phone numbers', () => {
      const result = validatePhone('123456');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Invalid phone number format');
    });

    it('should return invalid for too long phone numbers', () => {
      const result = validatePhone('1234567890123456');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Invalid phone number format');
    });

    it('should return invalid for phone numbers with letters', () => {
      const result = validatePhone('123-456-7890abc');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Invalid phone number format');
    });
  });

  describe('validateUrl', () => {
    it('should return valid for empty URL', () => {
      const result = validateUrl('');
      assert.strictEqual(result.isValid, true);
    });

    it('should return valid for full URL with https', () => {
      const result = validateUrl('https://example.com');
      assert.strictEqual(result.isValid, true);
    });

    it('should return valid for URL without protocol (adds https)', () => {
      const result = validateUrl('example.com');
      assert.strictEqual(result.isValid, true);
    });

    it('should return invalid for nonsensical strings', () => {
      // Note: new URL('!!!') might actually parse in some environments or be caught by the catch block
      const result = validateUrl('not a url');
      // "not a url" becomes https://not a url which is invalid due to spaces
      assert.strictEqual(result.isValid, false);
    });
  });

  describe('validateLinkedInUrl', () => {
    it('should return valid for valid LinkedIn URL', () => {
      const result = validateLinkedInUrl('https://www.linkedin.com/in/username');
      assert.strictEqual(result.isValid, true);
    });

    it('should return invalid for non-LinkedIn URL', () => {
      const result = validateLinkedInUrl('https://facebook.com/username');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Must be a LinkedIn URL');
    });
  });

  describe('validateGitHubUrl', () => {
    it('should return valid for valid GitHub URL', () => {
      const result = validateGitHubUrl('https://github.com/username');
      assert.strictEqual(result.isValid, true);
    });

    it('should return invalid for non-GitHub URL', () => {
      const result = validateGitHubUrl('https://gitlab.com/username');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Must be a GitHub URL');
    });
  });

  describe('validateDate', () => {
    it('should return valid for "Present"', () => {
      assert.strictEqual(validateDate('Present').isValid, true);
      assert.strictEqual(validateDate('present').isValid, true);
    });

    it('should return valid for YYYY format', () => {
      assert.strictEqual(validateDate('2023').isValid, true);
    });

    it('should return valid for MM/YYYY format', () => {
      assert.strictEqual(validateDate('05/2023').isValid, true);
      assert.strictEqual(validateDate('5/2023').isValid, true);
    });

    it('should return valid for Month YYYY format', () => {
      assert.strictEqual(validateDate('May 2023').isValid, true);
      assert.strictEqual(validateDate('Jan 2020').isValid, true);
    });

    it('should return invalid for incorrect format', () => {
      const result = validateDate('2023/05');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Invalid date format. Use YYYY, MM/YYYY, or Month YYYY');
    });
  });

  describe('validateRequired', () => {
    it('should return valid for non-empty string', () => {
      const result = validateRequired('some value', 'Field');
      assert.strictEqual(result.isValid, true);
    });

    it('should return invalid for empty string', () => {
      const result = validateRequired('', 'Field');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Field is required');
    });

    it('should return invalid for whitespace string', () => {
      const result = validateRequired('   ', 'Field');
      assert.strictEqual(result.isValid, false);
    });
  });
});
