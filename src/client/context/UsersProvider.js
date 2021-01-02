import { createContext, useContext, useEffect, useState } from 'react';
import { getPossibleFriends, getFriendList } from '../services/users';
import { getFriendshipRequests } from '../services/friendShip';

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
    const [friends, setFriends] = useState({});
    const [people, setPeople] = useState({});
    const [friendshipRequests, setFriendshipRequests] = useState({});
    useEffect(() => {
        const unsubscribeFriends = getFriendList(setFriends);
        const unsubscribePeople = getPossibleFriends(setPeople);
        const unsubscribeFriendshipRequests = getFriendshipRequests(
            setFriendshipRequests
        );
        //return unsubscribe;
    }, []);

    return (
        <UsersContext.Provider value={{ friends, people, friendshipRequests }}>
            {children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;
export const useUsers = () => useContext(UsersContext);
