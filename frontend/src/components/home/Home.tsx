import './Home.css';
import { Link } from 'react-router-dom';
import photoImage from '../../assets/clothHomePhoto.avif'

export default function Home(): JSX.Element {
  return (
    <div className='Home'>
      <div className='Home-banner'>
        <img src={photoImage} />
        <h1>Fashion Store</h1>
        <p>yeah!</p>
      </div>

      <div className='Home-features'>
        <div className='Home-feature'>
          <div className='Home-feature-icon'>📚</div>
          <h3>Items Collection</h3>
          <p>Browse our comprehensive catalog of items organized by categories.</p>
        </div>

        <div className='Home-feature'>
          <div className='Home-feature-icon'>➕</div>
          <h3>Add Item</h3>
          <p>Easily add new Item to our inventory with detailed information.</p>
        </div>

        <div className='Home-feature'>
          <div className='Home-feature-icon'>🔍</div>
          <h3>Filtering</h3>
          <p>Categories items by categories, price, recycled and search.</p>
        </div>
      </div>

      <div className='Home-cta'>
        <Link to="/items/list">Browse Clothes</Link>
        <Link to="/items/add" className="secondary-btn">Add New Item</Link>
      </div>
    </div>
  );
}