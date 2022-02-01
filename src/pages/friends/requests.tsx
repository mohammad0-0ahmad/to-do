import useTranslation from 'next-translate/useTranslation';
import FriendshipRequestCard from 'frontend/components/Cards/FriendshipRequestCard';
import NoContent from 'frontend/components/Cards/NoContent';
import SectionBase from 'frontend/components/SectionBase';
import Seo from 'frontend/components/Seo';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';
import { useUsers } from 'frontend/providers/UsersProvider';
import { getServerSidePropsForNextTranslate } from 'frontend/utilities';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const Requests = () => {
    const { t: tr } = useTranslation();
    const { friendshipRequests } = useUsers();
    const friendshipRequestsArr = Object.entries(friendshipRequests);
    return (
        <>
            <Seo title={tr('common:friends.requests.seo.title')} />
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
