import { createSlice } from "@reduxjs/toolkit";


const storedCart = localStorage.getItem("cartItems")
const initialState = {
    items: storedCart ? JSON.parse(storedCart) : [],
};


const saveToStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
};  


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });

            }
            saveToStorage(state.items);
        },
        removeFromCart(state, action) {
            
            state.items = state.items.filter((i) => i.id !== action.payload);
            saveToStorage(state.items);
        },

        increaseQuantity(state, action) {
            const item = state.items.find((i) => i.id === action.payload);  
            if (item) {
                item.quantity += 1;
            }
            saveToStorage(state.items);

        },

        decreaseQuantity(state, action) {
            const item = state.items.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            saveToStorage(state.items);
        },

        clearCart(state) {
            state.items = [];
            localStorage.removeItem("cartItems");
        }
    },
});
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;