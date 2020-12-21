import { createContext, useContext, useEffect, useState } from 'react';
import { getPossibleFriends } from '../services/users';

const PeopleContext = createContext();

const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState({});

    useEffect(() => {
        const unsubscribe = getPossibleFriends(setPeople);
        return unsubscribe;
    }, []);

    return (
        <PeopleContext.Provider value={{people,setPeople }}>
            {children}
        </PeopleContext.Provider>
    );
};

export default PeopleProvider;
export const usePeople = () => useContext(PeopleContext);
