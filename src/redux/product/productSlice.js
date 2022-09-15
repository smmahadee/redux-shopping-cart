import {createSlice } from '@reduxjs/toolkit';


const cartFromLocalStorage =
  (typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('cart'))) ||
  [];


const initialState = {
  isLoading: false,
  cartItems: cartFromLocalStorage ,
  total: 0,
  amount: 0,
  error: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, {...action.payload, amount: 1}]
      state.amount++;
      state.total += action.payload.price;
    },

    increase: (state, action) => {
      const updatedItems = state.cartItems.map(item => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });

      state.cartItems = updatedItems;
      // state.productData[0].amount++;
    },

    decrease: (state, action) => {
      const updatedItems = state.cartItems.map(item => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      }).filter(item => item.amount !== 0)

      state.cartItems = updatedItems;
    },

    getTotals: state => {
      const { amount, total } = state.cartItems.reduce(
        (acc, item) => {
          if (item.amount > 0) {
            acc.amount++;
          }
          acc.total += Math.floor(item.price) * item.amount;
          return acc;
        },
        {
          total: 0,
          amount: 0,
        }
      );

      state.amount = amount;
      state.total = total;
    },

    remove: (state, action) => {
      const updatedProduct = state.cartItems.filter(item => item.id !== action.payload)
      state.cartItems = updatedProduct;
    },

    removeMultiple: (state) =>  {
      const updatedCartItems = state.cartItems.filter(item => item.isChecked !== true)
      state.cartItems = updatedCartItems;
    },

    updateCartItems: (state, action) => {
      const updatedCartItems = state.cartItems.map(item => {
       const curId = action.payload.find(x => x === item.id);
        if(curId) {
         return {...item, isChecked: !item.isChecked}
        } 
        return item;
      })

      state.cartItems = updatedCartItems;
    }
  },

});

export default productSlice.reducer;
export const { increase, decrease, getTotals, remove, addToCart, removeMultiple, updateCartItems } = productSlice.actions;
