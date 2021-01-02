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
            {/*<FriendCard
                src="https://randomuser.me/portraits/men/1.jpg"
                firstName="John"
                lastName="Doe"
                alreadyFriend
                status="online"
            />*/}
        </SectionBase>
    );
};

export default FriendsSection;
