import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/feed/:number' element={<OrderInfo />} /> {/*Modal*/}
      <Route path='/ingredients/:id' element={<IngredientDetails />} />{' '}
      {/*Modal*/}
      <Route
        path='/login'
        element={
          <ProtectedRoute isUnauthUser>
            {' '}
            <Login />{' '}
          </ProtectedRoute>
        }
      />{' '}
      {/*Protected*/}
      <Route
        path='/register'
        element={
          <ProtectedRoute>
            {' '}
            <Register />{' '}
          </ProtectedRoute>
        }
      />{' '}
      {/*Protected*/}
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute>
            {' '}
            <ForgotPassword />{' '}
          </ProtectedRoute>
        }
      />{' '}
      {/*Protected*/}
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute>
            {' '}
            <ResetPassword />{' '}
          </ProtectedRoute>
        }
      />{' '}
      {/*Protected*/}
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            {' '}
            <Profile />{' '}
          </ProtectedRoute>
        }
      />{' '}
      {/*Protected*/}
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute>
            {' '}
            <ProfileOrders />{' '}
          </ProtectedRoute>
        }
      />{' '}
      {/*Protected*/}
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            {' '}
            <OrderInfo />{' '}
          </ProtectedRoute>
        }
      />{' '}
      {/*Protected*/} {/*Modal*/}
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
