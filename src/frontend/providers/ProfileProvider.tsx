import { createContext, useContext, useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/profiles';
import { isUserStatusIsOnAutoMode, unsubscribeAll } from '../utilities';
import { signOut } from '../services/auth';
import { useTheme } from '@material-ui/core';
import { usePreferences } from './PreferencesProvider';
import { ResponseWithSnackbarDataType } from '../HOCs/withSnackbarManager';
import { UserStatus } from 'src/db_schemas';
import { useLocale } from '@m0-0a/next-intl';

const ProfileContext = createContext(null);

const ProfileProvider: FC<any> = (props) => {
    const [profile, setProfile] = useState<ProfileType>(null);
    const {
        setPaletteType,
        palette: { type: currentPaletteType },
    } = useTheme();
    const { lang, setLang } = useLocale();

    const { updateLocalPreferences } = usePreferences();

    const [hasUserStatusBeenSwitched, setHasUserStatusBeenSwitched] =
        useState(false);

    const switchUserAutoStatusTo: SwitchUserAutoStatusToType = async (
        newStatus
    ) => {
        const mustUserStatusChange =
            isUserStatusIsOnAutoMode(profile?.status) &&
            profile.status !== UserStatus[newStatus];
        if (mustUserStatusChange) {
            await updateProfile({ status: UserStatus[newStatus] });
        }
        if (newStatus === UserStatus.offline) {
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
                profile.preferences.lang !== lang)
        ) {
            profile.preferences && updateLocalPreferences(profile.preferences);
            setPaletteType(profile.preferences.paletteType);
            setLang(profile.preferences.lang);
        }
    }, [profile?.preferences]);

    useEffect(() => {
        if (!hasUserStatusBeenSwitched) {
            switchUserAutoStatusTo(UserStatus.online);
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

type UseProfileType = () => ProfileType & {
    switchUserAutoStatusTo: SwitchUserAutoStatusToType;
};

export type ProfileType = UserSchema &
    Pick<AuthSchema, 'email'> & {
        //TODO:check if id should be here.
        id?: string;
    };

type SwitchUserAutoStatusToType = (
    newStatus: UserStatus
) => ResponseWithSnackbarDataType;
