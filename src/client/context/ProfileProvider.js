import { createContext, useContext, useEffect, useState } from 'react';
import userStatus from '../constants/userStatus';
import { getProfile, updateProfile } from '../services/profiles';
import { isUserStatusIsOnAutoMode } from '../utils';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({});
    const [hasUserStatusBeenSwitched, setHasUserStatusBeenSwitched] = useState(
        false
    );

    useEffect(() => {
        const unsubscribe = getProfile(setProfile);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!hasUserStatusBeenSwitched) {
            const userStatusMode =
                isUserStatusIsOnAutoMode(profile.status) &&
                profile.status !== userStatus.online;
            if (userStatusMode) {
                updateProfile({ status: userStatus.online });
            }
        }
        profile.status !== undefined && setHasUserStatusBeenSwitched(true);
    }, [profile.status]);

    return (
        <ProfileContext.Provider value={{ ...profile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
export const useProfile = () => useContext(ProfileContext);
