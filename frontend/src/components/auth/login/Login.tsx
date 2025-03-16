import { useContext, useState } from 'react';
import './Login.css'
import { useForm } from 'react-hook-form';
import LoginModel from '../../../models/user/Login';
import { AuthContext } from '../auth/Auth';
import { ErrorResponse, NavLink, useNavigate } from 'react-router-dom';
import auth from '../../../services/auth';
import axios, { AxiosError } from 'axios';

export default function Login(): JSX.Element {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>();
    const { newLogin } = useContext(AuthContext)!;
    const navigate = useNavigate();

    async function submit(login: LoginModel) {
        setError('');
        setLoading(true);
        
        try {
            const jwt = await auth.login(login);
            newLogin(jwt);
            navigate('/vacations');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<ErrorResponse>;
                setError(axiosError.response?.data?.statusText || 'Login failed');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

   return (
       <div className='Login'>
           <div className="login-container">
                <h2>Login</h2>
                
                {error && <div className="error">{error}</div>}
                
                <form onSubmit={handleSubmit(submit)}>
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
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <p>
                    Don't have an account? <NavLink to="/auth/register">Register</NavLink>
                </p>
            </div>
       </div>
   )
}