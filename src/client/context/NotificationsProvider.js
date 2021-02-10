import { createContext, useContext, useEffect, useState } from 'react';
import { getNotifications } from '../services/notifications';
import { unsubscribeAll } from '../utilities';
import { useProfile } from './ProfileProvider';

const NotificationsContext = createContext();

const NotificationsProvider = (props) => {
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
export const useNotifications = () => useContext(NotificationsContext);