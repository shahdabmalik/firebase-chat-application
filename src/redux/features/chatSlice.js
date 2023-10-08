import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedContact: {},
    contacts: [],
    chats: [],
    inChat: false
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        SET_SELECTED_CONTACT(state, action) {
            state.selectedContact = action.payload
        },
        SET_CONTACTS(state, action) {
            state.contacts = action.payload
        },
        SET_INCHAT(state, action) {
            state.inChat = action.payload
        },
        SET_CHATS(state, action) {
            state.chats = action.payload
        }
    }
});

export const { SET_SELECTED_CONTACT, SET_CONTACTS, SET_INCHAT, SET_CHATS } = chatSlice.actions

export default chatSlice.reducer