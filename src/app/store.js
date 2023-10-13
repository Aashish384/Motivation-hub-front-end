import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import profileReducer from "../features/profile/profileSlice";
import chatReducer from "../features/chat/chatSlice";
import challengeReducer from "../features/challenge/challengeSlice";
import groupSlice from "../features/group/groupSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    chat: chatReducer,
    challenge: challengeReducer,
    group: groupSlice,
  },
});

export default store;
