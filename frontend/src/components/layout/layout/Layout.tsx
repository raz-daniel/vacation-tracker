import { useContext } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routing from '../routing/Routing'
import './Layout.css'
import { AuthContext } from '../../auth/auth/Auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from '../../auth/register/Register'
import NotFound from '../not-found/NotFound'
import Login from '../../auth/login/Login'

export default function Layout(): JSX.Element {

    const { jwt } = useContext(AuthContext)!
    const isLoggedIn = !!jwt

    return (
        <div className='Layout'>
            {isLoggedIn ? (
                <>
                    <header>
                        <Header />
                    </header>

                    <main>
                        <Routing />
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Navigate to="/auth/register" />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )
            }
        </div>
    )
}