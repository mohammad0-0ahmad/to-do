import FriendshipRequestCard from '../client/components/Cards/FriendshipRequestCard';
import { useUsers } from '../client/context/UsersProvider';

const FriendshipRequests = () => {
    const users = useUsers();
    return (
        <>
            {users &&
                Object.entries(users.friendshipRequests).map((request) => (
                    <FriendshipRequestCard key={request[0]} {...request[1]} />
                ))}
        </>
    );
};

export default FriendshipRequests;
