import { BrowserRouter } from 'react-router-dom'
import Layout from '../layout/layout/Layout'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css'
import { Provider } from 'react-redux';
import Auth from '../auth/auth/Auth';
import store from '../../redux/store';
import Io from '../io/Io';


export default function App(): JSX.Element {

  return (
    <div className='App'>
      <BrowserRouter>
        <Provider store={store}>
          <Auth>
            <Io>
              <Layout />
            </Io>
          </Auth>
        </Provider>
      </BrowserRouter>
    </div>
  )
}