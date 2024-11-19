const { validateId, validateOrderId, validateInvoiceDate, validateTotalAmount } = require('../../validations/invoice.validations');

describe('Validation Functions for Invoice', () => {
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

  // Test for validateInvoiceDate
  test('validateInvoiceDate - should return the invoice_date if valid', () => {
    const validDate = new Date().toISOString();
    expect(validateInvoiceDate(validDate)).toBe(validDate);
  });
  test('validateInvoiceDate - should throw an error if invoice_date is invalid', () => {
    expect(() => validateInvoiceDate('invalid-date')).toThrow('Invalid invoice_date');
  });

  // Test for validateTotalAmount
  test('validateTotalAmount - should return the total_amount if valid', () => {
    expect(validateTotalAmount(100.50)).toBe(100.50);
  });
  test('validateTotalAmount - should throw an error if total_amount is invalid', () => {
    expect(() => validateTotalAmount(-50.25)).toThrow('Invalid total_amount');
  });
});
