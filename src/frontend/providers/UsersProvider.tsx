import { createContext, useContext, useEffect, useState } from 'react';
import { getFriendList } from '../services/users';
import { getFriendshipRequests } from '../services/friendship';
import { useProfile } from './ProfileProvider';
import { unsubscribeAll } from '../utilities';

const UsersContext = createContext();

const UsersProvider = (props) => {
    const [people, setPeople] = useState(null);
    const [friends, setFriends] = useState({});
    const currentUserProfile = useProfile();
    const [friendshipRequests, setFriendshipRequests] = useState({});

    useEffect(() => {
        const unsubscribeFriends = getFriendList(setFriends);
        const unsubscribeFriendshipRequests = getFriendshipRequests(
            setFriendshipRequests
        );
        return unsubscribeAll([
            unsubscribeFriends,
            unsubscribeFriendshipRequests,
        ]);
    }, []);

    return (
        <UsersContext.Provider
            {...props}
            value={{
                friends,
                friendshipRequests,
                people,
                setPeople,
                allFetchedUsers: {
                    [currentUserProfile?.id]: currentUserProfile,
                    ...friends,
                },
            }}
        />
    );
};

export default UsersProvider;
export const useUsers = () => useContext(UsersContext);
