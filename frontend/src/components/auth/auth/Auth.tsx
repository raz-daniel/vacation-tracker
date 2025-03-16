import './Auth.css';
import { PropsWithChildren, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import User, { UserRole } from '../../../models/user/User';
import { createContext } from 'react';

export interface AuthContextInterface {
    jwt: string;
    name: string | null;
    role: UserRole | null;
    newLogin(jwt: string): void;
    logout(): void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null)!;

export default function Auth(props: PropsWithChildren): JSX.Element {
    const JWT_KEY_NAME = 'jwt';
    const [jwt, setJwt] = useState<string>(localStorage.getItem(JWT_KEY_NAME) || '');
    const [name, setName] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole | null>(null);
    const { children } = props;

    useEffect(() => {
        if (jwt) {
            try {
                const userData = jwtDecode<User>(jwt);
                setName(userData.firstName);
                setRole(userData.role);
            } catch (error) {
                console.error('Invalid token on init', error);
                logout();
            }
        }
    }, []);

    function newLogin(jwt: string) {
        try {
            const userData = jwtDecode<User>(jwt);
            setJwt(jwt);
            localStorage.setItem(JWT_KEY_NAME, jwt);
            setName(userData.firstName);
            setRole(userData.role);
        } catch (error) {
            console.error('Invalid token', error);
            logout();
            throw new Error('Invalid token');
        }
    }

    function logout() {
        localStorage.removeItem(JWT_KEY_NAME);
        setJwt('');
        setName(null);
        setRole(null);
    }

    return (
        <AuthContext.Provider value={{ jwt, name, role, newLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}