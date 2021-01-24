import { createContext, useContext, useEffect, useState } from 'react';
import userStatus from '../constants/userStatus';
import { getProfile, updateProfile } from '../services/profiles';
import { isUserStatusIsOnAutoMode } from '../utils';
import { signOut } from '../services/auth';

const ProfileContext = createContext();

const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({});
    const [hasUserStatusBeenSwitched, setHasUserStatusBeenSwitched] = useState(
        false
    );

    const switchUserAutoStatusTo = async (newStatus) => {
        const mustUserStatusChange =
            isUserStatusIsOnAutoMode(profile.status) &&
            profile.status !== userStatus[newStatus];
        if (mustUserStatusChange) {
            await updateProfile({ status: userStatus[newStatus] });
        }
        if (newStatus === userStatus.offline) {
            return signOut();
        }
    };

    useEffect(() => {
        const unsubscribe = getProfile(setProfile);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!hasUserStatusBeenSwitched) {
            switchUserAutoStatusTo(userStatus.online);
        }
        profile.status !== undefined && setHasUserStatusBeenSwitched(true);
    }, [profile.status]);

    return (
        <ProfileContext.Provider
            {...props}
            value={{ ...profile, switchUserAutoStatusTo }}
        />
    );
};

export default ProfileProvider;
export const useProfile = () => useContext(ProfileContext);
