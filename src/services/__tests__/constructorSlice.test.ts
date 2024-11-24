import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveDownIngredient,
  moveUpIngredient
} from '../slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('проверка constructorSlice', () => {
  it('добавление ингредиента addIngredient', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const ingredient: TConstructorIngredient = {
      _id: '1',
      name: 'Краторная булка N-200i',
      type: 'top',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'bun200i.png',
      image_large: 'bun200i_large.png',
      image_mobile: 'bun200i_mobile.png',
      id: '1'
    };

    const action = addIngredient(ingredient);

    const newState = constructorReducer(initialState, action);
    expect(newState.ingredients).toHaveLength(1);
    expect({ ...newState.ingredients[0], id: '1' }).toEqual(ingredient);
  });

  test('удаление ингредиента removeIngredient', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          name: 'Краторная булка N-200i',
          type: 'top',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'bun200i.png',
          image_large: 'bun200i_large.png',
          image_mobile: 'bun200i_mobile.png',
          id: '1'
        },
        {
          _id: '2',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'biokotleta.png',
          image_large: 'biokotleta_large.png',
          image_mobile: 'biokotleta_mobile.png',
          id: '2'
        }
      ]
    };

    const action = removeIngredient({
      _id: '1',
      name: 'Краторная булка N-200i',
      type: 'top',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'bun200i.png',
      image_large: 'bun200i.png_large.png',
      image_mobile: 'bun200i.png_mobile.png',
      id: '1'
    });

    const newState = constructorReducer(initialState, action);
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].id).toBe('2');
  });

  test('очищение конструктора clearIngredients', () => {
    const initialState = {
      bun: {
        _id: '3',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'onion.png',
        image_large: 'onion_large.png',
        image_mobile: 'onion_mobile.png',
        id: '3'
      },
      ingredients: [
        {
          _id: '1',
          name: 'Краторная булка N-200i',
          type: 'top',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'bun200i.png',
          image_large: 'bun200i_large.png',
          image_mobile: 'bun200i_mobile.png',
          id: '1'
        }
      ]
    };

    const action = clearIngredients();

    const newState = constructorReducer(initialState, action);
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });

  test('перемещение ингредиента вверх moveUpIngredient', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          name: 'Краторная булка N-200i',
          type: 'top',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'bun200i.png',
          image_large: 'bun200i_large.png',
          image_mobile: 'bun200i_mobile.png',
          id: '1'
        },
        {
          _id: '2',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'biokotleta.png',
          image_large: 'biokotleta_large.png',
          image_mobile: 'biokotleta_mobile.png',
          id: '2'
        }
      ]
    };

    const action = moveUpIngredient(1);

    const newState = constructorReducer(initialState, action);
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });

  test('перемещение ингредиента вниз moveDownIngredient', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          name: 'Краторная булка N-200i',
          type: 'top',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'bun200i.png',
          image_large: 'bun200i_large.png',
          image_mobile: 'bun200i_mobile.png',
          id: '1'
        },
        {
          _id: '2',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'biokotleta.png',
          image_large: 'biokotleta_large.png',
          image_mobile: 'biokotleta_mobile.png',
          id: '2'
        }
      ]
    };

    const action = moveDownIngredient(0);

    const newState = constructorReducer(initialState, action);
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });
});
