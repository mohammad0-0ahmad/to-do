import { createContext, useContext, useEffect, useState } from 'react';
import { getPossibleFriends, getFriendList } from '../services/users';
import { getFriendshipRequests } from '../services/friendship';
import { useProfile } from './ProfileProvider';
import { unsubscribeAll } from '../utilities';

const UsersContext = createContext();

const UsersProvider = (props) => {
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
            {...props}
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
        />
    );
};

export default UsersProvider;
export const useUsers = () => useContext(UsersContext);
