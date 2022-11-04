import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { ShoppingCart } from '../Products/Products';
import ReviewItems from './ReviewItems/ReviewItems';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const { initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    const handleRmvItem = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    let handleDeleteCart = () => {
        deleteShoppingCart();
        setCart([]);
    }
    return (
        <div className='product-container'>
            <div className='order-container'>
                {


                    cart.length === 0 ?
                        <h1 className='empty-msg'>
                            Shopping Cart is empty.
                            <br />
                            Please <Link to={'/Shop'}> buy some products.</Link>
                        </h1> :
                        cart.map(cartProduct => <ReviewItems
                            key={cartProduct._id}
                            cartProduct={cartProduct}
                            handleRmvItem={handleRmvItem}
                        ></ReviewItems>)
                }
            </div>
            {
                <ShoppingCart
                    cart={cart}
                    handleDeleteCart={handleDeleteCart}
                ></ShoppingCart>
            }
        </div>
    );
};

export default Orders;