import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCurrencies = createAsyncThunk(
    'currencies/getCurrencies',
    async () => {
        return fetch('http://localhost:3002').then((res) => res.json())
    })
export

const currencySlice = createSlice({
    name: 'currencies',
    initialState: {
        items: [],
        status: null,
    },
    extraReducers: {
        [getCurrencies.pending] : (state) => {
            state.status = 'loading'
        },
        [getCurrencies.fulfilled] : (state, {payload}) => {
            state.items = payload;
            state.status = 'success';
        },
        [getCurrencies.rejected] :(state) => {
            state.status = 'failed';
        }

    }
   
    
})

export default currencySlice.reducer;