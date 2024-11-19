class Product {
    #id; 
    #name; 
    #description; 
    #price; 
    #stock;
    #image;
    #created_at;
    #category; 

    /**
     * 
     * @param {Number} id 
     * @param {String} name 
     * @param {String} description 
     * @param {Number} price 
     * @param {Number} stock 
     * @param {String} image 
     * @param {Date} created_at 
     */
    constructor(id, name, description, price, stock, image, created_at, category) {
      this.#id = id;
      this.#name = name;
      this.#description = description;
      this.#price = price;
      this.#stock = stock;
      this.#image = image;
      this.#created_at = created_at;
      this.#category = category;
    }
  
    getId() { return this.#id; }
    getName() { return this.#name; }
    getDescription() { return this.#description; }
    getPrice() { return this.#price; }
    getStock() { return this.#stock; }
    getImage(){ return this.#image}
    getCreated_at(){ return this.#created_at}
    getCategory(){ return this.#category}
  
    toJson() {
      return {
        id: this.#id,
        name: this.#name,
        description: this.#description,
        price: this.#price,
        stock: this.#stock,
        image: this.#image,
        created_at: this.#created_at
      };
    }
  }

module.exports = {Product}