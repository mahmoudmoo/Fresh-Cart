import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/proudctSlice";
import { cateReducer } from "./slices/cateSlice";
import { brandsReducer } from "./slices/barndSlice";
import { myorderReducer } from "./slices/myOrderSlice";
import { CartReducer } from "./slices/cartSlice";


export let store = configureStore({
    reducer: {
        productReducer,
        cateReducer,        
        brandsReducer,
        myorderReducer,
        CartReducer
        
    }
})