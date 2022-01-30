import { createContext, useContext, useEffect, useState } from 'react';
import userStatus, { UserStatusType } from '../constants/userStatus';
import { getProfile, updateProfile } from '../services/profiles';
import { isUserStatusIsOnAutoMode, unsubscribeAll } from '../utilities';
import { signOut } from '../services/auth';
import { PaletteType, useTheme } from '@material-ui/core';
import { usePreferences } from './PreferencesProvider';
import { useRouter } from 'next/router';
import { ResponseWithSnackbarDataType } from '../HOCs/withSnackbarManager';

const ProfileContext = createContext(null);

const ProfileProvider: FC<any> = (props) => {
    const [profile, setProfile] = useState<ProfileType>(null);
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

    const [hasUserStatusBeenSwitched, setHasUserStatusBeenSwitched] =
        useState(false);

    const switchUserAutoStatusTo: SwitchUserAutoStatusToType = async (
        newStatus
    ) => {
        const mustUserStatusChange =
            isUserStatusIsOnAutoMode(profile?.status) &&
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
        return unsubscribeAll([unsubscribe]);
    }, []);

    useEffect(() => {
        if (
            profile?.preferences &&
            (profile.preferences.paletteType !== currentPaletteType ||
                profile.preferences.lang !== currentLocale)
        ) {
            profile.preferences && updateLocalPreferences(profile.preferences);
            setPaletteType(profile.preferences.paletteType);
            push({ pathname, query }, asPath, {
                locale: profile.preferences.lang,
            });
        }
    }, [profile?.preferences]);

    useEffect(() => {
        if (!hasUserStatusBeenSwitched) {
            switchUserAutoStatusTo(userStatus.online);
        }
        profile?.status !== undefined && setHasUserStatusBeenSwitched(true);
    }, [profile?.status]);

    return (
        <ProfileContext.Provider
            {...props}
            value={{ ...profile, switchUserAutoStatusTo }}
        />
    );
};

export default ProfileProvider;

export const useProfile: UseProfileType = () => useContext(ProfileContext);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

//TODO: Improve type
type UseProfileType = () => ProfileType & {
    switchUserAutoStatusTo: SwitchUserAutoStatusToType;
};

export type ProfileType = {
    //TODO:check if id should be here.
    id?: string;
    uid: string;
    userName: string;
    photoURL: string;
    firstName: string;
    lastName: string;
    description: string;
    preferences: {
        paletteType: PaletteType;
        lang: string;
    };
    status: UserStatusType;
    email: string;
    notificationsCounter?: number;
};

type SwitchUserAutoStatusToType = (
    newStatus: UserStatusType
) => ResponseWithSnackbarDataType;
