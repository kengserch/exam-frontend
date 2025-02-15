import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    useEffect(() => {
        fetchMoreProducts();
    }, []);

    const fetchMoreProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://fakestoreapi.com/products`);
            const data = await res.json();
            setProducts((prev) => [...prev, ...data]);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    const lastProductRef = (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchMoreProducts();
            }
        });
        if (node) observer.current.observe(node);
    };

    return (
        <>
            <div className="mx-auto max-w-md md:max-w-7xl p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        ref={index === products.length - 1 ? lastProductRef : null}
                        className="border rounded-lg p-4 shadow-md bg-white"
                    >
                        <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
                        <h2 className="text-lg font-bold mt-2">{product.title}</h2>
                        <p className="text-gray-700">${product.price}</p>
                    </div>
                ))}
                {loading && <div className="text-center w-full py-4">Loading...</div>}
            </div>
        </>
    );
}

export default App;
