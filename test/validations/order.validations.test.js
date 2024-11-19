const { validateId, validateUserId, validateTotalAmount, validateStatus, validateCreatedAt } = require('../../validations/order.validations');
describe('Validation Functions', () => {
    // Test for validateId
    test('validateId - should return the id if valid', () => {
      expect(validateId(1)).toBe(1);
    });
    test('validateId - should throw an error if id is invalid', () => {
      expect(() => validateId(-1)).toThrow('Invalid id');
    });
  
    // Test for validateUserId
    test('validateUserId - should return the user_id if valid', () => {
      expect(validateUserId(1)).toBe(1);
    });
    test('validateUserId - should throw an error if user_id is invalid', () => {
      expect(() => validateUserId(-1)).toThrow('Invalid user_id');
    });
  
    // Test for validateTotalAmount
    test('validateTotalAmount - should return the total_amount if valid', () => {
      expect(validateTotalAmount(100.50)).toBe(100.50);
    });
    test('validateTotalAmount - should throw an error if total_amount is invalid', () => {
      expect(() => validateTotalAmount(-50.25)).toThrow('Invalid total_amount');
    });
  
    // Test for validateStatus
    test('validateStatus - should return the status if valid', () => {
      expect(validateStatus('pending')).toBe('pending');
      expect(validateStatus('completed')).toBe('completed');
    });
    test('validateStatus - should throw an error if status is invalid', () => {
      expect(() => validateStatus('unknown')).toThrow('Invalid status');
    });
    // Test for validateCreatedAt
    test('validateCreatedAt - should return the created_at date if valid', () => {
      const date = new Date().toISOString();
      expect(validateCreatedAt(date)).toBe(date);
    });
    test('validateCreatedAt - should throw an error if created_at date is invalid', () => {
      expect(() => validateCreatedAt('invalid-date')).toThrow('Invalid created_at');
  });
  });