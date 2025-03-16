import { useContext } from 'react'
import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/auth/Auth'

export default function Header(): JSX.Element {

    const { logout } = useContext(AuthContext)!
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/auth/login')
    }

    return (
        <div className='Header'>

            <div className='logo'>
                <h1>Vacation Tracker</h1>
            </div>

            <div>
                <nav>
                    <NavLink to="/vacations">Vacations</NavLink>
                    {/* {isAdmin && <NavLink to="/admin">Admin</NavLink>} */}
                </nav>
            </div>

            <div className='user-controls'>
                {/* <span>Welcome, {currentUser?.firstName}</span> */}
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div>
    )
}