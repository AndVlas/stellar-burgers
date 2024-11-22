import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push({ ...ingredient });
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      if (ingredientIndex >= 0) {
        state.ingredients.splice(ingredientIndex, 1);
      }
    },
    clearIngredients: (state) => (state = initialState),

    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const ingredient = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = ingredient;
      }
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredient = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = ingredient;
      }
    }
  },
  selectors: {
    constructorItems: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveDownIngredient,
  moveUpIngredient
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
export const constructorSelector = constructorSlice.selectors;
