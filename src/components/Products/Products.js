import { faDeleteLeft, faShoppingCart, faUpRightAndDownLeftFromCenter, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getCartFromDb } from '../../utilities/fakedb';
import './Products.css'


const Products = () => {


    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const totalPage = Math.ceil(count / size);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products);
            })
    }, [page, size]);


    useEffect(() => {
        let restoreCart = getCartFromDb();
        let savedCard = [];

        const ids = Object.keys(restoreCart);
        console.log(ids);

        fetch('http://localhost:5000/productsbyid', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(ids)

        })
            .then(res => res.json())
            .then(data => {

                for (const id in restoreCart) {
                    let addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        addedProduct.quantity = restoreCart[id];
                        savedCard.push(addedProduct);
                        // console.log(savedCard);
                    }
                }
                setCart(savedCard);
            })
    }, [])
    let handleDeleteCart = () => {
        deleteShoppingCart();
        setCart([]);
    }

    let handleAddToCart = (selectedProduct) => {
        // console.log(product);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id)
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];

        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }



        setCart(newCart);
        addToDb(selectedProduct._id)

    }

    return (
        <div className='product-container'>
            <div className='card-container'>
                {
                    products.map(product => <Product
                        key={product._id}
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
            <div className='pagination'>
                {
                    [...Array(totalPage).keys()].map(number => <button
                        key={number}
                        number={number}
                        className={number === page && 'selected'}
                        onClick={() => setPage(number)}
                    >
                        {number}
                    </button>)
                }
                <select onChange={(event) => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected >10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
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
                <button onClick={() => navigate('/Shipping')} className='shipment'>Procceed Shipment <FontAwesomeIcon icon={faShippingFast}></FontAwesomeIcon></button>
            </div>
        </div>
    );
};


export { Products, ShoppingCart };