import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from './store/cartSlice';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="mx-auto max-w-md md:max-w-7xl p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Shopping Cart</h1>
                <Link to="/" className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                    Back to Shop
                </Link>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                            >
                                <div className="flex items-center space-x-4">
                                    <figure className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-lg border">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={item.image}
                                            alt={item.title}
                                        />
                                    </figure>
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.title}</h2>
                                        <p className="text-gray-600">${item.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span className="text-lg font-medium">Qty: {item.quantity}</span>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg shadow flex justify-between items-center">
                <h2 className="text-xl font-semibold">Total: {totalItems} items</h2>
                <h2 className="text-xl font-semibold text-green-600">${totalPrice}</h2>
            </div>
        </div>
    );
}

export default Cart;
