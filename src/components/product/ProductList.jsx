import { useEffect, useReducer} from 'react';
import ProductItem from './ProductItem';
import { fetchProduct, initialState, productReducer } from './productReducer';

function ProductList() {
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialState
  );
  const { isLoading, productData } = productState;

  useEffect(() => {
    fetchProduct(productDispatch);
  }, []);

  return (
    <div className='container'>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading &&
        productData.length &&
        productData.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
}
export default ProductList;
