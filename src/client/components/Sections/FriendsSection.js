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
            {Object.entries(friends).map((friend) => (
                <FriendCard key={friend[0]} {...friend[1]} />
            ))}
        </SectionBase>
    );
};

export default FriendsSection;
