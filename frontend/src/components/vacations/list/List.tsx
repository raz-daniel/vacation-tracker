import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FilterType, init, setError, setFilterType, setLoading } from '../../../redux/vacationSlice';
import useService from '../../../hooks/useService';

import Card from '../card/Card';
import './List.css';
import VacationService from '../../../services/auth-aware/vacationService';

export default function List(): JSX.Element {
    const dispatch = useAppDispatch();
    const { vacations, loading, error, filterType } = useAppSelector(state => state.vacation);
    const vacationService = useService(VacationService);

    useEffect(() => {
        (async () => {
            try {
                dispatch(setLoading(true));
                let getVacations;

                switch (filterType) {
                    case FilterType.FOLLOWED:
                        getVacations = await vacationService.getFollowedVacations();
                        break;
                    case FilterType.UPCOMING:
                        getVacations = await vacationService.getUpcomingVacations();
                        break;
                    case FilterType.CURRENT:
                        getVacations = await vacationService.getCurrentVacations();
                        break;
                    default:
                        getVacations = await vacationService.getAllVacations();
                        
                }

                dispatch(init(getVacations));
            } catch (error) {
                console.error(error);
                dispatch(setError('Failed to load vacations'));
            } finally {
                dispatch(setLoading(false));
            }
        }

        )();
    }, [dispatch, filterType, vacationService]);

    const handleFilterChange = (filter: FilterType) => {
        dispatch(setFilterType(filter));
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
                        checked={filterType === FilterType.FOLLOWED}
                        onChange={() => handleFilterChange(
                            filterType === FilterType.FOLLOWED ? FilterType.ALL : FilterType.FOLLOWED
                        )}
                    />
                    Show Only My Favorites
                </label>
                <label>
                    <input
                        type='checkbox'
                        checked={filterType === FilterType.UPCOMING}
                        onChange={() => handleFilterChange(
                            filterType === FilterType.UPCOMING ? FilterType.ALL : FilterType.UPCOMING
                        )}
                    />
                    Show Upcoming Vacations
                </label>
                <label>
                    <input
                        type='checkbox'
                        checked={filterType === FilterType.CURRENT}
                        onChange={() => handleFilterChange(
                            filterType === FilterType.CURRENT ? FilterType.ALL : FilterType.CURRENT
                        )}
                    />
                    Show Active Vacations
                </label>
            </div>

            {vacations.length === 0 ? (
                <div className="no-vacations">No vacations found</div>
            ) : (
                <div className='vacations-grid'>
                    {vacations.map(vacation => (
                        <Card key={vacation.id} vacation={vacation} />
                    ))}
                </div>
            )}
        </div>
    );
}