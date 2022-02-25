import FriendshipRequestCard from 'frontend/components/Cards/FriendshipRequestCard';
import NoContent from 'frontend/components/Cards/NoContent';
import SectionBase from 'frontend/components/SectionBase';
import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';
import { useTranslation } from '@m0-0a/next-intl';
import { useUsers } from 'frontend/providers/UsersProvider';

const Requests = () => {
    const { t } = useTranslation();
    const { friendshipRequests } = useUsers();
    const friendshipRequestsArr = Object.entries(friendshipRequests);
    return (
        <>
            <Seo title={t('friends.requests.seo.title')} />
            <SectionBase>
                {!friendshipRequestsArr.length ? (
                    <NoContent CustomMessageCode="friends.requests.label1" />
                ) : (
                    friendshipRequestsArr.map((request) => (
                        <FriendshipRequestCard
                            key={request[0]}
                            {...request[1]}
                        />
                    ))
                )}
            </SectionBase>
        </>
    );
};

export default withRedirectionManger(Requests, { requireAuth: true });
