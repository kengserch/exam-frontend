import { useState, useEffect } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [createdProduct, setcreatedProduct] = useState(false);

    useEffect(() => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
          try {
              setProducts(JSON.parse(storedProducts));
          } catch (error) {
              console.error('Error parsing localStorage data:', error);
              setProducts([]);
          }
      }
  }, []);
  
  useEffect(() => {
      if (products.length > 0) {  
          localStorage.setItem('products', JSON.stringify(products));
      }
  }, [products]);

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleEditProduct = (productToUpdate) => {
        const updatedProducts = products.map((product) =>
            product.id === productToUpdate.id ? productToUpdate : product
        );
        setProducts(updatedProducts);
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    const handleCreateProduct = () => {
        setcreatedProduct(true);
    };

    return (
        <>
            <div className="container mx-auto max-w-2xl md:max-w-6xl mt-6">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Product List</h1>
                    <button
                        onClick={handleCreateProduct}
                        className="text-xl font-bold text-white bg-cyan-950 p-3 cursor-pointer rounded-3xl"
                    >
                        Add Product
                    </button>
                    {createdProduct && (
                        <AddProduct setcreatedProduct={setcreatedProduct} onAddProduct={handleAddProduct} />
                    )}
                </div>
                <ProductList products={products} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} />
            </div>
        </>
    );
}

export default App;
