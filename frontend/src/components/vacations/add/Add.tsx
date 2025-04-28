import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


import './Add.css'
import VacationService from '../../../services/auth-aware/vacationService';
import useService from '../../../hooks/useService';
import VacationDraft from '../../../models/vacation/VacationDraft';

interface VacationForm {
    destination: string;
    description: string;
    beginDate: string;
    endDate: string;
    price: number;
    image: FileList;
}

export default function Add(): JSX.Element {
    const vacationService = useService(VacationService);
    const { register, handleSubmit, formState: { errors } } = useForm<VacationForm>();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    async function submit(vacation: VacationForm) {
        try {
            setError('');
            setLoading(true);
            console.log("Image file:", vacation.image, vacation.image?.[0]);  // Debug log
            // Create a VacationDraft object
            const vacationDraft: VacationDraft = {
                destination: vacation.destination,
                description: vacation.description,
                beginDate: new Date(vacation.beginDate), // Convert string to Date
                endDate: new Date(vacation.endDate),     // Convert string to Date
                price: vacation.price,
                imageFile: vacation.image?.[0]  // Use the first file from FileList
            };

            console.log("Vacation draft:", vacationDraft);  // Debug log
            // Call your service
            await vacationService.addVacation(vacationDraft);
            navigate('/vacations');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error details:", err);  // More detailed error logging
            setError(err.response?.data?.message || err.message || 'Failed to add vacation');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='Add'>
            <div className="form-container">
                <h2>Add New Vacation</h2>

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
                                required: "Start date is required",
                                validate: value => new Date(value) >= new Date() || "Start date must be in the future"
                            })}
                        />
                        {errors.beginDate && <span className="error-message">{errors.beginDate?.message}</span>}
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
                                    "End date must be after start date"
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
                                min: { value: 0, message: "Price must be positive" }
                            })}
                        />
                        {errors.price && <span className="error-message">{errors.price.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Image is required"
                            })}
                        />
                        {errors.image && <span className="error-message">{errors.image.message}</span>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Vacation'}
                    </button>
                </form>
            </div>
        </div>
    )
}

