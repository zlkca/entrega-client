
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../redux/account/account.slice';
import productReducer from '../redux/product/product.slice';
import categoryReducer from '../redux/category/category.slice';
import cartReducer from '../redux/cart/cart.slice';
import orderReducer from '../redux/order/order.slice';
import authReducer from "../redux/auth/auth.slice";
import uiReducer from "../redux/ui/ui.slice";

export default configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer,
        order: orderReducer,
        ui: uiReducer
    },
})    
    