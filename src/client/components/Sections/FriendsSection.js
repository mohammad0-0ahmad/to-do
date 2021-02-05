import SectionBase from '../SectionBase';
import SearchField from '../Inputs/SearchField';
import FriendCard from '../Cards/FriendCard';
import { useUsers } from '../../context/UsersProvider';
import Trans from '../Trans';
import { useState } from 'react';
import { doesUserMatchSearchKeyword } from '../../utilities/search';

const FriendsSection = () => {
    const { friends } = useUsers();
    const [searchKeyword, setSearchKeyword] = useState('');

    const getFriendsCards = () => {
        const friendsArray = Object.values(friends);
        return searchKeyword
            ? friendsArray.reduce(
                  (
                      result,
                      { uid, firstName, lastName, userName, ...props }
                  ) => {
                      if (
                          doesUserMatchSearchKeyword(
                              {
                                  firstName,
                                  lastName,
                                  userName,
                              },
                              searchKeyword
                          )
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
                onChange={({ target: { value } }) => setSearchKeyword(value)}
            />
            {getFriendsCards()}
        </SectionBase>
    );
};

export default FriendsSection;
