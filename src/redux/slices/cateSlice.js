import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export let getCate = createAsyncThunk("categories/getCate", async () => {

    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/categories')
    return data.data
})

let cateSlice = createSlice({
    name: "categories",
    initialState: { cateList: [], loading: false },
    extraReducers: (hampozo) => {
        hampozo.addCase(getCate.pending, (state) => { state.loading = true })
        hampozo.addCase(getCate.fulfilled, (state, action) => {
            state.cateList = action.payload
            state.loading = false
        })

    }
})

export let cateReducer=cateSlice.reducer