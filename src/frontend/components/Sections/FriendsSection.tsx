import SectionBase from '../SectionBase';
import SearchField from '../Inputs/SearchField';
import FriendCard from '../Cards/FriendCard';
import { useUsers } from '../../providers/UsersProvider';
import Trans from '../Trans';
import { useState } from 'react';
import { doesUserMatchSearchKeyword } from '../../utilities/search';
import NoContent from '../Cards/NoContent';

const FriendsSection = () => {
    const { friends } = useUsers();
    const [searchKeyword, setSearchKeyword] = useState('');
    const friendsArray = Object.values(friends);

    const getFriendsCards = () => {
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

    const friendsCards = getFriendsCards();

    return (
        <SectionBase>
            <SearchField
                label={<Trans id="FriendsSection.SearchField" />}
                onChange={({ target: { value } }) => {
                    setSearchKeyword(value);
                }}
                disabled={!friendsArray.length}
            />
            {friendsCards.length ? (
                friendsCards
            ) : (
                <NoContent
                    CustomMessageCode={
                        friendsArray.length
                            ? 'FriendsSection.label2'
                            : 'FriendsSection.label1'
                    }
                />
            )}
        </SectionBase>
    );
};

export default FriendsSection;
