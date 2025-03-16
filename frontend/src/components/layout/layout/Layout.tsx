import { useContext } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routing from '../routing/Routing'
import './Layout.css'
import { AuthContext } from '../../auth/auth/Auth'
import Register from '../../auth/register/Register'
import Login from '../../auth/login/Login'
import NotFound from '../not-found/NotFound'
import { Route, Routes, Navigate } from 'react-router-dom'

export default function Layout(): JSX.Element {
    const { jwt } = useContext(AuthContext)!
    const isLoggedIn = !!jwt

    return (
        <div className='Layout'>
            <header>
                <Header />
            </header>

            <main>
                {isLoggedIn ? (
                    <Routing />
                ) : (
                    <Routes>
                        <Route path="/" element={<Navigate to="/auth/login" replace />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                )}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}