import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FilterType, init, setError, setFilterType, setLoading } from '../../../redux/vacationSlice';
import useService from '../../../hooks/useService';
import Card from '../card/Card';
import './List.css';
import VacationService from '../../../services/auth-aware/vacationService';
import { AuthContext } from '../../auth/auth/Auth';
import { UserRole } from '../../../models/user/User';

export default function List(): JSX.Element {
    const dispatch = useAppDispatch();
    const { vacations, loading, error, filterType } = useAppSelector(state => state.vacation);
    const vacationService = useService(VacationService);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { role } = useContext(AuthContext)!;
    const isAdmin = role === UserRole.ADMIN;
    
    // Create a function to load data
    const loadVacations = async () => {
        console.log('Loading vacations with filter:', filterType, 'page:', currentPage);
        try {
            dispatch(setLoading(true));
            let response;

            switch (filterType) {
                case FilterType.FOLLOWED:
                    console.log('Fetching followed vacations');
                    response = await vacationService.getFollowedVacations(currentPage);
                    break;
                case FilterType.UPCOMING:
                    console.log('Fetching upcoming vacations');
                    response = await vacationService.getUpcomingVacations(currentPage);
                    break;
                case FilterType.CURRENT:
                    console.log('Fetching current vacations');
                    response = await vacationService.getCurrentVacations(currentPage);
                    break;
                default:
                    console.log('Fetching all vacations');
                    response = await vacationService.getAllVacations(currentPage);
            }

            console.log('Received vacations:', response.vacations);
            dispatch(init(response.vacations));
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Failed to load vacations:', error);
            dispatch(setError('Failed to load vacations'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Socket.io listeners would go here
    useEffect(() => {
        // Example: Setup socket listeners
        // socket.on('newVacation', handleNewVacation);
        // socket.on('updateVacation', handleUpdateVacation);
        // socket.on('deleteVacation', handleDeleteVacation);
        // socket.on('follow', handleFollow);
        // socket.on('unFollow', handleUnfollow);

        // return () => {
        //   socket.off('newVacation');
        //   socket.off('updateVacation');
        //   socket.off('deleteVacation');
        //   socket.off('follow');
        //   socket.off('unFollow');
        // };
    }, []);

    // Load vacations when filter type or page changes
    useEffect(() => {
        loadVacations();
    }, [dispatch, filterType, currentPage]);

    const handleFilterChange = (filter: FilterType) => {
        console.log('Filter changing from', filterType, 'to', filter);
        setCurrentPage(1); // Reset to first page when changing filters
        dispatch(setFilterType(filter));
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            console.log('Going to previous page');
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            console.log('Going to next page');
            setCurrentPage(prev => prev + 1);
        }
    };

    if (loading) {
        return <div className="loading">Loading vacations...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className='List'>
            <div className='filtering-options'>
                <label>
                    <input
                        type='checkbox'
                        checked={filterType === FilterType.ALL}
                        onChange={() => handleFilterChange(FilterType.ALL)}
                    />
                    All
                </label>

                {/* Only show Favorites checkbox for non-admin users */}
                {!isAdmin && (
                    <label>
                        <input
                            type='checkbox'
                            checked={filterType === FilterType.FOLLOWED}
                            onChange={() => handleFilterChange(
                                filterType === FilterType.FOLLOWED ? FilterType.ALL : FilterType.FOLLOWED
                            )}
                        />
                        Favorites
                    </label>
                )}

                <label>
                    <input
                        type='checkbox'
                        checked={filterType === FilterType.UPCOMING}
                        onChange={() => handleFilterChange(
                            filterType === FilterType.UPCOMING ? FilterType.ALL : FilterType.UPCOMING
                        )}
                    />
                    Upcoming
                </label>

                <label>
                    <input
                        type='checkbox'
                        checked={filterType === FilterType.CURRENT}
                        onChange={() => handleFilterChange(
                            filterType === FilterType.CURRENT ? FilterType.ALL : FilterType.CURRENT
                        )}
                    />
                    Current
                </label>
            </div>

            {vacations.length === 0 ? (
                <div className="no-vacations">No vacations found</div>
            ) : (
                <>
                    <div className='vacations-grid'>
                        {vacations.map(vacation => (
                            <Card
                                key={vacation.id}
                                vacation={vacation}
                            />
                        ))}
                    </div>

                    <div className="pagination-controls">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            Previous
                        </button>
                        <span className="pagination-info">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}