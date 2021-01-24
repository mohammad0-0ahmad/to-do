import useTranslation from 'next-translate/useTranslation';
import FriendshipRequestCard from '../client/components/Cards/FriendshipRequestCard';
import SectionBase from '../client/components/SectionBase';
import Seo from '../client/components/Seo';
import withRedirectionManger from '../client/components/withRedirectionManger';
import { useUsers } from '../client/context/UsersProvider';

const FriendshipRequests = () => {
    const { t: tr } = useTranslation();
    const { friendshipRequests } = useUsers();
    const friendshipRequestsArr = Object.entries(friendshipRequests);
    return (
        <>
            <Seo title={tr('common:friendship-requests.seo.title')} />
            <SectionBase>
                {Boolean(friendshipRequestsArr.length) &&
                    friendshipRequestsArr.map((request) => (
                        <FriendshipRequestCard
                            key={request[0]}
                            {...request[1]}
                        />
                    ))}
            </SectionBase>
        </>
    );
};

export default withRedirectionManger(FriendshipRequests, { requireAuth: true });
