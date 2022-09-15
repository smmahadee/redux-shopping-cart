import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, remove } from '../../redux/product/productSlice';
import { saveProductToLocalStorage } from '../../utils/fetchCartData';

function ProductItem({ product }) {
  const {cartItems} = useSelector(state => state.product)
  const [isProductAdded, setIsProductAdded] = useState(false);
  const { title, price, image } = product;
  const dispatch = useDispatch();

  const curItem = cartItems.find(item => item.id === product.id);

  const addToCartHandler = product => {
    if (!isProductAdded) {
      dispatch(addToCart(product));
      setIsProductAdded(true);
    } else {
      dispatch(remove(product.id));
      setIsProductAdded(false)
    }
  };

  useEffect(() => {
    saveProductToLocalStorage(cartItems)
    if(curItem?.amount > 0) setIsProductAdded(true)
  }, [cartItems, curItem])

  return (
    <div className='product-box'>
      <img src={image} alt={title} />
      <h4>{String(title).slice(0, 10)}</h4>
      <p>${price}</p>

      <div className='addToCart2'>
        <img src='minus.png' alt='' className='none' />
        <button onClick={() => addToCartHandler(product)}>{curItem?.amount > 0 ?  'Remove Item' : 'Add To Cart' }</button>
        <img src='plus.png' alt='' className='none' />
      </div>
    </div>
  );
}
export default ProductItem;
