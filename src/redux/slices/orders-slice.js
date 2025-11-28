import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios-instance";
import { toast } from "react-toastify";

const getOrderProducts = createAsyncThunk(
  "orders/getOrderPrdoducts",
  async (params) => {
    try {
      const response = await axiosInstance.get(`/api/orders`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
);

const getOrderProductsById = createAsyncThunk(
  "orders/getOrderProductsById",
  async ({ orderId }) => {
    try {
      const response = await axiosInstance.get(`/api/orders/${orderId}`, {});

      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
);

const updateOrderProducts = createAsyncThunk(
  "orders/updateOrderProducts",
  async ({ id, orderStatus, currentStatus, currentPage }, { dispatch }) => {
    try {
      const response = await axiosInstance.put(
        `adminOrders`,
        {},
        {
          params: {
            id,
            orderStatus,
          },
        }
      );

      dispatch(
        getOrderProducts({
          orderStatus: currentStatus || "WAITING",
          page: currentPage || 1,
          size: 7,
        })
      );

      dispatch(getOrderInforaphic());

      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
);

const deleteOrderProducts = createAsyncThunk(
  "orders/deleteOrderProducts",
  async ({ id, currentStatus, currentPage }, { dispatch }) => {
    try {
      const response = await axiosInstance.delete(`/api/orders/${id}`, {});

      dispatch(
        getOrderProducts({
          orderStatus: currentStatus || "WAITING",
          page: currentPage || 1,
          size: 7,
        })
      );

      toast.success(response?.data?.message);

      dispatch(getOrderInforaphic());

      return response.data;
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message);
      throw new Error();
    }
  }
);

const getOrderInforaphic = createAsyncThunk(
  "orders/getOrderInforaphic",
  async ({ value }) => {
    try {
      const response = await axiosInstance.get(
        `/api/infographics?value=${value}`
      );

      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
);

const initialState = {
  data: {},
  dataByID: {},
  dataInfo: {},
  isLoading: false,
  infoIsLoading: false,
};

const ordersProduct = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getOrderProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })

      .addCase(getOrderProducts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getOrderProducts.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getOrderProductsById.fulfilled, (state, action) => {
        state.dataByID = action.payload;
        state.isLoading = false;
      })

      .addCase(getOrderProductsById.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getOrderProductsById.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getOrderInforaphic.fulfilled, (state, action) => {
        state.dataInfo = action.payload;
        state.infoIsLoading = false;
      })

      .addCase(getOrderInforaphic.pending, (state) => {
        state.infoIsLoading = true;
      })

      .addCase(getOrderInforaphic.rejected, (state) => {
        state.infoIsLoading = false;
      });
  },
});

export const ActionOrderProduct = ordersProduct.actions;
export {
  ordersProduct,
  getOrderProducts,
  getOrderProductsById,
  updateOrderProducts,
  deleteOrderProducts,
  getOrderInforaphic,
};
