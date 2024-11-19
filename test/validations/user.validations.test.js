const { validateId, validateName, validateEmail, validateAddress, validateImage, validatePassword, validateRole, validateCreatedAt } = require('../../validations/user.validations');

describe('Validation Functions', () => {
  // Test for validateId
  test('validateId - should return the id if valid', () => {
    expect(validateId(1)).toBe(1);
  });
  test('validateId - should throw an error if id is invalid', () => {
    expect(() => validateId(-1)).toThrow('Invalid id');
  });

  // Test for validateName
  test('validateName - should return the name if valid', () => {
    expect(validateName('John')).toBe('John');
  });
  test('validateName - should throw an error if name is too short', () => {
    expect(() => validateName('Jo')).toThrow('Invalid name');
  });

  // Test for validateEmail
  test('validateEmail - should return the email if valid', () => {
    expect(validateEmail('test@example.com')).toBe('test@example.com');
  });
  test('validateEmail - should throw an error if email is invalid', () => {
    expect(() => validateEmail('invalid-email')).toThrow('Invalid email');
  });

  // Test for validateAddress
  test('validateAddress - should return the address if valid', () => {
    expect(validateAddress('123 Main St')).toBe('123 Main St');
  });
  test('validateAddress - should throw an error if address is too short', () => {
    expect(() => validateAddress('12')).toThrow('Invalid address');
  });

  // Test for validateImage
  test('validateImage - should return the image URL if valid', () => {
    expect(validateImage('https://example.com/image.png')).toBe('https://example.com/image.png');
  });
  test('validateImage - should throw an error if image URL is too short', () => {
    expect(() => validateImage('ht')).toThrow('Invalid image');
  });

  // Test for validatePassword
  test('validatePassword - should return the password if valid', () => {
    expect(validatePassword('securepassword')).toBe('securepassword');
  });
  test('validatePassword - should throw an error if password is too short', () => {
    expect(() => validatePassword('123')).toThrow('Invalid password');
  });
  // Test for validaterRole
  test('validateName - should return the role if valid', () => {
    expect(validateRole('admin')).toBe('admin');
    expect(validateRole('user')).toBe('user');
  });
  test('validateName - should throw an error if role is too short', () => {
    expect(() => validateRole('Jo')).toThrow('Invalid role');
  });
  // Test for validateCreatedAt
  test('validateCreatedAt - should return the date if valid', () => {
    const date = new Date().toISOString();
    expect(validateCreatedAt(date)).toBe(date);
  });
  test('validateCreatedAt - should throw an error if date is invalid', () => {
    expect(() => validateCreatedAt('invalid-date')).toThrow('Invalid created_at');
  });
});
