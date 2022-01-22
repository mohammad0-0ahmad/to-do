import useTranslation from 'next-translate/useTranslation';
import FriendshipRequestCard from '../../client/components/Cards/FriendshipRequestCard';
import NoContent from '../../client/components/Cards/NoContent';
import SectionBase from '../../client/components/SectionBase';
import Seo from '../../client/components/Seo';
import withRedirectionManger from '../../client/components/withRedirectionManger';
import { useUsers } from '../../client/context/UsersProvider';
import { getServerSidePropsForNextTranslate } from '../../client/utilities';
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
