import { ingredientsSlice, ingredientsList } from '../slices/ingredientsSlice';

describe('проверка ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const error = 'ошибка';

  test('проверка ingredientsList.pending', () => {
    const pendingResult = {
      ingredients: [],
      loading: true,
      error: null
    };
    const state = ingredientsSlice.reducer(
      initialState,
      ingredientsList.pending('')
    );
    expect(state).toEqual(pendingResult);
  });

  test('проверка ingredientsList.rejected', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      ingredientsList.rejected(new Error(error), '')
    );
    expect(state).toEqual({ ...initialState, loading: false, error });
  });

  test('проверка ingredientsList.fulfilled', () => {
    const fulfilledResult = {
      ingredients: [
        {
          _id: '1',
          name: '111',
          type: 'main',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 100,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '2',
          name: '222',
          type: 'main',
          proteins: 20,
          fat: 20,
          carbohydrates: 20,
          calories: 200,
          price: 200,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ],
      loading: false,
      error: null
    };
    const state = ingredientsSlice.reducer(
      initialState,
      ingredientsList.fulfilled(fulfilledResult.ingredients, '')
    );
    expect(state).toEqual(fulfilledResult);
  });
});
