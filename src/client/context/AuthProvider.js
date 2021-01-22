import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../server/getFirebase';
import { signOut } from '../services/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                if (user.emailVerified) {
                    setIsAuthenticated(true);
                } else {
                    signOut();
                }
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
