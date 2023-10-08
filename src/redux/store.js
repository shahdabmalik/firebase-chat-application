import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"
import chatReducer from "./features/chatSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ['chat/SET_CONTACTS'],
                ignoredPaths: ['chat.contacts', 'chat.chats'],
            }
        })
})

