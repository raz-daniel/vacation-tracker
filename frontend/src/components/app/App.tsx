import { BrowserRouter } from 'react-router-dom'
import Layout from '../layout/layout/Layout'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css'


export default function App(): JSX.Element {

  return (
    <div className='App'>
      <BrowserRouter>
       
            <Layout />
          
      </BrowserRouter>
    </div>
  )
}