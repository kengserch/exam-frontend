import { Routes, Route } from 'react-router';
import Home from './Home';
import Cart from './Cart';
import './App.css';
import { CartProvider } from './CartContext.jsx';

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </CartProvider>
    );
}

export default App;
