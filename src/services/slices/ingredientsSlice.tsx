import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const ingredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientsLoadingSelector: (state) => state.loading,
    ingredientsStateSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ingredientsList.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(ingredientsList.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const {
  ingredientsSelector,
  ingredientsLoadingSelector,
  ingredientsStateSelector
} = ingredientsSlice.selectors;

export const ingredientsSliceReducer = ingredientsSlice.reducer;
