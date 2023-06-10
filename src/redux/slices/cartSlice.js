import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { date } from "yup";
export let getCartItems=createAsyncThunk("Cart/getCartItems",async()=>{
    let headers = { token: localStorage.getItem('token') }
    let {data}= await axios('https://route-ecommerce-app.vercel.app/api/v1/cart', { headers })
    return data ;
})
export let addToCart=createAsyncThunk("Cart/addToCart",async(x)=>{
    let headers = { token: localStorage.getItem('token') }
 return await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/cart`, { productId: x }, { headers }).then((res)=>{
toast.success(res.data.message)
// console.log(x);
return res.data.numOfCartItems
}).catch((err)=>{toast.error("error")})
})
export let updateCount=createAsyncThunk("Cart/updateCount",async (x)=>{
    let headers = { token: localStorage.getItem('token') }
    return await axios.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${x.id}`, {count:x.hamada }, { headers }).then((res) => {
        toast.success("count is updated")
        console.log(res);
        return res
            }).catch((err) => {
                toast.error("error")
            })   
})
export let deleteMyItem=createAsyncThunk("Cart/deleteMyItem",async (x)=>{
    let headers = { token: localStorage.getItem('token') }
    return await axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart/${x}` ,{ headers }).then((res) => {
        toast.success("product is deleted")       
        return res
            }).catch((err) => {
                toast.error("error")                
            })     
})
export let deleteAllItem=createAsyncThunk("Cart/deleteAllItem",async ()=>{
    let headers = { token: localStorage.getItem('token') }
    return await axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart` ,{ headers }).then((res) => {
        toast.success("All product is deleted")       
        return res
            }).catch((err) => {
                toast.error("error")                
            })     
})












// function deleteAllItem() {
//     return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart`, { headers }).then((res)=>{
//             toast.success("Cart is deleted")
//     return res
//     }).catch((err)=>{
//         toast.error("error")
//     })
// }
let cartSlice=createSlice({
    name:"Cart",
    initialState:{loading:false,cartList:[],cartNumber:0,CartId:null,cartTotalPrice:0},
    extraReducers:(builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{state.loading=true})
        builder.addCase(getCartItems.fulfilled,(state,{payload})=>{
           let {data,numOfCartItems}=payload
            state.cartList=data.products 
            state.cartNumber=numOfCartItems
            state.cartTotalPrice=data.totalCartPrice
            state.CartId=data._id
            state.loading=false          
        })
         builder.addCase(getCartItems.rejected,(state)=>{
            state.cartNumber=0
            state.cartTotalPrice=0
            state.cartList=[]
            state.loading=false
        })
        builder.addCase(addToCart.fulfilled,(state,{payload})=>{
            state.cartNumber=payload
        })
        builder.addCase(updateCount.fulfilled,(state,{payload})=>{
            state.cartList=payload.data.data.products
            state.cartTotalPrice=payload.data.data.totalCartPrice
        })
        builder.addCase(deleteMyItem.fulfilled,(state,{payload})=>{
            state.cartList=payload.data.data.products
            state.cartNumber=payload.data.numOfCartItems
            state.cartTotalPrice=payload.data.data.totalCartPrice
        })
        builder.addCase(deleteAllItem.fulfilled,(state,{payload})=>{
            state.cartList=[]
            state.cartNumber=0
            state.cartTotalPrice=0
        })
    },
    reducers:{
        clearCart:(state)=>{
            state.cartNumber=0;
            state.cartTotalPrice=0;
        }

    }
})
export let CartReducer=cartSlice.reducer
export let {clearCart}=cartSlice.actions








// async function getNumOnFirst() {
//     let res =await axios('https://route-ecommerce.onrender.com/api/v1/cart', { headers })
//     if (res.name === "AxiosError") {
//       setcartnumber(0)
//     } else {
//         setcartnumber(res?.data?.numOfCartItems)
//     }
//   }
// async function updatmycart(x, y) {
//     let { data } = await updateCount(x, y)
//     setcart(data.data.products)
//     setcartnumber(data.numOfCartItems)
//     setcartPrice(data.data.totalCartPrice)
//   }
//   async function deleteMyItem(x) {
//     let { data } = await deleteItem(x)
//     setcart(data.data.products)
//     setcartnumber(data.numOfCartItems)
//     setcartPrice(data.data.totalCartPrice)
//   }
//   async function deleteMyAllItem(x) {
//     let { data } = await deleteAllItem(x)
//     setcart(null)
//     setcartnumber(0)
//     setcartPrice(0)
//   }
// function updateCount(id, count) {
//     return axios.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`, { count: count }, { headers }).then((res) => {
//         toast.success("count is updated")
//         return res
//     }).catch((err) => {
//         toast.error("error")
//     })
// }
// function deleteItem(id) {
//     return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`, { headers }).then((res) => {
//         toast.success("product is deleted")
//         return res
//     }).catch((err) => {
//         toast.error("error")
//     })
// }
// function deleteAllItem() {
//     return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart`, { headers }).then((res)=>{
//             toast.success("Cart is deleted")
//     return res
//     }).catch((err)=>{
//         toast.error("error")
//     })
// }
// async function addToCart(x) {
//     return await axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart', { productId: x }, { headers }).then((res) => {
//         toast.success(res.data.message)
//         setcartnumber(res.data.numOfCartItems)
//         console.log(res);
//     }).catch((err) => {
//         toast.error("error")
//     })
// }
// export let updateCount=createAsyncThunk("Cart/updateCount",async(id,count)=>{
//     await axios.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`, {count }, { headers }).then(data=>data).catch(err=>err)
// })
        // builder.addCase(updateCount.fulfilled,(state,action)=>{
        //     state.cartList=action.payload.data.data.products
        //     state.cartNumber=action.payload.data.numOfCartItems
        //     state.cartTotalPrice=action.payload.data.data.totalCartPrice
        //     toast.success("count is updated")
        // })
// async function addToCart(x) {
//     return await axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart', { productId: x }, { headers }).then((res) => {
//         toast.success(res.data.message)
//         setcartnumber(res.data.numOfCartItems)
//         console.log(res);
//     }).catch((err) => {
//         toast.error("error")
//     })
// }