import { useState } from 'react';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeMultiple, updateCartItems } from '../../redux/product/productSlice';

function Cart() {
  const dispatch = useDispatch();
  const [isCartClosed, setIsCartClosed] = useState(true);
  const { cartItems, amount, total } = useSelector(state => state.product);

  const markedItem = cartItems.filter(x => x.isChecked === true)

  return (
    <div
      className={`cart-container ${isCartClosed ? 'cart-container-close' : ''}`}
    >
      <section className='cart'>
        <header>
          <h2>{!amount ? 'Cart Empty' : 'Your Cart'} </h2>
          <button
            className='cart-close-btn'
            onClick={() => setIsCartClosed(true)}
          >
            Close
          </button>
        </header>
        <button
          className={`item-select-btn ${cartItems.length > 1 ? '' : 'none'}`}
          onClick={() => {
            dispatch(updateCartItems(cartItems.map(x => x.id)))
          }}
        >
          Select All
        </button>
        <div>
          {cartItems.map(item => {
            if (item.amount > 0) {
              return (
                <CartItem
                  key={item.id}
                  cartItem={item}
        
                />
              );
            }
            return '';
          })}
        </div>
        <button
          className={`item-remove-btn ${markedItem.length > 0 ? '' : 'none'}`}
          onClick={() => dispatch(removeMultiple())}
        >
          Remove
        </button>
        <footer>
          <hr />
          <div className='cart-total'>
            <h4>
              total <span>${total}</span>
            </h4>
          </div>
          <button className='btn clear-btn'>Checkout</button>
        </footer>
      </section>

      <div
        className={`cart-button ${isCartClosed ? '' : 'none'}`}
        onClick={() => setIsCartClosed(false)}
      >
        <h4>{amount} Items</h4>
        <h3>${total}</h3>
        <span>Details &rarr;</span>
      </div>
    </div>
  );
}
export default Cart;
