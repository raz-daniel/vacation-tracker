import './List.css';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FilterType, init, setError, setFilterType, setLoading } from '../../../redux/vacationSlice';
import useService from '../../../hooks/useService';
import Card from '../card/Card';

import VacationService from '../../../services/auth-aware/vacationService';
import { AuthContext } from '../../auth/auth/Auth';
import { UserRole } from '../../../models/user/User';

export default function List(): JSX.Element {

    const dispatch = useAppDispatch();
    const { role } = useContext(AuthContext)!;
    const isAdmin = role === UserRole.ADMIN;

    const { vacations, loading, error, filterType } = useAppSelector(state => state.vacation);
    const vacationService = useService(VacationService);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadVacations = async () => {
        try {
            dispatch(setLoading(true));
            let response;

            switch (filterType) {
                case FilterType.FOLLOWED:
                    response = await vacationService.getFollowedVacations(currentPage);
                    break;
                case FilterType.UPCOMING:
                    response = await vacationService.getUpcomingVacations(currentPage);
                    break;
                case FilterType.CURRENT:
                    response = await vacationService.getCurrentVacations(currentPage);
                    break;
                default:
                    response = await vacationService.getAllVacations(currentPage);
            }

            dispatch(init(response.vacations));
            console.log('Vacations data from API:', response);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Failed to load vacations:', error);
            dispatch(setError('Failed to load vacations'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        loadVacations();
    }, [dispatch, filterType, currentPage]);

    const handleFilterChange = (filter: FilterType) => {
        setCurrentPage(1);
        dispatch(setFilterType(filter));
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
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