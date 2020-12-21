import SectionBase from '../SectionBase';
import SearchField from '../Inputs/SearchField';
import FriendCard from '../Cards/FriendCard';
//TODO: connect it with real data.
const FriendsSection = () => {
    return (
        <SectionBase justify="flex-end">
            <SearchField label="Find a friend" />
            <FriendCard
                src="https://randomuser.me/portraits/men/1.jpg"
                firstName="John"
                lastName="Doe"
                alreadyFriend
                status="online"
            />
        </SectionBase>
    );
};

export default FriendsSection;
