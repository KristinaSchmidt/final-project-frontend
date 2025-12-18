import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    upsertUsers(state, action) {
      const users = action.payload || [];
      for (const u of users) {
        if (!u?._id) continue;
        state.byId[u._id] = { ...(state.byId[u._id] || {}), ...u };
      }
    },
  },
});

export const { upsertUsers } = usersSlice.actions;
export default usersSlice.reducer;