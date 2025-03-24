import './Card.css';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useService from '../../../hooks/useService';
import Vacation from '../../../models/vacation/Vacation';
import { AuthContext } from '../../../components/auth/auth/Auth';
import { UserRole } from '../../../models/user/User';
import FollowerService from '../../../services/auth-aware/followerService';
import VacationService from '../../../services/auth-aware/vacationService';
import { useAppDispatch } from '../../../redux/hooks';
import { removeVacation, toggleVacationFollow } from '../../../redux/vacationSlice';
import useUserId from '../../../hooks/useUserId';

interface CardProps {
    vacation: Vacation;
}

export default function Card({ vacation }: CardProps): JSX.Element {
    const dispatch = useAppDispatch();
    const { description, beginDate, endDate, imageUrl, destination, price, id, followers } = vacation;
    const { role } = useContext(AuthContext)!;
    const isAdmin = role === UserRole.ADMIN;
    const isUser = role === UserRole.USER;
    const currentUserId = useUserId();

    const FollowersCount = followers?.length || 0;
    const isFollowed = followers?.some(follower => follower.id === currentUserId) || false;

    const followerService = useService(FollowerService);
    const vacationService = useService(VacationService);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleToggleFollow = async () => {
        try {
            if (isFollowed) {
                await followerService.unfollowVacation(id);
            } else {
                await followerService.followVacation(id);
            }
            dispatch(toggleVacationFollow({ vacationId: id, userId: currentUserId }));
        } catch (error) {
            console.error('Failed to toggle follow status:', error);
        }
    };

    // Handle delete vacation
    const handleDeleteVacation = async () => {
        try {
            await vacationService.deleteVacation(id);
            dispatch(removeVacation(id));
        } catch (error) {
            console.error('Failed to delete vacation:', error);
        } finally {
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className='Card'>
            <div className='card-container'>
                <div className="card-image">
                    <img src={imageUrl} alt={destination} />
                </div>

                <div className="card-header">
                    <h3>{destination}</h3>

                    {isUser && (
                        <div className="likes-section">
                            {/* Only show heart if there are followers OR the current user follows */}
                            {(FollowersCount !== 0) && (
                                <span className="heart-icon" onClick={handleToggleFollow}>
                                    {isFollowed ? '❤️' : '🤍'} {FollowersCount}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="card-body">
                    <p className="description">{description}</p>
                    <div className="dates">
                        <p>Begin: {new Date(beginDate).toLocaleDateString()}</p>
                        <p>End: {new Date(endDate).toLocaleDateString()}</p>
                    </div>
                    <p className="price">${price}</p>

                    {isUser && (
                        <button
                            className={`follow-button ${isFollowed ? 'unfollow' : 'follow'}`}
                            onClick={handleToggleFollow}

                        >
                            {isFollowed ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>

                {isAdmin && (
                    <div className="admin-controls">
                        <NavLink
                            to={`/vacations/edit/${id}`}
                            className="edit-button"
                        >
                            Edit
                        </NavLink>
                        <button
                            className="delete-button"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            Delete
                        </button>
                    </div>
                )}

                {showDeleteConfirm && (
                    <div className="delete-confirmation">
                        <div className="confirmation-dialog">
                            <h4>Confirm Deletion</h4>
                            <p>Are you sure you want to delete this vacation?</p>
                            <div className="confirmation-buttons">
                                <button
                                    className="confirm-button"
                                    onClick={handleDeleteVacation}
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    className="cancel-button"
                                    onClick={() => setShowDeleteConfirm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}