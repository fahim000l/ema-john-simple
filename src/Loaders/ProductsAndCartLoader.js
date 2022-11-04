import { getCartFromDb } from "../utilities/fakedb";

export const ProductsAndCartLoader = async () => {
    const productsData = await fetch('http://localhost:5000/products');
    const { products } = await productsData.json();

    const cart = getCartFromDb();
    const initialCart = [];
    for (let id in cart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            addedProduct.quantity = cart[id];
            initialCart.push(addedProduct);
        }

    }
    return { products, initialCart };
}