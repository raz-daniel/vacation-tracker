import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound(): JSX.Element {
  return (
    <div className='NotFound'>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/home" className="back-link">Back to Home</Link>
    </div>
  );
}