import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios-instance";
import { GADJEDTARIUM_LOGIN_INFO } from "../../utils/constants/fetch";
import {
  fetchDiscountProduct,
  fetchNewProduct,
  fetchRecomendationProduct,
} from "./product-slice";

export const fetchDataSignin = createAsyncThunk(
  "authenticationSlice/fetchDataSignin",

  async ({ values, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/login`, values);
      const data = response.data;

      dispatch(fetchDiscountProduct(5));
      dispatch(fetchNewProduct(5));
      dispatch(fetchRecomendationProduct(5));

      toast.success("Вы успешно вошли в аккаунт!");

      if (data?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      return data;
    } catch (error) {
      if (error.response.data.password || error.response.data.message) {
        toast.error(
          error.response.data.message || error.response.data.password
        );
      }
      if (rejectWithValue) {
        return error;
      }
      return error;
    }
  }
);

export const fetchDataSignup = createAsyncThunk(
  "authenticationSlice/fetchDataSignup",

  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/sign-up`, values);
      const data = response.data;

      toast.success("Вы успешно зарегистрировались!");

      navigate("/");

      return data;
    } catch (error) {
      // console.log(error);
      if (error.response.data.password || error.response.data.message) {
        toast.error(
          error.response.data.message || error.response.data.password
        );
      }
      if (rejectWithValue) {
        return error;
      }
      return error;
    }
  }
);

export const authWithGoogle = createAsyncThunk(
  "authenticationSlice/authWithGoogle",

  async ({ tokenId, navigate, isSignUp }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/api/auth/google`, {
        idToken: tokenId,
      });

      // 💾 Сохраняем данные сразу, если есть токен
      // if (data?.token) {
      localStorage.setItem(GADJEDTARIUM_LOGIN_INFO, JSON.stringify(data));
      // }

      toast.success(
        isSignUp
          ? "Вы успешно вошли в аккаунт!"
          : "Вы успешно зарегистрировались!"
      );

      if (data?.role === "ADMIN") {
        navigate("/admin");
      }

      navigate("/");

      return data;
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      if (rejectWithValue) {
        return error;
      }
      return error;
    }
  }
);

const initialState = {
  data: {},
  isLoading: false,
  isAuthenticated: false,
};

const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState,
  reducers: {
    authLogOut: (state) => {
      state.data = {};
      state.isAuthenticated = false;
      state.data = initialState.data;
      localStorage.removeItem(GADJEDTARIUM_LOGIN_INFO);
    },
    getUserData: (state, action) => {
      state.isAuthenticated = true;
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataSignin.fulfilled, (state, action) => {
        const { email, role, token } = action.payload;
        if (email && role && token) {
          localStorage.setItem(
            GADJEDTARIUM_LOGIN_INFO,
            JSON.stringify(action.payload)
          );
        }
        state.data = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchDataSignin.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchDataSignin.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchDataSignup.fulfilled, (state, action) => {
        const { email, role, token } = action.payload;
        if (email && role && token) {
          localStorage.setItem(
            GADJEDTARIUM_LOGIN_INFO,
            JSON.stringify(action.payload)
          );
          state.data = action.payload;
        }
        state.isLoading = false;
      })

      .addCase(fetchDataSignup.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchDataSignup.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(authWithGoogle.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(authWithGoogle.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(authWithGoogle.fulfilled, (state, action) => {
        const { email, role, token } = action.payload;
        if (email && role && token) {
          // console.log(action);
          localStorage.setItem(
            GADJEDTARIUM_LOGIN_INFO,
            JSON.stringify(action.payload)
          );
        }

        state.data = action.payload;
        state.isLoading = false;
      });
  },
});

export const ActionauthenticationSlice = authenticationSlice.actions;
const reducerAuthenticationSlice = authenticationSlice.reducer;
export default reducerAuthenticationSlice;
