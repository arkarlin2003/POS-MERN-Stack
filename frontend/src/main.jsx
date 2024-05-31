import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import route from './routes/route'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux'
import './index.css'
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={route} />
    </ThemeProvider>
  </Provider>
  </>,
)
