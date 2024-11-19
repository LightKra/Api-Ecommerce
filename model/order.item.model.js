class OrderItem {
  #id; 
  #order_id; 
  #product_id; 
  #quantity; 
  #price;

  /**
   * 
   * @param {Number} id 
   * @param {Number} order_id 
   * @param {Number} product_id 
   * @param {Number} quantity 
   * @param {Number} price 
   */
    constructor(id, order_id, product_id, quantity, price) {
      this.#id = id;
      this.#order_id = order_id;
      this.#product_id = product_id;
      this.#quantity = quantity;
      this.#price = price;
    }
  
    getId() { return this.#id; }
    getOrderId() { return this.#order_id; }
    getProductId() { return this.#product_id; }
    getQuantity() { return this.#quantity; }
    getPrice() { return this.#price; }
  
    toJson() {
      return {
        id: this.#id,
        order_id: this.#order_id,
        product_id: this.#product_id,
        quantity: this.#quantity,
        price: this.#price,
      };
    }
  }

module.exports = {OrderItem}