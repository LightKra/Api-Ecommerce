class Invoice {
    #id; 
    #order_id; 
    #invoice_date; 
    #total_amount;

    /** 
     * 
     * @param {Number} id 
     * @param {Number} order_id 
     * @param {Date} invoice_date 
     * @param {Number} total_amount 
     */
    constructor(id, order_id, invoice_date, total_amount) {
      this.#id = id;
      this.#order_id = order_id;
      this.#invoice_date = invoice_date;
      this.#total_amount = total_amount;
    }
  
    getId() { return this.#id; }
    getOrderId() { return this.#order_id; }
    getInvoiceDate() { return this.#invoice_date; }
    getTotalAmount() { return this.#total_amount; }
  
    toJson() {
      return {
        id: this.#id,
        order_id: this.#order_id,
        invoice_date: this.#invoice_date,
        total_amount: this.#total_amount,
      };
    }
  }

module.exports = {Invoice}