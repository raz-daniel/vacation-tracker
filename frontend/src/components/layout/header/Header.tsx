import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LogoImage from '../../../assets/clothStoreLogo.jpg'

export default function Header(): JSX.Element {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const navigate = useNavigate()

    function handleSearch() {
        if (searchTerm.trim()) {
            navigate(`/items/list?search=${encodeURIComponent(searchTerm)}`)
        }
    }

    return (
        <div className='Header'>
            <div>
                <img src={LogoImage} />
            </div>
            <div>
                <nav>
                    <NavLink to="items/list">Store</NavLink>
                    <NavLink to="items/add">Add Item</NavLink>
                    <NavLink to="/home">Home</NavLink>
                </nav>
            </div>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }}>
                    <input
                        placeholder='search item...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type='submit'>Search</button>
                </form>
            </div>

        </div>
    )
}