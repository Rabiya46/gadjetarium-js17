import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios-instance";

const getRevewRating = createAsyncThunk(
  "review,getRevewRating",
  async (params) => {
    const response = await axiosInstance.get("/api/reviews/reviews", {
      params: { filter: params },
    });

    const result = await response.data;

    return result;
  }
);

const deleteRevewRating = createAsyncThunk(
  "review,deleteRevewRating",
  async (params, { dispatch }) => {
    const response = await axiosInstance.delete("reviews", {
      params: {
        id: params.id,
      },
    });

    if (response.status === 200) {
      toast.success(response.data.message);
      dispatch(getRevewRating("Все отзывы"));
    } else {
      toast.error(response.data.message);
    }

    return response;
  }
);

const addComment = createAsyncThunk(
  "review/addComment",
  async ({ id, response }, { dispatch }) => {
    const responsee = await axiosInstance.put(`/api/comments/${id}/answer`, {
      response: response,
    });

    if (responsee.status === 200) {
      toast.success(responsee.data.message);
      dispatch(getRevewRating("Все отзывы"));
    } else {
      toast.error(responsee.data.message);
    }

    return responsee;
  }
);

const reviewRating = createSlice({
  name: "review",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getRevewRating.fulfilled, (state, action) => {
      state.data = action.payload;
    }),
});

const ActionReviewRating = reviewRating.actions;
export {
  ActionReviewRating,
  reviewRating,
  getRevewRating,
  deleteRevewRating,
  addComment,
};
