import { createContext, FC, useContext, useEffect, useState } from 'react';
import { getFriendList } from '../services/users';
import { getFriendshipRequests } from '../services/friendship';
import { ProfileType, useProfile } from './ProfileProvider';
import { unsubscribeAll } from '../utilities';

const UsersContext = createContext(null);

const UsersProvider: FC<any> = (props) => {
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

export const useUsers: UseUsersType = () => useContext(UsersContext);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
//TODO: Improve type
type UseUsersType = () => {
    friends: ProfileType[];
    allFetchedUsers: ProfileType[];
    friendshipRequests: FriendRequestListSchema;
    people: ProfileType[];
    setPeople: SetStateType<any>;
};
