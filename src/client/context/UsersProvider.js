import { createContext, useContext, useEffect, useState } from 'react';
import { getPossibleFriends } from '../services/users';
import { getFriendshipRequests } from '../services/friendShip';

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
    const [people, setPeople] = useState({});
    const [friendshipRequests, setFriendshipRequests] = useState({});

    useEffect(() => {
        const unsubscribePeople = getPossibleFriends(setPeople);
        const unsubscribeFriendshipRequests = getFriendshipRequests(
            setFriendshipRequests
        );
        //return unsubscribe;
    }, []);

    return (
        <UsersContext.Provider value={{ people, friendshipRequests }}>
            {children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;
export const useUsers = () => useContext(UsersContext);
