
import { createSlice } from '@reduxjs/toolkit'

export const initialCartState = {
    
    carts: [],
    cart: [],
        
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
        updateCart: (state, action) => {
            const {quantityDelta, product} = action.payload;
            const cart = [];
            if(state.cart.find(it => it.product._id == product._id)){
                for(let it of state.cart){
                    if(it.product._id == product._id){
                        let quantity = it.quantity + quantityDelta;
                        if(quantity > 0){
                            cart.push({product, quantity});
                        }
                    }else{
                        cart.push({...it})
                    }
                }
            }else{
                for(let it of state.cart){
                    cart.push({...it})
                }
                cart.push({product, quantity: quantityDelta});
            }
            state.cart = cart;
        }
    }
})

export const {
    
    setCarts,
    setCart,
    updateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
    