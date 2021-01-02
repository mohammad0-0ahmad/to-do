import FriendshipRequestCard from '../client/components/Cards/FriendshipRequestCard';
import SectionsContainer from '../client/components/SectionsContainer';
import { useUsers } from '../client/context/UsersProvider';

const FriendshipRequests = () => {
    const users = useUsers();
    return (
        <SectionsContainer>
            {users &&
                Object.entries(users.friendshipRequests).map((request) => (
                    <FriendshipRequestCard key={request[0]} {...request[1]} />
                ))}
        </SectionsContainer>
    );
};

export default FriendshipRequests;
