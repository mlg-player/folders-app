import { createAsyncThunk } from "@reduxjs/toolkit";

export const setCurrentFolder = createAsyncThunk("setCurrentFolder", (data: string) => {
    return data
})