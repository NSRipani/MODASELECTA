//import CartDTO from "./cartDto.js";

// dto/OrderDTO.js
class OrderDTO {
    constructor(data) {
        this.id = data._id;
        this.cart = data?.cart ?? data.cart._id 
        this.status = data.status;
        this.createdAt = data.createdAt
    }

    static fromEntity(order) {
        return new OrderDTO(order);
    }
}

export default OrderDTO;
