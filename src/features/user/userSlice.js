import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

import axiosInstance from "../../utils/axiosInstance";
import setAuthToken from "../../utils/setAuthToken";
import isEmpty from "../../utils/isEmpty";
import { successNotification, errorNotification } from "../../utils/showNotification";

const initialState = {
  isAuthenticated: false,
  user: null,
  userLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
  users: null,
  fetchUsersLoading: false,
  fetchUsersSuccess: false,
  changeRoleLoading: false,
  changeRoleSuccess: false,
  writeReviewLoading: false,
  writeReviewSuccess: false,
  myOrders: null,
  myOrdersLoading: false,
  myBooks: null,
  myBooksLoading: false,
  myAuctionWins: null,
  myAuctionWinsLoading: false,
  resetPasswordLoading: false,
  checkResetValidityLoading: false,
  createNewPasswordLoading: false,
  notifications: null,
  notificationsLoading: false,
  reportUserLoading: false,
  applyExpertLoading: false,
  applyExpertSuccess: false,
  expertApplications: null,
  expertApplicationsLoading: false,
  createUserLoading: false,
  createUserSuccess: false,
};

// Register a new user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Create a new user by admin
export const createUser = createAsyncThunk(
  "user/create-user",
  async (userInfo, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk("user/login", async (userInfo, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/login", userInfo);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

// Reset user password
export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/reset-password`, email);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Check the validity of reset string
export const checkResetValidity = createAsyncThunk(
  "user/check-reset-validity",
  async (resetString, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/check-reset-string/${resetString}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Create a new password
export const createNewPassword = createAsyncThunk(
  "user/create-new-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/user/reset-password/${data.resetString}`,
        data.formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Get all the users
export const getAllUsers = createAsyncThunk("user/get-users", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/users");
    return response.data.users;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

// Change user role
export const changeUserRole = createAsyncThunk(
  "user/change-role",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/change-role/${data.userId}`, {
        newRole: data.newRole,
        newStatus: data.newStatus,
      });
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Get user notifications
export const getUserNotifications = createAsyncThunk(
  "user/get-notifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/notifications");
      return response.data.notifications;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Read all user notifications
export const readUserNotifications = createAsyncThunk(
  "user/read-notifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/notifications/read");
      return response.data.notifications;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Report user
export const reportUser = createAsyncThunk(
  "user/report-user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/report/${data.userId}`, { why: data.why });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Apply for expert
export const applyExpert = createAsyncThunk(
  "user/apply-expert",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/apply-expert`, data, {
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

// Fetch all the expert applications
export const fetchExpertApplications = createAsyncThunk(
  "user/fetch-expert-applications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/expert-applications`);
      return response.data.expertApplications;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Accept an expert application
export const acceptExpertApplication = createAsyncThunk(
  "user/accept-expert-application",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/user/expert-applications/accept/${applicationId}`
      );
      return response.data.expertApplications;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);
// Reject expert application
export const rejectExpertApplication = createAsyncThunk(
  "user/reject-expert-application",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/user/expert-applications/reject/${applicationId}`
      );
      return response.data.expertApplications;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    reset: (state) => {
      state.userLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
      state.applyExpertLoading = false;
      state.applyExpertSuccess = false;
      state.notificationsLoading = false;
    },
    resetCreateUser: (state) => {
      state.createUserLoading = false;
      state.createUserSuccess = false;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.userLoading = false;
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = isEmpty(action.payload) ? null : action.payload;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("mjwt");
      setAuthToken(false);
      state.user = null;
      state.isAuthenticated = false;
      successNotification({ title: "Success", message: "Logged out successfully" });
    },
  },

  extraReducers: (builder) => {
    // Register cases
    builder.addCase(registerUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      localStorage.setItem("mjwt", action.payload.token);
      setAuthToken(action.payload.token);
      const decoded = jwt_decode(action.payload.token);
      state.userLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.user = decoded;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.userLoading = false;
      state.user = null;
      state.error = action.payload;
      state.isError = true;
    });

    // Create user cases
    builder.addCase(createUser.pending, (state) => {
      state.createUserLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.createUserLoading = false;
      state.error = null;
      state.createUserSuccess = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.createUserLoading = false;
      state.error = action.payload;
      state.isError = true;
    });

    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("mjwt", action.payload.token);
      setAuthToken(action.payload.token);
      const decoded = jwt_decode(action.payload.token);
      state.userLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.user = decoded;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.userLoading = false;
      state.user = null;
      state.error = action.payload;
      state.isError = true;
    });

    // Reset password cases
    builder.addCase(resetPassword.pending, (state, action) => {
      state.resetPasswordLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetPasswordLoading = false;
      successNotification({
        title: "Reset link created",
        message: "Password reset link has been sent to your email",
      });
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.resetPasswordLoading = false;
    });

    // Check reset string validity cases
    builder.addCase(checkResetValidity.pending, (state, action) => {
      state.checkResetValidityLoading = true;
    });
    builder.addCase(checkResetValidity.fulfilled, (state, action) => {
      state.checkResetValidityLoading = false;
    });
    builder.addCase(checkResetValidity.rejected, (state, action) => {
      state.checkResetValidityLoading = false;
      window.location.href = "/login";
      errorNotification({
        title: "Invalid link",
        message: "The provided password reset link is invalid.",
      });
    });

    // Check reset string validity cases
    builder.addCase(createNewPassword.pending, (state, action) => {
      state.createNewPasswordLoading = true;
    });
    builder.addCase(createNewPassword.fulfilled, (state, action) => {
      state.createNewPasswordLoading = false;
      window.location.href = "/login";
      successNotification({
        title: "Success",
        message: "Your password has been reset successfully",
      });
    });
    builder.addCase(createNewPassword.rejected, (state, action) => {
      state.createNewPasswordLoading = false;
    });

    // Get all users cases
    builder.addCase(getAllUsers.pending, (state) => {
      state.fetchUsersLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.fetchUsersLoading = false;
      state.error = null;
      state.isError = false;
      state.fetchUsersSuccess = true;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.fetchUsersLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.fetchUsersSuccess = false;
    });

    // Change user role cases
    builder.addCase(changeUserRole.pending, (state) => {
      state.changeRoleLoading = true;
    });
    builder.addCase(changeUserRole.fulfilled, (state, action) => {
      state.changeRoleLoading = false;
      state.error = null;
      state.isError = false;
      state.changeRoleSuccess = true;
      let updateIndex = state.users.findIndex((el) => el._id === action.payload._id);
      state.users[updateIndex] = action.payload;
    });
    builder.addCase(changeUserRole.rejected, (state, action) => {
      state.changeRoleLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.changeRoleSuccess = false;
    });

    // Get user notifications cases
    builder.addCase(getUserNotifications.pending, (state) => {
      state.notificationsLoading = true;
    });
    builder.addCase(getUserNotifications.fulfilled, (state, action) => {
      state.notificationsLoading = false;
      state.error = null;
      state.isError = false;
      state.notifications = action.payload;
    });
    builder.addCase(getUserNotifications.rejected, (state, action) => {
      state.notificationsLoading = false;
      state.notifications = null;
    });

    // Read user notifications cases
    builder.addCase(readUserNotifications.pending, (state) => {
      // state.notificationsLoading = true;
    });
    builder.addCase(readUserNotifications.fulfilled, (state, action) => {
      // state.notificationsLoading = false;
      state.error = null;
      state.isError = false;
      state.notifications = action.payload;
    });
    builder.addCase(readUserNotifications.rejected, (state, action) => {
      // state.notificationsLoading = false;
      state.notifications = null;
    });

    //Report user cases
    builder.addCase(reportUser.pending, (state) => {
      state.reportUserLoading = true;
    });
    builder.addCase(reportUser.fulfilled, (state, action) => {
      state.reportUserLoading = false;
      state.error = null;
      state.isError = false;
      window.location.reload();
    });
    builder.addCase(reportUser.rejected, (state, action) => {
      state.reportUserLoading = false;
      state.error = action.payload;
      state.isError = true;
    });

    //Apply for expert cases
    builder.addCase(applyExpert.pending, (state) => {
      state.applyExpertLoading = true;
    });
    builder.addCase(applyExpert.fulfilled, (state, action) => {
      state.applyExpertLoading = false;
      state.error = null;
      state.isError = false;
      state.applyExpertSuccess = true;
    });
    builder.addCase(applyExpert.rejected, (state, action) => {
      state.applyExpertLoading = false;
      state.applyExpertSuccess = false;
      state.isError = true;
      state.error = action.payload;
    });

    // Fetch expert applications cases
    builder.addCase(fetchExpertApplications.pending, (state) => {
      state.expertApplicationsLoading = true;
    });
    builder.addCase(fetchExpertApplications.fulfilled, (state, action) => {
      state.expertApplicationsLoading = false;
      state.error = null;
      state.isError = false;
      state.expertApplications = action.payload;
    });
    builder.addCase(fetchExpertApplications.rejected, (state, action) => {
      state.expertApplicationsLoading = false;
    });

    // Accept expert application cases
    builder.addCase(acceptExpertApplication.pending, (state) => {});
    builder.addCase(acceptExpertApplication.fulfilled, (state, action) => {
      state.expertApplicationsLoading = false;

      state.expertApplications = action.payload;
    });
    builder.addCase(acceptExpertApplication.rejected, (state, action) => {
      state.expertApplicationsLoading = false;
    });

    // Reject expert application cases
    builder.addCase(rejectExpertApplication.pending, (state) => {
      state.expertApplicationsLoading = true;
    });
    builder.addCase(rejectExpertApplication.fulfilled, (state, action) => {
      state.expertApplicationsLoading = false;
      state.error = null;
      state.isError = false;
      state.expertApplications = action.payload;
    });
    builder.addCase(rejectExpertApplication.rejected, (state, action) => {
      state.expertApplicationsLoading = false;
    });
  },
});

export const { reset, setUserLoading, setCurrentUser, logoutUser, resetCreateUser } =
  userSlice.actions;
export default userSlice.reducer;
