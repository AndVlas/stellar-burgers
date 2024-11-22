// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getIngredientsApi } from '@api';
// import { TIngredient } from '../../utils/types';

// type TingredientsSlice = {
//   ingredients: TIngredient[];
//   loading: boolean;
//   error: string | null | undefined;
// };

// const initialState: TingredientsSlice = {
//   ingredients: [],
//   loading: false,
//   error: null
// };

// export const fetchIngredients = createAsyncThunk(
//   'ingredients/fetchIngredients',
//   getIngredientsApi
// );

// export const ingredientsSlice = createSlice({
//   name: 'burgerIngredients',
//   initialState,
//   reducers: {},
//   selectors: {
//     getIngredientsSelector: (state) => state.ingredients,
//     getIngredientsLoadingSelector: (state) => state.loading,
//     getIngredientsStateSelector: (state) => state
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ingredients = action.payload;
//       })
//       .addCase(fetchIngredients.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   }
// });

// export const {
//   getIngredientsSelector,
//   getIngredientsLoadingSelector,
//   getIngredientsStateSelector
// } = ingredientsSlice.selectors;

// export const ingredientsReducer = ingredientsSlice.reducer;

import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export type TBurgerIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TBurgerIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientsLoadingSelector: (state) => state.loading,
    getIngredientsStateSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const {
  getIngredientsSelector,
  getIngredientsLoadingSelector,
  getIngredientsStateSelector
} = burgerIngredientsSlice.selectors;

export const ingredientsSliceReducer = burgerIngredientsSlice.reducer;
