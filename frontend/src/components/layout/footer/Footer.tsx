import './Footer.css'

export default function Footer(): JSX.Element {

    return (
        <div className='Footer'>
            <p> Server is: {import.meta.env.VITE_REST_SERVER_URL} - Copy Rights Reserved: &copy; Daniel Raz </p>
        </div>
    )
}