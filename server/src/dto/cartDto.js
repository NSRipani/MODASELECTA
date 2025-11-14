class CartDTO {
    constructor(data) {
        //id
        // this.id = data?._id ?? data?.id ?? null;
        // user puede ser ObjectId o objeto poblado
        // this.user = data?.user && data.user._id ? String(data.user._id) : (data?.user ? String(data.user) : null);
        this.id = data._id;
        this.user = data.user._id;
        this.products = {
            items: data.products.items.map(item => ({
                productId: item.prod._id,
                name: item.prod.title,
                photo: item.prod.photo,
                price: item.prod.price,
                quantity: item.quantity,
                subtotal: item.subtotal
            }))
        };
        this.total = data.total;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static fromEntity(cart) {
        return new CartDTO(cart);
    }
}
export default CartDTO

// class CartDTO {
//     constructor(data) {
//         // id
//         this.id = data?._id ?? data?.id ?? null;

//         // user puede ser ObjectId o objeto poblado
//         this.user = data?.user && data.user._id ? String(data.user._id) : (data?.user ? String(data.user) : null);

//         // asegurar estructura de products.items
//         const items = data?.products?.items ?? [];

//         this.products = {
//             items: Array.isArray(items) ? items.map(item => {
//                 // prod puede ser id o objeto poblado
//                 const prodObj = item?.prod && item.prod._id ? item.prod : {
//                     _id: item?.prod ?? null,
//                     title: item?.name ?? item?.title ?? '',
//                     photo: item?.photo ?? '',
//                     price: (item?.price ?? 0)
//                 };

//                 const productId = prodObj._id ? String(prodObj._id) : null;
//                 const name = prodObj.title ?? '';
//                 const photo = prodObj.photo ?? '';
//                 const price = typeof prodObj.price === 'number' ? prodObj.price : Number(prodObj.price) || 0;
//                 const quantity = typeof item?.quantity === 'number' ? item.quantity : Number(item?.quantity) || 0;
//                 const subtotal = typeof item?.subtotal === 'number' ? item.subtotal : (price * quantity);

//                 return {
//                     productId,
//                     name,
//                     photo,
//                     price,
//                     quantity,
//                     subtotal
//                 };
//             }) : []
//         };

//         this.total = typeof data?.total === 'number' ? data.total : Number(data?.total) || this.products.items.reduce((s, it) => s + (it.subtotal || 0), 0);
//         this.createdAt = data?.createdAt ?? data?.created_at ?? null;
//         this.updatedAt = data?.updatedAt ?? data?.updated_at ?? null;
//     }

//     static fromEntity(cart) {
//         return new CartDTO(cart);
//     }
// }
// export default CartDTO



