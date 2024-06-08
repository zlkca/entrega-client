
import { createSlice } from '@reduxjs/toolkit'

export const initialCategoryState = {
    categoryMap: null,
    categories: [],
    category: null,
        
}

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialCategoryState,
    reducers: {
        setCategoryMap: (state, action) => {
            state.categoryMap = action.payload;
        },
        setCategories: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        setCategory: (state, action) => {
            state.loading = false;
            state.category = action.payload;
        },
        
    }
})

export const {
    setCategoryMap,
    setCategories,
    setCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
    