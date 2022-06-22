import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem  }) => {
  const { imageUrl, price, name, quantity } = cartItem;
  const {
    addItemToCart,
    reduceItemFromCart,
    removeProductFromCart,
  } = useContext(CartContext);

  const addItem = () => {
    addItemToCart(cartItem);
  }
  const reduceItem = () => {
    reduceItemFromCart(cartItem);
  }
  const removeItem = () => {
    removeProductFromCart(cartItem);
  }
  return (
    <div className="checkout-item-container">
    <div className="image-container">
      <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="item-text name">{name}</span>
      <span className="item-text quantity">
        <div className="arrow" onClick={reduceItem}>&#10094;</div> 
        <span className="value">{quantity}</span> 
        <div className="arrow" onClick={addItem}>&#10095;</div>
      </span>
      <span className="item-text price">{price}</span>
      <div className="remove-button" onClick={removeItem}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
