import { faDeleteLeft, faShoppingCart, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getCartFromDb } from '../../utilities/fakedb';
import './Products.css'


const Products = () => {

    const products = useLoaderData();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        let restoreCart = getCartFromDb();
        let savedCard = [];
        // console.log(restoreCart);
        for (const id in restoreCart) {
            let addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                addedProduct.quantity = restoreCart[id];
                savedCard.push(addedProduct);
                // console.log(savedCard);
            }
        }
        setCart(savedCard);
    }, [products])
    let handleDeleteCart = () => {
        deleteShoppingCart();
        setCart([]);
    }

    let handleAddToCart = (selectedProduct) => {
        // console.log(product);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id)
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];

        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }



        setCart(newCart);
        addToDb(selectedProduct.id)

    }

    return (
        <div className='product-container'>
            <div className='card-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        img={product.img}
                        name={product.name}
                        price={product.price}
                        seller={product.seller}
                        rating={product.ratings}
                        eventHandler={handleAddToCart}
                        product={product}
                    ></Product>)
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


const Product = (props) => {
    // console.log(props.hero);
    return (

        <div className='card'>
            <img src={props.img} alt="" />
            <div className='card-detail'>
                <h4>{props.name}</h4>
                <p>Price: ${props.price} </p>
                <p>Manufacturer : {props.seller}</p>
                <p>Rating : {props.rating} start</p>
            </div>
            <button onClick={() => props.eventHandler(props.product)}>
                <p>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>

        </div>

    );
};

const ShoppingCart = ({ cart, handleDeleteCart }) => {
    const navigate = useNavigate();
    const gotoOrderReview = () => {
        navigate('/OrderReview');
    }


    console.log(cart);
    let quantity = 0;
    // for (const product of products) {
    //     product.quantity = 1;
    // }
    for (const product of cart) {
        // product.quantity = 1;
        quantity = quantity + product.quantity;
    }
    const totalPrice = (cart.reduce((first, second) => first + second.price, 0)) * quantity;
    const totalShipping = cart.reduce((first, second) => first + second.shipping, 0);
    const tax = parseFloat((totalPrice * 0.1).toFixed(3));

    // grandTotal = grandTotal.toFixed(3);
    return (
        <div className='shopping-cart'>
            <div>
                <h3>Order Summary</h3>
            </div>
            <div className='cart'>
                <p>Selecteed Items : {quantity}</p>
                <p>Total Price : $ {totalPrice}</p>
                <p>Total Shipping Charge : $ {totalShipping}</p>
                <p>Tax : $ {tax}</p>
                <h4>Grand Total: $ {(totalPrice + totalShipping + tax).toFixed(3)}</h4>
            </div>
            <div className='btns'>
                <button onClick={handleDeleteCart} className='clr-cart'>Clear Cart <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></button>
                <button onClick={gotoOrderReview} className='rvw-order'>Review Order <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter}></FontAwesomeIcon></button>
            </div>
        </div>
    );
};


export { Products, ShoppingCart };