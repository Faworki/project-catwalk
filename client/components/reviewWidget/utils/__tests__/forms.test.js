const formUtils = require('../forms');

describe('Validate Email', () => {
  it('should return true for a valid email address', () => {
    expect(formUtils.validateEmail('valid.email@hotmail.com')).toBe(true);
  });

  it('should return false for an invalid email address', () => {
    expect(formUtils.validateEmail('notAnEmailATdotall'));
  });
});

describe('validateMaxLength', () => {
  test('should return true when input is equal to maxLength', () => {
    expect(formUtils.validateMaxLength('1234', 4)).toBe(true);
  });
  test('should return true when input is less than max length', () => {
    expect(formUtils.validateMaxLength('1234', 10)).toBe(true);
  });
  test('should return false when input is longer than maxLength', () => {
    expect(formUtils.validateMaxLength('12345', 4)).toBe(false);
  });
});

describe('validateMinLength', () => {
  test('should return true when input is equal to minLength', () => {
    expect(formUtils.validateMinLength('1234', 4)).toBe(true);
  });
  test('should return true when input is greater than minLength', () => {
    expect(formUtils.validateMinLength('12345678', 4)).toBe(true);
  });
  test('should return false when input is shorter than minLength', () => {
    expect(formUtils.validateMinLength('123', 4)).toBe(false);
  });
});

describe('validateNotEmpty', () => {
  test('should return false if input is an empty string', () => {
    expect(formUtils.validateNotEmpty('')).toBe(false);
  });

  test('should return false if input is undefined or null', () => {
    expect(formUtils.validateNotEmpty(undefined)).toBe(false);
    expect(formUtils.validateNotEmpty(null)).toBe(false);
  });

  test('should return true when input is a number', () => {
    expect(formUtils.validateNotEmpty(12345)).toBe(true);
    expect(formUtils.validateNotEmpty(0)).toBe(true);
    expect(formUtils.validateNotEmpty(1)).toBe(true);
  });

  test('should return true when input is a string', () => {
    expect(formUtils.validateNotEmpty('null')).toBe(true);
    expect(formUtils.validateNotEmpty('undefined')).toBe(true);
    expect(formUtils.validateNotEmpty(' ')).toBe(true);
    expect(formUtils.validateNotEmpty('Valid Input')).toBe(true);
  });
});
