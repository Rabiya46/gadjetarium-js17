import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios-instance";
import { toast } from "react-toastify";

// Получение товаров
export const getProductsThunk = createAsyncThunk(
  "goods/getProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/products", { params });
      return response.data; // только сериализуемые данные
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getProductsBySubproductsThunk = createAsyncThunk(
  "goods/getProductsBySubproductsThunk",

  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/subproducts/${id}/all`,
        {}
      );

      return response.data; // только сериализуемые данные
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Удаление товара
export const removeProductsThunk = createAsyncThunk(
  "goods/removeProduct",
  async ({ params, id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/products/${id}`);
      toast.success(response.data.message);

      // После удаления обновляем список
      dispatch(getProductsThunk(params));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  params: {
    page: 1,
    size: 7,
    endDate: null,
    startDate: null,
    sort: null,
  },
  data: {
    totalElement: 0,
    currentPage: 1,
    products: [],
  },
  localParams: {
    type: "",
    endDate: "",
    startDate: "",
    sort: "",
  },
  isLoading: false,
  errors: {
    getProductsErrorMessage: null,
    removeProductsErrorMessage: null,
  },
  choosedItems: [],
  dataSubproducts: [],
};

const goodsSlice = createSlice({
  name: "goodsSlice",
  initialState,
  reducers: {
    changeParams: (state, action) => {
      state.params = {
        ...state.params,
        [action.payload.key]: action.payload.value,
      };
    },
    changeLocalParams: (state, action) => {
      state.localParams = {
        ...state.localParams,
        [action.payload.key]: action.payload.value,
      };
    },
    changeAllParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
    changeChoosedProducts: (state, action) => {
      const value = action.payload.value;
      state.choosedItems = state.choosedItems.includes(value)
        ? state.choosedItems.filter((id) => id !== value)
        : [...state.choosedItems, value];
    },
    resetChoosedProducts: (state) => {
      state.choosedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.errors.getProductsErrorMessage = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.getProductsErrorMessage = action.payload;
      })

      .addCase(getProductsBySubproductsThunk.pending, (state) => {
        state.isLoading = true;
        state.errors.getProductsErrorMessage = null;
      })
      .addCase(getProductsBySubproductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataSubproducts = action.payload;
      })
      .addCase(getProductsBySubproductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.getProductsErrorMessage = action.payload;
      })

      .addCase(removeProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.errors.removeProductsErrorMessage = null;
      })
      .addCase(removeProductsThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.removeProductsErrorMessage = action.payload;
      });
  },
});

export const actionGoodSlice = goodsSlice.actions;
export default goodsSlice;
