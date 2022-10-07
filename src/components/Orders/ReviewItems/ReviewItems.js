import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './ReviewItems.css'

const ReviewItems = ({ cartProduct, handleRmvItem }) => {
    const { id, name, quantity, price, img, shipping } = cartProduct;
    return (
        <div className='reviewItem'>
            <div className='review-item-img-container'>
                <img src={img} alt="" />
            </div>
            <div className='review-item-body-container'>
                <div className='review-item-details-container'>
                    <p>{name}</p>
                    <p><small>Price : ${price}</small></p>
                    <p><small>Quantity : {quantity}</small></p>
                    <p><small>Shipping Cost : ${shipping}</small></p>
                </div>
                <div className='review-item-btn-container'>
                    <button className='delete-btn'>
                        <FontAwesomeIcon onClick={() => handleRmvItem(id)} className='delete-icon' icon={faTrashArrowUp}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div >

    );
};

export default ReviewItems;