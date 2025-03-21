import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useService from '../../../hooks/useService';
import Vacation from '../../../models/vacation/Vacation';
import { AuthContext } from '../../../components/auth/auth/Auth';
import { UserRole } from '../../../models/user/User';
import FollowerService from '../../../services/auth-aware/followerService';
import VacationService from '../../../services/auth-aware/vacationService';
import './Card.css';
import { useAppDispatch } from '../../../redux/hooks';
import { removeVacation, toggleVacationFollow } from '../../../redux/vacationSlice';

interface CardProps {
    vacation: Vacation;
}

export default function Card({ vacation }: CardProps): JSX.Element {
    console.log('Card rendering with vacation:', vacation);

    const { description, beginDate, endDate, imageUrl, destination, followerCount, isFollowedByCurrentUser, price, id } = vacation;
    const { role } = useContext(AuthContext)!;
    const isAdmin = role === UserRole.ADMIN;
    const isUser = role === UserRole.USER;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const followerService = useService(FollowerService);
    const vacationService = useService(VacationService);
    const dispatch = useAppDispatch();

    // Toggle follow status
    const handleToggleFollow = async () => {
        console.log('Toggle follow clicked - Before:', {
            isFollowedByCurrentUser,
            followerCount,
            id
        });
        // Store current state to use for API call
        const wasFollowed = isFollowedByCurrentUser;

        try {
            // Immediately update UI via Redux
            dispatch(toggleVacationFollow(id));
            console.log('Dispatched toggleVacationFollow, new state in Redux should be:', !wasFollowed);

            // Make API call based on original state
            if (wasFollowed) {
                console.log('Calling unfollowVacation API for:', id);
                await followerService.unfollowVacation(id);
            } else {
                console.log('Calling followVacation API for:', id);
                await followerService.followVacation(id);
            }

            console.log('API call successful');
        } catch (error) {
            console.error('Failed to toggle follow status:', error);
            // Revert the UI change on error
            dispatch(toggleVacationFollow(id));
            console.log('Reverted toggleVacationFollow due to error');
        }
    };

    // Handle delete vacation
    const handleDeleteVacation = async () => {
        try {
            console.log('Deleting vacation:', id);
            await vacationService.deleteVacation(id);
            console.log('Delete API call successful');

            // Update Redux state
            dispatch(removeVacation(id));
            console.log('Dispatched removeVacation');
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

                {/* Replace your current likes-section with this */}
                <div className="card-header">
                    <h3>{destination}</h3>

                    {/* Only show likes section for regular users and if there are followers */}
                    {isUser && (
                        <div className="likes-section">
                            {/* Only show heart if there are followers OR the current user follows */}
                            {(followerCount > 0 || isFollowedByCurrentUser) && (
                                <span className="heart-icon" onClick={handleToggleFollow}>
                                    {isFollowedByCurrentUser ? '❤️' : '🤍'}
                                </span>
                            )}

                            {/* Only show count if there are followers */}
                            {followerCount > 0 && (
                                <span className="follower-count">{followerCount}</span>
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
                            className={`follow-button ${isFollowedByCurrentUser ? 'unfollow' : 'follow'}`}
                            onClick={handleToggleFollow}
                        >
                            {isFollowedByCurrentUser ? 'Unfollow' : 'Follow'}
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