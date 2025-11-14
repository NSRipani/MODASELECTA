class ProductDTO {
    constructor(data){
        this.id = data._id;
        this.title = data.title;
        this.photo = data.photo;
        this.category = data.category;
        this.price = data.price;
        this.stock = data.stock 
    }
    static productDTO = (product) => {
        return new ProductDTO(product)
    }
}
export default ProductDTO;
