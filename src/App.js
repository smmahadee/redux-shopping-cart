import Navbar from './components/navbar/Navbar';
import Cart from './components/cart/Cart';
import ProductList from './components/product/ProductList';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <ProductList />
        <Cart />
      </main>
    </>
  );
}

export default App;
