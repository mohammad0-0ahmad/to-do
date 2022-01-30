import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utilities/getFirebase';
import ProgressLogo from '../components/Svg/ProgressLogo';
import { signOut } from '../services/auth';

const AuthContext = createContext(null);

const AuthProvider: FC<any> = (props) => {
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

export const useAuth: UseAuthType = () => useContext(AuthContext);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
type UseAuthType = () => { isAuthenticated: boolean };
