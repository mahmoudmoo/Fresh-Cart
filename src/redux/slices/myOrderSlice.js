import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import jwtDecode from "jwt-decode"


export let getMyOrders = createAsyncThunk("myorder/getMyOrders", async () => {
    let {id}=jwtDecode(localStorage.getItem('token'))
    let {data}=await axios(`https://route-ecommerce-app.vercel.app/api/v1/orders/user/${id}`)
    return data
})

let myorderslice = createSlice({
    name: "myorder",
    initialState: { myOrderList: [], loading: false },
    extraReducers: (hampozo) => {
        hampozo.addCase(getMyOrders.pending, (state) => { state.loading = true })
        hampozo.addCase(getMyOrders.fulfilled, (state, action) => {
            state.myOrderList = action.payload
            state.loading = false
        })

    }
})

export let myorderReducer=myorderslice.reducer
