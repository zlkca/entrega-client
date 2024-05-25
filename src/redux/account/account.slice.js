
import { createSlice } from '@reduxjs/toolkit'

export const initialAccountState = {
    
    accounts: [],
    account: null,
        
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialAccountState,
    reducers: {
        
        setAccounts: (state, action) => {
            state.loading = false;
            state.accounts = action.payload;
        },
        setAccount: (state, action) => {
            state.loading = false;
            state.account = action.payload;
        },
        
    }
})

export const {
    
    setAccounts,
    setAccount,
        
} = accountSlice.actions;

export default accountSlice.reducer;
    