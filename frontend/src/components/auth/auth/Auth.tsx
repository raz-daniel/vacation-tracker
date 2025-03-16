import './Auth.css';
import { PropsWithChildren, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';
// import User from '../../../models/user/User';
import { createContext } from 'react';

export interface AuthContextInterface {
    jwt: string,
    newLogin(jwt: string): void,
    logout(): void
}

export const AuthContext = createContext<AuthContextInterface | null>(null)!;

export default function Auth(props: PropsWithChildren): JSX.Element {
    const JWT_KEY_NAME = 'jwt';
    const [jwt, setJwt] = useState<string>(localStorage.getItem(JWT_KEY_NAME) || '');
    const dispatch = useDispatch();
    const { children } = props;


    useEffect(() => {
        if (jwt) {
            try {
                // const userData = jwtDecode<User>(jwt);
                // dispatch(setUser(userData));
            } catch (error) {
                console.error('Invalid token', error);
                /*  logout - because eslint is making a warning when just putting logout, and it is over killing to solve that
                i can extract authContext to a separate file in Auth, and create a useCallback for the logout function
                and making a clearer initial mode for useContext instead of putting !. but it's an over kill so
                DRY seems like an easier solution to fix the eslint msg. or deleting eslint which is not an options for me */
                localStorage.removeItem(JWT_KEY_NAME);
                setJwt('');
                // dispatch(clearUser());
            }
        }
    }, [dispatch, jwt]);

    function newLogin(jwt: string) {
        setJwt(jwt);
        localStorage.setItem(JWT_KEY_NAME, jwt);

        try {
            // const userData = jwtDecode<User>(jwt);
            // dispatch(setUser(userData));
        } catch (error) {
            console.error('Invalid token', error);
        }
    }

    function logout() {
        localStorage.removeItem(JWT_KEY_NAME);
        setJwt('');
        // dispatch(clearUser());
    }

    return (
        <AuthContext.Provider value={{ jwt, newLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}