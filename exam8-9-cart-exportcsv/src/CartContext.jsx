import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const API_URL = 'https://fakestoreapi.com/products';
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0)
        );
    };

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return <CartContext.Provider value={{ data, cart, removeFromCart, addToCart,totalItems,totalPrice }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    return useContext(CartContext);
};
