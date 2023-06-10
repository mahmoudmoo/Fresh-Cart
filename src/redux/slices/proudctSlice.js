import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



  export let getProductsByBrands = createAsyncThunk("proudct/getProductsByBrands", async (id) => {

    let { data } = await axios(`https://route-ecommerce-app.vercel.app/api/v1/products?brand=${id}`)
    return data.data
})
export let getProductsBycate = createAsyncThunk("proudct/getProductsBycate", async (id) => {

    let { data } = await axios(`https://route-ecommerce-app.vercel.app/api/v1/products?category=${id}`)
    return data.data
})

export let getProducts = createAsyncThunk("proudct/getProducts", async () => {

    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/products')
    return data.data
})

export let getProductData = createAsyncThunk("proudct/getProductData", async (id) => {

    let { data } = await axios(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`)
    return data.data
})

let productSlice = createSlice({
    name: "proudct",
    initialState: { productList: [], loading: false, proudctBrandList:[] ,proudctCateList:[],productDataList:{}},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => { state.loading = true })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.productList = action.payload
            state.loading = false
        })
        builder.addCase(getProductsByBrands.pending, (state) => { state.loading = true })
        builder.addCase(getProductsByBrands.fulfilled, (state, action) => {
            state.proudctBrandList = action.payload
            state.loading = false
        })
        builder.addCase(getProductsBycate.pending, (state) => { state.loading = true })
        builder.addCase(getProductsBycate.fulfilled, (state, action) => {
            state.proudctCateList = action.payload
            state.loading = false
        })
        
        builder.addCase(getProductData.pending, (state) => { state.loading = true })
        builder.addCase(getProductData.fulfilled, (state, action) => {
            state.productDataList = action.payload
            state.loading = false
        })

    }
})

export let productReducer=productSlice.reducer