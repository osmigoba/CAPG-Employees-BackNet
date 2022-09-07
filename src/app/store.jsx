import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import React from 'react'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
