import { useState } from 'react';
import EditProduct from './EditProduct';

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
    const [editProduct, setEditProduct] = useState(null); // เก็บสินค้าที่ต้องแก้ไข

    const getImageURL = (imageKey) => {
        return sessionStorage.getItem(imageKey) || '';
    };

    return (
        <div className="grid grid-cols-3 justify-items-center gap-6 mt-12">
            {products.map((product) => (
                <div className="flex flex-col gap-4 shadow-md rounded-2xl p-6 w-full" key={product.id}>
                    {product.image && (
                        

                        <figure className="w-full h-40 rounded-2xl flex items-center justify-center overflow-hidden">
                                <img className="w-full h-full object-cover " src={getImageURL(product.image)} alt={product.title} />
                       </figure>
                    )}
                    <div>
                        <p className="text-lg font-bold">Product name</p>
                        <p className="text-xl">- {product.title}</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">Product Price</p>
                        <p className="text-xl">- ${product.price}</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">Product Category</p>
                        <p className="text-xl">- {product.category}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="text-sm font-bold text-white bg-amber-600 p-2 cursor-pointer rounded-xl"
                            onClick={() => setEditProduct(product)} // เซ็ตสินค้าที่ต้องแก้ไข
                        >
                            Edit
                        </button>
                        <button
                            className="text-sm font-bold text-white bg-red-600 p-2 cursor-pointer rounded-xl"
                            onClick={() => onDeleteProduct(product.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* แสดง EditProduct ถ้ามีสินค้าเลือก */}
            {editProduct && (
                <EditProduct setEditProduct={setEditProduct} onEditProduct={onEditProduct} product={editProduct} />
            )}
        </div>
    );
};

export default ProductList;
