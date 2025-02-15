import './App.css';
import usePagination from './hooks/usePagination';
const API_URL = 'https://fakestoreapi.com/products';

function App() {
    const { data, currentPage, totalPages, nextPage, prevPage } = usePagination(API_URL, 6);
    return (
        <>
            <div className="mx-auto max-w-md md:max-w-7xl">
                <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>

                <div className="grid grid-cols-1 gap-5 justify-items-center md:grid-cols-3 ">
                    {data.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow flex flex-col items-center w-full">
                            <figure className="w-32 h-40 flex items-center justify-center overflow-hidden">
                                <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
                            </figure>
                            <h2 className="text-lg font-semibold text-center mt-2">{product.title}</h2>
                            <p className="text-gray-600">$ {product.price}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="font-bold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
