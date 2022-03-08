import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ deleteCartItems, item }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="sa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
