import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_USER(state, action) {
            state.user = action.payload
        }
    }
});

export const { SET_USER } = authSlice.actions

export default authSlice.reducer