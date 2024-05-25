
import { createSlice } from '@reduxjs/toolkit'

export const initialCartState = {
    
    carts: [],
    cart: null,
        
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        
        setCarts: (state, action) => {
            state.loading = false;
            state.carts = action.payload;
        },
        setCart: (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        },
        
    }
})

export const {
    
    setCarts,
    setCart,
        
} = cartSlice.actions;

export default cartSlice.reducer;
    