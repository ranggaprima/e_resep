import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import router from './routes/AppRoutes.tsx';
import store from './store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
