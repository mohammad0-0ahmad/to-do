import SectionBase from '../SectionBase';
import SearchField from '../Inputs/SearchField';
import FriendCard from '../Cards/FriendCard';
import { useUsers } from '../../context/UsersProvider';
import Trans from '../Trans';
import { useState } from 'react';

const FriendsSection = () => {
    const { friends } = useUsers();
    const [searchKeyWord, setSearchKeyWord] = useState('');

    const getFriendsCards = () => {
        const friendsArray = Object.values(friends);
        return searchKeyWord
            ? friendsArray.reduce(
                  (
                      result,
                      { uid, firstName, lastName, userName, ...props }
                  ) => {
                      if (
                          firstName
                              .toLocaleLowerCase()
                              .startsWith(searchKeyWord.toLocaleLowerCase()) ||
                          lastName
                              .toLocaleLowerCase()
                              .startsWith(searchKeyWord.toLocaleLowerCase()) ||
                          [firstName, lastName]
                              .join(' ')
                              .toLocaleLowerCase()
                              .startsWith(searchKeyWord.toLocaleLowerCase()) ||
                          userName
                              .toLocaleLowerCase()
                              .startsWith(searchKeyWord.toLocaleLowerCase())
                      ) {
                          result.push(
                              <FriendCard
                                  key={uid}
                                  {...{
                                      uid,
                                      firstName,
                                      lastName,
                                      userName,
                                      ...props,
                                  }}
                              />
                          );
                      }
                      return result;
                  },
                  []
              )
            : friendsArray.map(
                  ({
                      uid,
                      photoURL,
                      status,
                      firstName,
                      lastName,
                      userName,
                  }) => {
                      const FriendCardProps = {
                          uid,
                          photoURL,
                          status,
                          firstName,
                          lastName,
                          userName,
                      };
                      return <FriendCard key={uid} {...FriendCardProps} />;
                  }
              );
    };

    return (
        <SectionBase justify="flex-end">
            <SearchField
                label={<Trans id="FriendsSection.SearchField" />}
                onChange={({ target: { value } }) => setSearchKeyWord(value)}
            />
            {getFriendsCards()}
        </SectionBase>
    );
};

export default FriendsSection;
