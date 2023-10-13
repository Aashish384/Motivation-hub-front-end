import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  myProfile: null,
  userProfile: null,
  myProfileLoading: false,
  userProfileLoading: false,
  error: null,
  isError: false,
  isEditMyProfileError: false,
  isSuccess: false,
  isEditMyProfileSuccess: false,
  editMyProfileLoading: false,
  sendFriendRequestLoading: false,
  sendFriendRequestSuccess: false,
  isSendFriendRequestError: false,
  getFriendRequestsLoading: false,
  getFriendRequestsSuccess: false,
  getFriendRequestsError: false,
  friendRequests: null,
  acceptFriendRequestSuccess: false,
  removeFriendSuccess: false,
  friends: null,
  friendsLoading: false,
  friendsSuccess: false,
  friendsError: false,
};

// Get user profile
export const getMyProfile = createAsyncThunk("profile/get", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/get");
    return response.data.myProfile;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

// Get other users profile
export const getUserProfile = createAsyncThunk(
  "profile/get-user-profile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/get/${userId}`);
      return response.data.userProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Edit user profile
export const editProfile = createAsyncThunk(
  "profile/edit",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/edit", profileData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.myProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Send a friend request
export const sendFriendRequest = createAsyncThunk(
  "profile/send-friend-request",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/add-friend", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Accept a friend request
export const acceptFriendRequest = createAsyncThunk(
  "profile/accept-friend-request",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/accept-friend", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Remove a friend
export const removeFriend = createAsyncThunk(
  "profile/remove-friend",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/remove-friend", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Get friend requests
export const getFriendRequests = createAsyncThunk(
  "profile/get-friend-requests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/friends?filter=received");
      return response.data.friendRequests;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Get friend requests
export const getFriends = createAsyncThunk(
  "profile/get-friends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/friends?filter=accepted");
      return response.data.friendRequests;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    reset: (state) => {
      // state.myProfileLoading = false;
      state.error = null;
      state.isError = false;
      state.isEditMyProfileError = false;
      state.isSuccess = false;
      state.isEditMyProfileSuccess = false;
      state.editMyProfileLoading = false;
      state.userProfile = null;
      state.userProfileLoading = false;
      state.getFriendRequestsError = false;
      state.getFriendRequestsLoading = false;
      state.getFriendRequestsSuccess = false;
    },
    editMyProfileReset: (state) => {
      state.editMyProfileLoading = false;
      state.isEditMyProfileSuccess = false;
      state.isEditMyProfileError = false;
    },
    setMyProfileLoading: (state, action) => {
      // state.myProfileLoading = action.payload;
    },
    removeMyProfile: (state, action) => {
      // state.myProfile = null;
    },
  },

  extraReducers: (builder) => {
    // Fetch my profile cases
    builder.addCase(getMyProfile.pending, (state, action) => {
      state.myProfileLoading = true;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.myProfileLoading = false;
      state.error = null;
      state.isError = false;
      state.isSuccess = true;
      state.myProfile = action.payload;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.myProfileLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.isSuccess = false;
    });

    // Fetch user profile cases
    builder.addCase(getUserProfile.pending, (state, action) => {
      state.userProfileLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfileLoading = false;
      state.error = null;
      state.isError = false;
      state.isSuccess = true;
      state.userProfile = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.userProfileLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.isSuccess = false;
    });
    // Fetch received friend requests cases
    builder.addCase(getFriendRequests.pending, (state, action) => {
      state.getFriendRequestsLoading = true;
    });
    builder.addCase(getFriendRequests.fulfilled, (state, action) => {
      state.getFriendRequestsLoading = false;
      state.error = null;
      state.getFriendRequestsError = false;
      state.getFriendRequestsSuccess = true;
      state.friendRequests = action.payload;
    });
    builder.addCase(getFriendRequests.rejected, (state, action) => {
      state.getFriendRequestsLoading = false;
      state.error = action.payload;
      state.getFriendRequestsError = true;
      state.getFriendRequestsSuccess = false;
    });

    // Fetch friends cases
    builder.addCase(getFriends.pending, (state, action) => {
      state.friendsLoading = true;
    });
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.friendsLoading = false;
      state.error = null;
      state.friendsError = false;
      state.friendsSuccess = true;
      state.friends = action.payload;
    });
    builder.addCase(getFriends.rejected, (state, action) => {
      state.friendsLoading = false;
      state.error = action.payload;
      state.friendsError = true;
      state.friendsSuccess = false;
    });

    // Accept friend request cases

    builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
      state.acceptFriendRequestSuccess = true;
      state.error = null;
    });

    // Remove friend cases
    builder.addCase(removeFriend.fulfilled, (state, action) => {
      state.removeFriendSuccess = true;
      state.error = null;
    });

    // Edit my profile cases
    builder.addCase(editProfile.pending, (state) => {
      state.editMyProfileLoading = true;
    });

    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.editMyProfileLoading = false;
      state.error = null;
      state.isEditMyProfileError = false;
      state.isEditMyProfileSuccess = true;
      state.myProfile = action.payload;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.editMyProfileLoading = false;
      state.error = action.payload;
      state.isEditMyProfileError = true;
      state.isEditMyProfileSuccess = false;
    });

    // Send friend request cases
    builder.addCase(sendFriendRequest.pending, (state) => {
      state.sendFriendRequestLoading = true;
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.sendFriendRequestLoading = false;
      state.error = null;
      state.isSendFriendRequestError = false;
      state.sendFriendRequestSuccess = true;
      state.myProfile = action.payload.myProfile;
      state.userProfile = action.payload.userProfile;
    });
    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.sendFriendRequestLoading = false;
      state.error = action.payload;
      state.isSendFriendRequestError = true;
      state.sendFriendRequestSuccess = false;
    });
  },
});

export const { setMyProfileLoading, removeMyProfile, reset, editMyProfileReset } =
  profileSlice.actions;
export default profileSlice.reducer;
