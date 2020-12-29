import { createContext, useContext, useEffect, useState } from 'react';
import { getProfile } from '../services/profiles';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const unsubscribe = getProfile(setProfile);
        return unsubscribe;
    }, []);

    return (
        <ProfileContext.Provider value={{ ...profile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
export const useProfile = () => useContext(ProfileContext);
