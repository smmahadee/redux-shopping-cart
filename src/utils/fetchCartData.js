
export const saveProductToLocalStorage = (cartItems) => {
    if (typeof window !== 'undefined') {
         localStorage.setItem('cart', JSON.stringify(cartItems));
    }
}



