import FriendshipRequestCard from '../client/components/Cards/FriendshipRequestCard';
import SectionBase from '../client/components/SectionBase';
import { useUsers } from '../client/context/UsersProvider';

const FriendshipRequests = () => {
    const users = useUsers();
    return (
        <SectionBase>
            {users &&
                Object.entries(users.friendshipRequests).map((request) => (
                    <FriendshipRequestCard key={request[0]} {...request[1]} />
                ))}
        </SectionBase>
    );
};

export default FriendshipRequests;
