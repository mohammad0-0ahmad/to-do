import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../server/getFirebase';
import ProgressLogo from '../components/Svg/ProgressLogo';
import { signOut } from '../services/auth';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

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

    return isAuthenticated === null ? (
        <ProgressLogo />
    ) : (
        <AuthContext.Provider {...props} value={{ isAuthenticated }} />
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
