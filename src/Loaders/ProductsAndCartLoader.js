import { getCartFromDb } from "../utilities/fakedb";

export const ProductsAndCartLoader = async () => {
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    const cart = getCartFromDb();
    const initialCart = [];
    for (let id in cart) {
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            addedProduct.quantity = cart[id];
            initialCart.push(addedProduct);
        }

    }
    return { products, initialCart };
}