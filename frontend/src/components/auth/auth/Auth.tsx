import './Auth.css';
import { PropsWithChildren, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import User, { UserRole } from '../../../models/user/User';
import { createContext } from 'react';

export interface AuthContextInterface {
    jwt: string;
    firstName: string | null;
    role: UserRole | null;
    isLoading: boolean;
    newLogin(jwt: string): void;
    logout(): void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null)!;

export default function Auth(props: PropsWithChildren): JSX.Element {
    const JWT_KEY_NAME = 'jwt';
    const [jwt, setJwt] = useState<string>(localStorage.getItem(JWT_KEY_NAME) || '');
    const [firstName, setFirstName] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { children } = props;

    useEffect(() => {
        if (jwt) {
            try {
                const userData = jwtDecode<User>(jwt);
                setFirstName(userData.firstName);
                setRole(userData.role);
            } catch (error) {
                console.error('Invalid token on init', error);
                logout();
            }
        }
        setIsLoading(false)
    }, [jwt]);

    function newLogin(jwt: string) {
        try {
            const userData = jwtDecode<User>(jwt);
            setJwt(jwt);
            localStorage.setItem(JWT_KEY_NAME, jwt);
            setFirstName(userData.firstName);
            setRole(userData.role);
        } catch (error) {
            console.error('Invalid token on new login', error);
            logout();
            throw new Error('Invalid token on new login');
        }
    }

    function logout() {
        localStorage.removeItem(JWT_KEY_NAME);
        setJwt('');
        setFirstName(null);
        setRole(null);
    }

    return (
        <AuthContext.Provider value={{ jwt, firstName, role, newLogin, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}