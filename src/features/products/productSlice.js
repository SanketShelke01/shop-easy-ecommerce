import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById} from "./productThunks";

const initialState = {
    items : [],
    selectedProduct : null,
    loading : false,
    error : null

};

const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {
        // You can add synchronous reducers here if needed
        clearSelectedProduct(state){
            state.selectedProduct = null;
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
            state.error = null;
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });

        //single product details
        builder
        .addCase(fetchProductById.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductById.fulfilled, (state, action)=>{
            state.loading = false;
            state.selectedProduct = action.payload;
            state.error = null;
        })
        .addCase(fetchProductById.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }); 

        
    }
});

export const {clearSelectedProduct} = productSlice.actions;
export default productSlice.reducer;