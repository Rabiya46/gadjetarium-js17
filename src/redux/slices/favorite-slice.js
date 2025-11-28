import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios-instance";
import { fetchDataCatalog } from "./catalog-slice";
import { getProductDetailThunk } from "./product-details-slice";
import {
  fetchDiscountProduct,
  fetchNewProduct,
  fetchRecomendationProduct,
} from "./product-slice";

const getFavoriteProducts = createAsyncThunk(
  "favorite/getFavoriteProducts",
  async () => {
    try {
      const response = await axiosInstance.get("/api/favorites/getAll");
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

const postFavoriteProducts = createAsyncThunk(
  "favorite/postFavoriteProducts",
  async (params, { dispatch }) => {
    try {
      const response = await axiosInstance.post(
        `/api/favorites/${params.productId}`
      );
      const data = await response.data;

      dispatch(getFavoriteProducts());
      dispatch(fetchDataCatalog(params.dataCatalog));

      dispatch(
        getProductDetailThunk({
          product: params.productId,
          attribute:
            params.attribute === "characteristics"
              ? "Характеристики"
              : params.attribute === "description"
              ? "Описание"
              : "Отзывы",
        })
      );

      dispatch(fetchDiscountProduct(params.size.discount));
      dispatch(fetchNewProduct(params.size.news));
      dispatch(fetchRecomendationProduct(params.size.recomendation));

      return data;
    } catch (error) {
      return error;
    }
  }
);

const postAllBasketFavorite = createAsyncThunk(
  "favorite/postAllBasketFavorite",
  async (params, { dispatch }) => {
    try {
      const response = await axiosInstance.post(
        `/api/baskets/add-to-favorite`,
        { ids: params }
      );
      const data = await response.data;

      dispatch(getFavoriteProducts());

      return data;
    } catch (error) {
      return error;
    }
  }
);

const deleteFavoriteAllProducts = createAsyncThunk(
  "favorite/deleteFavoriteAllProducts",
  async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.delete("/api/favorites/clear");
      const data = await response.data;

      dispatch(getFavoriteProducts());

      return data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const favoriteProducts = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getFavoriteProducts
      .addCase(getFavoriteProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFavoriteProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFavoriteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // postFavoriteProducts
      .addCase(postFavoriteProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postFavoriteProducts.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(postFavoriteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // postAllBasketFavorite
      .addCase(postAllBasketFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAllBasketFavorite.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(postAllBasketFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // deleteFavoriteAllProducts
      .addCase(deleteFavoriteAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFavoriteAllProducts.fulfilled, (state) => {
        state.data = [];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteFavoriteAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const ActionFavorite = favoriteProducts.actions;
export {
  favoriteProducts,
  getFavoriteProducts,
  postFavoriteProducts,
  postAllBasketFavorite,
  deleteFavoriteAllProducts,
};
