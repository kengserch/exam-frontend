import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
    const response = await fetch(API_URL);
    return response.json();
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        cart: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.cart.findIndex((item) => item.id === action.payload);
            if (itemIndex !== -1) {
                if (state.cart[itemIndex].quantity > 1) {
                    state.cart[itemIndex].quantity -= 1;
                } else {
                    state.cart.splice(itemIndex, 1);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
