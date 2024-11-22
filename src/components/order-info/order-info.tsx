import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const indexNumber = useParams().number || '';
  const [orderData, setOrderData] = useState<TOrder>({
    _id: '',
    createdAt: '',
    ingredients: [],
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  });

  const ingredients: TIngredient[] = useSelector(ingredientsSelector);

  useEffect(() => {
    getOrderByNumberApi(Number(indexNumber)).then((data) => {
      setOrderData(data.orders[0]);
    });
  }, [ingredients]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
