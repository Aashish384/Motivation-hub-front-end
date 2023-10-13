import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  groups: null,
  fetchGroupsLoading: false,
  createGroupLoading: false,
  createGroupSuccess: false,
  createGroupError: false,
  addGroupMemberSuccess: false,
  addGroupMemberError: false,
  addGroupMemberLoading: false,
};

// Function to create a group
export const createGroup = createAsyncThunk(
  "group/create",
  async (groupInfo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/group/new", groupInfo, {
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

// Function to fetch all the groups
export const fetchGroups = createAsyncThunk(
  "group/fetch-groups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/group");
      return response.data.groups;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to create a group
export const addGroupMember = createAsyncThunk(
  "group/add-member",
  async (memberInfo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/group/add-member", memberInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState,

  reducers: {
    createGroupReset: (state) => {
      state.createGroupLoading = false;
      state.createGroupSuccess = false;
      state.createGroupError = false;
    },
    addGroupMemberReset: (state) => {
      state.addGroupMemberLoading = false;
      state.addGroupMemberSuccess = false;
      state.addGroupMemberError = false;
    },
  },

  extraReducers: (builder) => {
    // Get all groups cases
    builder.addCase(fetchGroups.pending, (state) => {
      state.fetchGroupsLoading = true;
    });
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.fetchGroupsLoading = false;
      state.isError = false;
      state.error = null;
      state.groups = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchGroups.rejected, (state, action) => {
      state.fetchGroupsLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.isSuccess = false;
    });

    // Create a groups cases
    builder.addCase(createGroup.pending, (state) => {
      state.createGroupLoading = true;
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.createGroupLoading = false;
      state.createGroupError = false;
      state.error = null;
      state.createGroupSuccess = true;
    });
    builder.addCase(createGroup.rejected, (state, action) => {
      state.createGroupLoading = false;
      state.createGroupError = true;
      state.error = action.payload;
      state.createGroupSuccess = false;
    });

    // Add group member cases
    builder.addCase(addGroupMember.pending, (state) => {
      state.addGroupMemberLoading = true;
    });
    builder.addCase(addGroupMember.fulfilled, (state, action) => {
      state.addGroupMemberLoading = false;
      state.addGroupMemberError = false;
      state.error = null;
      state.addGroupMemberSuccess = true;
      window.location.reload();
    });
    builder.addCase(addGroupMember.rejected, (state, action) => {
      state.addGroupMemberLoading = false;
      state.addGroupMemberError = true;
      state.error = action.payload;
      state.addGroupMemberSuccess = false;
    });
  },
});

export const { createGroupReset, addGroupMemberReset } = groupSlice.actions;

export default groupSlice.reducer;
