import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  challenges: null,
  fetchChallengesLoading: false,
  createChallengeLoading: false,
  createChallengeSuccess: false,
  createChallengeError: false,
};

// Function to create a challenge
export const createChallenge = createAsyncThunk(
  "challenge/create",
  async (challengeInfo, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/challenge/new", challengeInfo, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to fetch all the challenges
export const fetchChallenges = createAsyncThunk(
  "challenges/fetch-challenges",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/challenge");
      return response.data.challenges;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to accept a challenge
export const acceptChallenge = createAsyncThunk(
  "challenge/accept",
  async (challengeInfo, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/challenge/accept", challengeInfo);
      return response.data.challenges;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const challengeSlice = createSlice({
  name: "challenge",
  initialState,

  reducers: {
    createChallengeReset: (state) => {
      state.createChallengeLoading = false;
      state.createChallengeSuccess = false;
      state.createChallengeError = false;
    },
  },

  extraReducers: (builder) => {
    // Get all challenges cases
    builder.addCase(fetchChallenges.pending, (state) => {
      state.fetchChallengesLoading = true;
    });
    builder.addCase(fetchChallenges.fulfilled, (state, action) => {
      state.fetchChallengesLoading = false;
      state.isError = false;
      state.error = null;
      state.challenges = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchChallenges.rejected, (state, action) => {
      state.fetchChallengesLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.isSuccess = false;
    });

    // Create a challenge cases
    builder.addCase(createChallenge.pending, (state) => {
      state.createChallengeLoading = true;
    });
    builder.addCase(createChallenge.fulfilled, (state, action) => {
      state.createChallengeLoading = false;
      state.createChallengeError = false;
      state.error = null;
      // state.challenges = action.payload;
      state.createChallengeSuccess = true;
    });
    builder.addCase(createChallenge.rejected, (state, action) => {
      state.createChallengeLoading = false;
      state.createChallengeError = true;
      state.error = action.payload;
      state.createChallengeSuccess = false;
    });

    // Accept challenge cases
    builder.addCase(acceptChallenge.fulfilled, (state, action) => {
      state.challenges = action.payload;
    });
  },
});

export const { createChallengeReset } = challengeSlice.actions;
export default challengeSlice.reducer;
