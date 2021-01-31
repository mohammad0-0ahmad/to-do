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
        const friendsEntries = Object.entries(friends);
        return searchKeyWord
            ? friendsEntries.reduce(
                  (
                      result,
                      [id, { firstName, lastName, userName, ...props }]
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
                                  key={id}
                                  {...{
                                      firstName,
                                      lastName,
                                      userName,
                                      id,
                                      ...props,
                                  }}
                              />
                          );
                      }
                      return result;
                  },
                  []
              )
            : friendsEntries.map(
                  ([
                      id,
                      { photoURL, status, firstName, lastName, userName },
                  ]) => {
                      const FriendCardProps = {
                          photoURL,
                          status,
                          firstName,
                          lastName,
                          userName,
                          id,
                      };
                      return <FriendCard key={id} {...FriendCardProps} />;
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
