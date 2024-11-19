class User {
    #id; 
    #name; 
    #email;
    #address;
    #image;
    #password;
    #role; 
    #created_at;

    /**
     * 
     * @param {Number} id  
     * @param {String} name 
     * @param {String} email 
     * @param {String} address 
     * @param {String} image 
     * @param {String} password 
     * @param {String} role 
     * @param {Date} created_at 
     */
    constructor(id, name, email, address, image, password, role, created_at) {
      this.#id = id;
      this.#name = name;
      this.#email = email;
      this.#address = address;
      this.#image = image;
      this.#password = password;
      this.#role = role;
      this.#created_at = created_at;
    }
  
    getId() { return this.#id; }
    getName() { return this.#name; }
    getEmail() { return this.#email; }
    getAddress() { return this.#address}
    getImage(){ return this.#image}
    getPassword() { return this.#password; }
    getRole() {return this.#role; }
    getCreated_at() {return this.#created_at}
  
    toJson() {
      return {
        id: this.#id,
        name: this.#name,
        email: this.#email,
        address: this.#address,
        image: this.#image,
        password: this.#password,
        role: this.#role,
        created_at: this.#created_at
      };
    }
  }

module.exports = {User}