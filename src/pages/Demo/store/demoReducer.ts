import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getDemoData = createAsyncThunk(
  "demo/getData",
  async (initData: string) => {
    const res = await axios.post("http://127.0.0.1:3000/api/getDemoData", {
      content: initData,
    });
    return res.data?.data?.content;
  }
);

const demoReducer = createSlice({
  name: "demo",
  initialState:
    typeof window !== "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any)?.context?.state?.demo
      : {
          content: "默认数据",
        },
  // 同步 reducer
  reducers: {},
  // 异步 reducer
  extraReducers(build) {
    build
      .addCase(getDemoData.pending, (state) => {
        state.content = "pending";
      })
      .addCase(getDemoData.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(getDemoData.rejected, (state) => {
        state.content = "rejected";
      });
  },
});

export { demoReducer, getDemoData };