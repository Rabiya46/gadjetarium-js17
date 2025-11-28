import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios-instance";
import { getProductsThunk } from "./goods-slice";
import { toast } from "react-toastify";

export const postDiscountThunk = createAsyncThunk(
  "postDiscountThunk/createDiscount",
  async ({ data, params }, { dispatch }) => {
    try {
      const values = {
        discount: data.amountOfDiscount,
        startDate: data.startDate,
        endDate: data.endDate,
        ids: data.productId,
      };

      const response = await axiosInstance.post("/api/discounts", values);

      dispatch(getProductsThunk(params));

      return response.data;
    } catch (error) {
      const message =
        error.response.data.endDate + " " + error.response.data.startDate;

      toast.error(error.response.data.message || message);
      return error;
    }
  }
);

const initialState = {
  isLoading: false,
};

const createDiscount = createSlice({
  name: "createDiscount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postDiscountThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(postDiscountThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postDiscountThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const actionCreateDiscount = createDiscount.actions;

export default createDiscount;
