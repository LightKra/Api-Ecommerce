const { validateId, validateOrderId, validateProductId, validateQuantity, validatePrice } = require('../../validations/order.item.validations');

describe('Validation Functions for OrderItem', () => {
  // Test for validateId
  test('validateId - should return the id if valid', () => {
    expect(validateId(1)).toBe(1);
  });
  test('validateId - should throw an error if id is invalid', () => {
    expect(() => validateId(-1)).toThrow('Invalid id');
  });

  // Test for validateOrderId
  test('validateOrderId - should return the order_id if valid', () => {
    expect(validateOrderId(10)).toBe(10);
  });
  test('validateOrderId - should throw an error if order_id is invalid', () => {
    expect(() => validateOrderId(-5)).toThrow('Invalid order_id');
  });

  // Test for validateProductId
  test('validateProductId - should return the product_id if valid', () => {
    expect(validateProductId(50)).toBe(50);
  });
  test('validateProductId - should throw an error if product_id is invalid', () => {
    expect(() => validateProductId(-10)).toThrow('Invalid product_id');
  });

  // Test for validateQuantity
  test('validateQuantity - should return the quantity if valid', () => {
    expect(validateQuantity(5)).toBe(5);
  });
  test('validateQuantity - should throw an error if quantity is less than 1', () => {
    expect(() => validateQuantity(0)).toThrow('Invalid quantity');
  });

  // Test for validatePrice
  test('validatePrice - should return the price if valid', () => {
    expect(validatePrice(29.99)).toBe(29.99);
  });
  test('validatePrice - should throw an error if price is invalid', () => {
    expect(() => validatePrice(-100.00)).toThrow('Invalid price');
  });
});
