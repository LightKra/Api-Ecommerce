const { validateId, validateName, validateDescription, validatePrice, validateStock, validateImage, validateCreatedAt, validateCategory } = require('../../validations/product.validations');

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
    expect(validateName('Product Name')).toBe('Product Name');
  });
  test('validateName - should throw an error if name is too short', () => {
    expect(() => validateName('Pr')).toThrow('Invalid name');
  });

  // Test for validateDescription
  test('validateDescription - should return the description if valid', () => {
    expect(validateDescription('This is a description.')).toBe('This is a description.');
  });
  test('validateDescription - should allow an empty string', () => {
    expect(validateDescription('')).toBe('');
  });
  test('validateDescription - should throw an error if description is too long', () => {
    const longDescription = 'a'.repeat(1001);
    expect(() => validateDescription(longDescription)).toThrow('Invalid description');
  });

  // Test for validatePrice
  test('validatePrice - should return the price if valid', () => {
    expect(validatePrice(29.99)).toBe(29.99);
  });
  test('validatePrice - should throw an error if price is negative', () => {
    expect(() => validatePrice(-29.99)).toThrow('Invalid price');
  });

  // Test for validateStock
  test('validateStock - should return the stock if valid', () => {
    expect(validateStock(100)).toBe(100);
  });
  test('validateStock - should throw an error if stock is negative', () => {
    expect(() => validateStock(-10)).toThrow('Invalid stock');
  });

  // Test for validateImage
  test('validateImage - should return the image URL if valid', () => {
    const validUrl = 'https://example.com/image.png';
    expect(validateImage(validUrl)).toBe(validUrl);
  });
  test('validateImage - should throw an error if image URL is invalid', () => {
    expect(() => validateImage('uu')).toThrow('Invalid image');
  });
  // Test for validateCreatedAt
  test('validateCreatedAt - should return the date if valid', () => {
    const date = new Date().toISOString();
    expect(validateCreatedAt(date)).toBe(date);
  });
  test('validateCreatedAt - should throw an error if date is invalid', () => {
    expect(() => validateCreatedAt('invalid-date')).toThrow('Invalid created_at');
  });
  test('validateCategory - should return the category', ()=>{
    expect(validateCategory("Tecnologia")).toBe("Tecnologia");
  })
  test(`ValidateCategory - should throw an error if category is invalid`, ()=>{
    expect(() => validateCategory("T")).toThrow('Invalid category');
  })
});
