import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts, addToCart } from './store/cartSlice';

function Home() {
    const dispatch = useDispatch();
    const { products, status, cart } = useSelector((state) => state.cart);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="mx-auto max-w-md md:max-w-7xl">
            <div className="flex justify-between mt-11">
                <h1 className="text-4xl font-bold mb-4">Product List</h1>
                <div className="flex gap-2 items-center">
                    <h2 className="text-lg">
                        Total: {totalItems} items - ${totalPrice}
                    </h2>
                    <Link to="/cart" className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                        Go to Cart
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 justify-items-center md:grid-cols-4 mt-20">
                {products.map((product) => (
                    <div key={product.id} className="p-4 w-full rounded-lg shadow-lg flex flex-col items-center">
                        <figure className="w-32 h-40 overflow-hidden">
                            <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
                        </figure>
                        <div>
                            <h2 className="text-base font-semibold text-center mt-2">{product.title}</h2>
                            <p className="text-gray-600 text-center">$ {product.price}</p>
                        </div>
                        <button
                            className="px-4 py-2 bg-amber-300 rounded mt-4"
                            onClick={() => dispatch(addToCart(product))}
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
