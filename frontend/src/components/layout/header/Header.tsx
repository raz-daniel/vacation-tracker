import { useContext } from 'react'
import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/auth/Auth'
import { UserRole } from '../../../models/user/User'
import logo from '../../../assets/images/vacation_tracker_logo.jpeg'

export default function Header(): JSX.Element {
    const { jwt, logout, name, role } = useContext(AuthContext)!
    const isLoggedIn = !!jwt
    const isAdmin = role === UserRole.ADMIN
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/auth/login')
    }

    return (
        <div className='Header'>
            <div className='logo-section'>
                <NavLink to="/">
                    <img src={logo} alt="Vacation Tracker Logo" className="logo" />
                </NavLink>
            </div>

            <div className='nav-section'>
                {isLoggedIn && (
                    <>
                        <NavLink 
                            to="/vacations" 
                            className={({ isActive }) => 
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Vacations
                        </NavLink>
                        {isAdmin && (
                            <>
                                <NavLink 
                                    to="/vacations/add" 
                                    className={({ isActive }) => 
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Add Vacation
                                </NavLink>
                                <NavLink 
                                    to="/vacations/reports" 
                                    className={({ isActive }) => 
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Export Reports
                                </NavLink>
                            </>
                        )}
                    </>
                )}
            </div>

            <div className='auth-section'>
                {!isLoggedIn ? (
                    <>
                        <NavLink 
                            to="/auth/login" 
                            className={({ isActive }) => 
                                isActive ? "auth-link active" : "auth-link"
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink 
                            to="/auth/register" 
                            className={({ isActive }) => 
                                isActive ? "auth-link active" : "auth-link"
                            }
                        >
                            Sign Up
                        </NavLink>
                    </>
                ) : (
                    <>
                        {name && <span className="welcome-text">Hello {name}</span>}
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}