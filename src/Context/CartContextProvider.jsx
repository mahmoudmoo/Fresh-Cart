import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export let cartContext = createContext()
export default function CartContextProvider(props) {

    const [cartPrice, setcartPrice] = useState(0)
    let headers = { token: localStorage.getItem('token') }
    let{cartnumber ,setcartnumber}=props
    async function addToCart(x) {
        return await axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart', { productId: x }, { headers }).then((res) => {
            toast.success(res.data.message)
            setcartnumber(res.data.numOfCartItems)
            console.log(res);
        }).catch((err) => {
            toast.error("error")
        })

    }
    function getCart() {
        return axios('https://route-ecommerce-app.vercel.app/api/v1/cart', { headers }).then((res) => res).catch((err) => err)
    }

    function updateCount(id, count) {
        return axios.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`, { count: count }, { headers }).then((res) => {
            toast.success("count is updated")
            return res
        }).catch((err) => {
            toast.error("error")
        })


    }
    function deleteItem(id) {
        return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`, { headers }).then((res) => {
            toast.success("product is deleted")
            return res
        }).catch((err) => {
            toast.error("error")
        })
    }
    function deleteAllItem() {
        return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart`, { headers }).then((res)=>{
                toast.success("Cart is deleted")
        return res
        }).catch((err)=>{
            toast.error("error")
        })
    }
    return (
        <cartContext.Provider value={{ addToCart, getCart, updateCount, deleteItem ,deleteAllItem,cartnumber,setcartnumber,cartPrice, setcartPrice }}>
            {props.children}
        </cartContext.Provider>
    )
}

