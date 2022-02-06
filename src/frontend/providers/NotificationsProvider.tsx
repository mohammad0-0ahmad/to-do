import { createContext, useContext, useEffect, useState } from 'react';
import { getNotifications, NotificationType } from '../services/notifications';
import { unsubscribeAll } from '../utilities';
import { useProfile } from './ProfileProvider';

const NotificationsContext = createContext(null);

const NotificationsProvider: FC<any> = (props) => {
    const [notifications, setNotifications] = useState(null);
    const { notificationsCounter } = useProfile();

    useEffect(() => {
        const unsubscribe = getNotifications(setNotifications);
        return unsubscribeAll([unsubscribe]);
    }, []);

    return (
        <NotificationsContext.Provider
            {...props}
            value={{
                notificationsCounter: notificationsCounter || 0,
                notifications,
            }}
        />
    );
};

export default NotificationsProvider;

export const useNotifications: UseNotificationsType = () =>
    useContext(NotificationsContext);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type UseNotificationsType = () => Pick<UserSchema, 'notificationsCounter'> & {
    notifications: NotificationType[];
};
