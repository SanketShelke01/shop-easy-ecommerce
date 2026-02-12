import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* REGISTER */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, thunkAPI) => {
    try {
      await api.post("/auth/register", { email, password });
      return { email };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed"
      );
    }
  }
);

/* LOGIN */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      return { email, token: res.data.token };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Invalid credentials"
      );
    }
  }
);

/* LOGOUT */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
);
