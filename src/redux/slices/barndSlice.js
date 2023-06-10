import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export let getBrands = createAsyncThunk("brands/getBrands", async () => {

    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/brands')
    return data.data
})

let brandSlice = createSlice({
    name: "brands",
    initialState: { brandList: [], loading: false },
    extraReducers: (hampozo) => {
        hampozo.addCase(getBrands.pending, (state) => { state.loading = true })
        hampozo.addCase(getBrands.fulfilled, (state, action) => {
            state.brandList = action.payload
            state.loading = false
        })

    }
})

export let brandsReducer=brandSlice.reducer