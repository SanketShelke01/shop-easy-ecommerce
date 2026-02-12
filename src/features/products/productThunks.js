import { createAsyncThunk } from "@reduxjs/toolkit";

//Fetch all products

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_,thunkAPI)=>{
        try {
            const response = await fetch("https://fakestoreapi.com/products");

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);


        }

    }
);

// Fetch single product by id

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, thunkAPI)=>{
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);        
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }   
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }       
    }
);
        