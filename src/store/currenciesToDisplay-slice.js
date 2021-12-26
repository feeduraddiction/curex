import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCurrenciesToDisplay = createAsyncThunk(
    'currencies/getCurrenciesToDisplay',
    async () => {
        return fetch('http://localhost:3002/filtered', {
        }).then((res) => res.json())
    })
export

    const currencySliceToDisplay = createSlice({
        name: 'currenciesToDisplay',
        initialState: {
            items: [],
            status: null,
        },
        extraReducers: {
            [getCurrenciesToDisplay.pending]: (state) => {
                state.status = 'loading'
            },
            [getCurrenciesToDisplay.fulfilled]: (state, { payload }) => {
                state.items = payload;
                state.status = 'success';
            },
            [getCurrenciesToDisplay.rejected]: (state) => {
                state.status = 'failed';
            }

        }


    })

export default currencySliceToDisplay.reducer;