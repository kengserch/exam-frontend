import { Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './Home';
import Cart from './Cart';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Provider>
    );
}

export default App;
