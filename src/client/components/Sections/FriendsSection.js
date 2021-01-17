import SectionBase from '../SectionBase';
import SearchField from '../Inputs/SearchField';
import FriendCard from '../Cards/FriendCard';
import { useUsers } from '../../context/UsersProvider';
//TODO: connect it with real data.
const FriendsSection = () => {
    const { friends } = useUsers();

    return (
        <SectionBase justify="flex-end">
            <SearchField label="Find a friend" />
            {Object.entries(friends).map(
                ([id, { photoURL, status, firstName, lastName, userName }]) => {
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
            )}
        </SectionBase>
    );
};

export default FriendsSection;
