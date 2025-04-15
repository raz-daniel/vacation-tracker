import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useService from '../../../hooks/useService';
import VacationService from '../../../services/auth-aware/vacationService';
import { useAppDispatch } from '../../../redux/hooks';
import { updateVacation } from '../../../redux/vacationSlice';
import './Edit.css';

interface VacationForm {
    destination: string;
    description: string;
    beginDate: string;
    endDate: string;
    price: number;
    image?: FileList;
}

export default function Edit(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VacationForm>();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string>('');
    const navigate = useNavigate();
    const vacationService = useService(VacationService);
    const dispatch = useAppDispatch();

    // Load vacation data
    useEffect(() => {
        async function loadVacation() {
            try {
                if (!id) return;
                setLoading(true);
                // const response = await vacationService.getAllVacations();
                // const vacation = response.vacations.find(v => v.id === id);
                const vacation = await vacationService.getVacationById(id)

                if (!vacation) {
                    setError('Vacation not found');
                    return;
                }

                // Format dates for input fields (YYYY-MM-DD)
                const formatDate = (date: Date) => {
                    const d = new Date(date);
                    return d.toISOString().split('T')[0];
                };

                setValue('destination', vacation.destination);
                setValue('description', vacation.description);
                setValue('beginDate', formatDate(vacation.beginDate));
                setValue('endDate', formatDate(vacation.endDate));
                setValue('price', vacation.price);
                setCurrentImage(vacation.imageUrl);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error('Failed to load vacation', err);
                setError(err.message || 'Failed to load vacation');
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadVacation();
        }
    }, [ id ]);

    async function submit(vacationData: VacationForm) {
        if (!id) return;
        
        try {
            setError('');
            setLoading(true);

            console.log('Submitting vacation data:', vacationData);
            
            const formData = new FormData();
            formData.append('destination', vacationData.destination);
            formData.append('description', vacationData.description);
            formData.append('beginDate', new Date(vacationData.beginDate).toISOString());
            formData.append('endDate', new Date(vacationData.endDate).toISOString());
            formData.append('price', vacationData.price.toString());
            
            // Only append image if a new one was selected
            if (vacationData.image && vacationData.image.length > 0) {
                formData.append('image', vacationData.image[0]);
            }

            const updatedVacation = await vacationService.updateVacation(id, formData);
            dispatch(updateVacation(updatedVacation));
            
            navigate('/vacations');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error('Failed to update vacation', err);
            setError(err.response?.data?.message || err.message || 'Failed to update vacation');
        } finally {
            setLoading(false);
        }
    }

    if (loading && !currentImage) {
        return <div className="loading">Loading vacation data...</div>;
    }

    return (
        <div className='Edit'>
            <div className="form-container">
                <h2>Edit Vacation</h2>
                
                {error && <div className="error">{error}</div>}
                
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                        <label htmlFor="destination">Destination</label>
                        <input
                            id="destination"
                            type="text"
                            {...register("destination", { 
                                required: "Destination is required",
                                minLength: { value: 2, message: "Destination must be at least 2 characters" }
                            })}
                        />
                        {errors.destination && <span className="error-message">{errors.destination.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            {...register("description", { 
                                required: "Description is required",
                                minLength: { value: 10, message: "Description must be at least 10 characters" }
                            })}
                        />
                        {errors.description && <span className="error-message">{errors.description.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="beginDate">Begin Date</label>
                        <input
                            id="beginDate"
                            type="date"
                            {...register("beginDate", { 
                                required: "Begin date is required"
                                // No future date validation for edit
                            })}
                        />
                        {errors.beginDate && <span className="error-message">{errors.beginDate.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            {...register("endDate", { 
                                required: "End date is required",
                                validate: (value, formValues) => 
                                    new Date(value) > new Date(formValues.beginDate) || 
                                    "End date must be after begin date"
                            })}
                        />
                        {errors.endDate && <span className="error-message">{errors.endDate.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            {...register("price", { 
                                required: "Price is required",
                                min: { value: 0, message: "Price must be positive" },
                                max: { value: 10000, message: "Price cannot exceed $10,000" }
                            })}
                        />
                        {errors.price && <span className="error-message">{errors.price.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        {currentImage && (
                            <div className="current-image">
                                <img src={currentImage} alt="Current vacation" className="thumbnail" />
                                <p>Current image (upload a new one to replace)</p>
                            </div>
                        )}
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            {...register("image")}
                        />
                        {errors.image && <span className="error-message">{errors.image.message}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Updating...' : 'Update Vacation'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/vacations')}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}