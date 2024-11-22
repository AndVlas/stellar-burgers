import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  ordersList,
  ordersListSelector
} from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersListSelector);

  useEffect(() => {
    dispatch(ordersList());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
