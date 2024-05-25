
import { createSlice } from '@reduxjs/toolkit'

export const initialOrderState = {
    
    orders: [],
    order: null,
        
}

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialOrderState,
    reducers: {
        
        setOrders: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        setOrder: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        
    }
})

export const {
    
    setOrders,
    setOrder,
        
} = orderSlice.actions;

export default orderSlice.reducer;
    