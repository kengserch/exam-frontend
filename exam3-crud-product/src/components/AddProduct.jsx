import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddProduct = ({ setcreatedProduct, onAddProduct }) => {
    const [inputs, setInputs] = useState({
        title: '',
        price: '',
        category: '',
        image: null,
        preview: null,
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.title || !inputs.price || !inputs.category) {
            alert('Please fill in all required fields!');
            return;
        }
        if (isNaN(inputs.price) || inputs.price <= 0) {
            alert('Price must be a valid number greater than 0');
            return;
        }
        const newProduct = {
            id: uuidv4(),
            ...inputs,
        };

        onAddProduct(newProduct);
        setInputs({
            title: '',
            price: '',
            category: '',
            image: null,
            preview: null,
        });
        setcreatedProduct(false);
        console.log('Submitted Data:', inputs);
    };

    const handleChange = async (e) => {
        const { name, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            if (file) {
                const objectURL = URL.createObjectURL(file); // ใช้ Object URL ชั่วคราว
                sessionStorage.setItem(`image-${file.name}`, objectURL); // เก็บรูปใน sessionStorage
                setInputs((prev) => ({
                    ...prev,
                    image: `image-${file.name}`, // เก็บชื่อ key แทน
                    preview: objectURL,
                }));
            }
        } else {
            setInputs((prev) => ({
                ...prev,
                [name]: e.target.value,
            }));
        }
    };

    return (
        <>
            <div
                className="bg-black/40 fixed inset-0 flex justify-center items-center z-0 p-4"
                onClick={() => setcreatedProduct(false)}
            >
                <div
                    className="w-[500px] h-auto p-4 bg-zinc-800 rounded-xl z-10 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-end pr-4 pt-3">
                        <button className="text-white" onClick={() => setcreatedProduct(false)}>
                            X
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex p-4 flex-col gap-3 justify-center">
                            <h1 className="text-center text-white">Create Product</h1>
                            {inputs.preview && (
                                <div className="mt-4 relative">
                                    <img
                                        src={inputs.preview}
                                        alt="Preview"
                                        className="w-full h-auto max-h-64 object-cover rounded-md"
                                    />
                                    <button
                                        onClick={() => setInputs((prev) => ({ ...prev, image: null, preview: null }))}
                                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                            <div className="w-full">
                                <label className="block mb-2 text-sm text-white">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block mb-2 text-sm text-white">Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={inputs.title}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    placeholder="title"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block mb-2 text-sm text-white">Product Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={inputs.price}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    placeholder="price"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block mb-2 text-sm text-white">Product Category</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="radio"
                                        name="category"
                                        id="mens-clothing"
                                        value="Men's Clothing"
                                        checked={inputs.category === "Men's Clothing"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="mens-clothing" className="block text-sm text-white">
                                        Men's Clothing
                                    </label>
                                    <input
                                        type="radio"
                                        name="category"
                                        id="womens-clothing"
                                        value="Women's Clothing"
                                        checked={inputs.category === "Women's Clothing"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="womens-clothing" className="block text-sm text-white">
                                        Women's Clothing
                                    </label>
                                    <input
                                        type="radio"
                                        name="category"
                                        id="electronics"
                                        value="Electronics"
                                        checked={inputs.category === 'Electronics'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="electronics" className="block text-sm text-white">
                                        Electronics
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex p-4 justify-center">
                            <button type="submit" className="py-2  w-full bg-lime-300 rounded-3xl">
                                <h1 className="text-black font-medium">Create Product</h1>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
