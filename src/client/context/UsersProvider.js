import { createContext, useContext, useEffect, useState } from 'react';
import { getPossibleFriends, getFriendList } from '../services/users';
import { getFriendshipRequests } from '../services/friendShip';
import { useProfile } from './ProfileProvider';
import { unsubscribeAll } from '../utils';

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
    const [friends, setFriends] = useState({});
    const [people, setPeople] = useState({});
    const currentUserProfile = useProfile();
    const [friendshipRequests, setFriendshipRequests] = useState({});
    useEffect(() => {
        const unsubscribeFriends = getFriendList(setFriends);
        const unsubscribePeople = getPossibleFriends(setPeople);
        const unsubscribeFriendshipRequests = getFriendshipRequests(
            setFriendshipRequests
        );
        return unsubscribeAll([
            unsubscribeFriends,
            unsubscribePeople,
            unsubscribeFriendshipRequests,
        ]);
    }, []);

    return (
        <UsersContext.Provider
            value={{
                friends,
                people,
                friendshipRequests,
                allFetchedUsers: {
                    ...people,
                    [currentUserProfile?.id]: currentUserProfile,
                    ...friends,
                },
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;
export const useUsers = () => useContext(UsersContext);
