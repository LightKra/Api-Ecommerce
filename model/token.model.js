class RefreshTokenClass {
    #id;
    #user_id;
    #refresh_token;
    #created_at;

    /**
     * 
     * @param {Number} id 
     * @param {Number} user_id 
     * @param {string} refresh_token 
     * @param {Date} created_at 
     */
    constructor(id, user_id, refresh_token, created_at){
        this.#id = id;
        this.#user_id = user_id,
        this.#refresh_token = refresh_token;
        this.#created_at = created_at;
    }
    getId() { return this.#id; }
    getUserId() { return this.#user_id; }
    getRefreshToken() { return this.#refresh_token; }
    getCreatedAt() { return this.#created_at; }

    toJson(){
        return{
            id: this.#id,
            user_id: this.#user_id,
            refresh_token: this.#refresh_token,
            created_at: this.#created_at
        }
    }
}
module.exports = {RefreshTokenClass}