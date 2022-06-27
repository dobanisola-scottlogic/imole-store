import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

import { CartIconContainer, ItemCount } from './cart-icon.styles';
import { toggleCart } from '../../store/cart/cart.action';

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount  = useSelector(selectCartCount);
  const isCartOpen  = useSelector(selectIsCartOpen);
  const toggleIsCartOpen = () => dispatch(toggleCart(!isCartOpen));


  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
