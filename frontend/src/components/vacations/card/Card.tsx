import Vacation from '../../../models/vacation/Vacation';
import './Card.css'

interface CardProps {
    vacation: Vacation;
}

export default function Card({ vacation }: CardProps): JSX.Element {
    const { description, beginDate, endDate, imageUrl, destination, followerCount, id, isFollowedByCurrentUser, price} = vacation

        return(
            <div className='Card'>
                <div className='card-container'>
                    <h3>Destination: {destination}</h3>
                    <p>Description: {description}</p>
                    <p>beginDate: {new Date(beginDate).toLocaleDateString()}</p>
                    <p>endDate: {new Date(endDate).toLocaleDateString()}</p>
                    <p>price: {price}</p>
                    <p>imageUrl: {imageUrl}</p>
                    <p>followerCount: {followerCount}</p>
                    <p>isFollowedByCurrentUser: {isFollowedByCurrentUser}</p>
                    <p>id: {id}</p>
                </div>
            </div>
        )
}




