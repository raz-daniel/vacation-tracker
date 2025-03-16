 import './Register.css'
 import { useState, useContext } from 'react';
 import { useNavigate, NavLink } from 'react-router-dom';
 import { useForm } from 'react-hook-form';

 import auth from '../../../services/auth';
 import RegisterModel from '../../../models/user/Register';
 import axios from 'axios';
import { AuthContext } from '../auth/Auth';


 export default function Register(): JSX.Element {


    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterModel>();
    const { newLogin } = useContext(AuthContext)!;
    const navigate = useNavigate();
    
    async function submit(registerData: RegisterModel) {
        setError('');
        setLoading(true);
        
        try {
            const jwt = await auth.register(registerData);
            newLogin(jwt);
            navigate('/vacations');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Registration failed');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='Register'>
            <div className="register-container">
                <h2>Register</h2>
                
                {error && <div className="error">{error}</div>}
                
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            {...register("firstName", { required: "First name is required" })}
                        />
                        {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            {...register("lastName", { required: "Last name is required" })}
                        />
                        {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { 
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })}
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                    </div>
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                
                <p>
                    Already have an account? <NavLink to="/auth/login">Login</NavLink>
                </p>
            </div>
        </div>
    )
 }