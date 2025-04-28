import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound(): JSX.Element {
  return (
    <div className='NotFound'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}