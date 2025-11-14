class UserDTO {
    constructor(data){
        this.id = data._id,
        this.first_name = data.first_name,
        this.last_name = data.last_name,
        this.email = data.email,
        this.age = data.age,
        this.password = data.password,
        this.role = data.role,
        this.cartId = data.cart ? data.cart.id : null
    }
    static userDto = (user) => {
        return new UserDTO(user)
    }
}
export default UserDTO;
