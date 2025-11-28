import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios-instance";
import { toast } from "react-toastify";

const postProductToBasket = createAsyncThunk(
  "basket/postProductToBasket",
  async (params, { dispatch }) => {
    try {
      const response = await axiosInstance.post(
        "/api/baskets/add",
        {},
        {
          params,
        }
      );

      const result = await response.data;

      dispatch(getBasketProduct());

      return result;
    } catch (error) {
      toast.error(error.response.data.message);
      return error;
    }
  }
);

const getBasketProduct = createAsyncThunk(
  "basket/getOrderPrdoducts",
  async () => {
    try {
      const response = await axiosInstance.get("/api/baskets");

      return response;
    } catch (error) {
      return error;
    }
  }
);

const postProductToFavorite = createAsyncThunk(
  "basket/postProductToFavorite",
  async (data, { dispatch }) => {
    try {
      const response = await axiosInstance.post("/api/baskets/favorite", {
        data: { ids: data },
      });
      const result = await response.data;

      dispatch(getBasketProduct());
      return result;
    } catch (error) {
      return error;
    }
  }
);

const deleteProductBasket = createAsyncThunk(
  "basket/deleteProduct",
  async (data, { dispatch }) => {
    const response = await axiosInstance.delete("api/baskets/delete", {
      data: { ids: data },
    });
    const result = await response.data;

    dispatch(getBasketProduct());

    return result;
  }
);

const getBasketInfographic = createAsyncThunk(
  "basket/getInfographic",
  async (subproductIds) => {
    const response = await axiosInstance.post("api/baskets/infographic", {
      ids: subproductIds,
    });
    const result = await response.data;
    return result;
  }
);

const updateProductCount = createAsyncThunk(
  "basket/updateProductCount",
  async ({ subproductId, isPositive }, { dispatch }) => {
    const response = await axiosInstance.post(
      `api/baskets/selected-count`,
      null,
      {
        params: {
          subproductId,
          isPositive,
        },
      }
    );
    const result = await response.data;

    // Обновляем корзину после изменения количества
    dispatch(getBasketProduct());

    return result;
  }
);

const initialState = {
  data: [],
  isLoading: false,
  sumOrderData: {},
  infographic: null,
  isInfographicLoading: false,
};

const basketProducts = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addSumOrderData: (state, action) => {
      state.sumOrderData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBasketProduct.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })

      .addCase(getBasketProduct.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getBasketProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getBasketInfographic.pending, (state) => {
        state.isInfographicLoading = true;
      })
      .addCase(getBasketInfographic.fulfilled, (state, action) => {
        state.isInfographicLoading = false;
        state.infographic = action.payload;
      })
      .addCase(getBasketInfographic.rejected, (state) => {
        state.isInfographicLoading = false;
      });
  },
});

export const ActionBasket = basketProducts.actions;
export {
  basketProducts,
  postProductToBasket,
  getBasketProduct,
  postProductToFavorite,
  deleteProductBasket,
  updateProductCount,
  getBasketInfographic,
};
