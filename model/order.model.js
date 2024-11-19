class Order {
    #id; 
    #user_id; 
    #total_amount; 
    #status;
    #created_at; 

    /**
     * 
     * @param {Number} id 
     * @param {Number} user_id 
     * @param {Number} total_amount 
     * @param {String} status 
     * @param {Date} created_at 
     */
    constructor(id, user_id, total_amount, status, created_at) {
      this.#id = id;
      this.#user_id = user_id;
      this.#total_amount = total_amount;
      this.#status = status;
      this.#created_at = created_at;
    }
  
    getId() { return this.#id; }
    getUserId() { return this.#user_id; }
    getTotalAmount() { return this.#total_amount; }
    getStatus() { return this.#status; }
    getCreated_at() {return this.#created_at}
  
    toJson() {
      return {
        id: this.#id,
        user_id: this.#user_id,
        total_amount: this.#total_amount,
        status: this.#status,
        created_at: this.#created_at
      };
    }
  }

module.exports = {Order}