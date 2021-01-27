import { createContext, useContext, useEffect, useState } from 'react';
import userStatus from '../constants/userStatus';
import { getProfile, updateProfile } from '../services/profiles';
import { isUserStatusIsOnAutoMode } from '../utils';
import { signOut } from '../services/auth';
import { useTheme } from '@material-ui/core';
import { usePreferences } from './PreferencesProvider';
import { useRouter } from 'next/router';

const ProfileContext = createContext();

const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({});
    const {
        setPaletteType,
        palette: { type: currentPaletteType },
    } = useTheme();
    const {
        push,
        pathname,
        asPath,
        query,
        locale: currentLocale,
    } = useRouter();

    const { updateLocalPreferences } = usePreferences();

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
        if (
            profile.preferences &&
            (profile.preferences.paletteType !== currentPaletteType ||
                profile.preferences.lang !== currentLocale)
        ) {
            profile.preferences && updateLocalPreferences(profile.preferences);
            setPaletteType(profile.preferences.paletteType);
            push({ pathname, query }, asPath, {
                locale: profile.preferences.lang,
            });
        }
    }, [profile.preferences]);

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
