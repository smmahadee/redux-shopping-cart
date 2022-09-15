import axios from "axios";

export const initialState = {
    isLoading: false,
    productData: [],
    error: '',
  };
  
export  const productReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCT_REQUESTED':
        return {
          ...state,
          isLoading: true,
        };
      case 'FETCH_PRODUCT_SUCCESS':
        return {
          ...state,
          isLoading: false,
          productData: action.payload,
        };
      case 'FETCH_PRODUCT_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        break;
    }
  };
  
  export const fetchProduct = async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_PRODUCT_REQUESTED' });
      const response = await axios.get('https://fakestoreapi.com/products/');
      const data = response.data.map(d => ({ ...d, amount: 0, price: Math.floor(d.price), isChecked: false }));
      dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: [...data] });
    } catch (err) {
      dispatch({
        type: 'FETCH_PRODUCT_FAILURE',
        payload: err.message,
      });
      console.log(err);
    }
  };