import SectionBase from '../client/components/SectionBase';
import Seo from '../client/components/Seo';
import withRedirectionManger from '../client/components/withRedirectionManger';
import useTranslation from 'next-translate/useTranslation';
import { useNotifications } from '../client/context/NotificationsProvider';
import NotificationCard from '../client/components/Cards/NotificationCard';
import { makeStyles, Paper } from '@material-ui/core';
import NoContent from '../client/components/Cards/NoContent';
import { getServerSidePropsForNextTranslate } from '../client/utilities';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const useStyles = makeStyles(({ palette: { color5, type } }) => ({
    paper: {
        backgroundColor: color5[type],
    },
}));

const Notifications = () => {
    const classes = useStyles();
    const { notifications } = useNotifications();
    const { t: tr } = useTranslation();
    const notificationsEntries = Object.entries(notifications || {});

    return (
        <>
            <Seo title={tr('common:notifications.seo.title')} />
            <SectionBase>
                {notificationsEntries.length ? (
                    <Paper elevation={4} className={classes.paper}>
                        {notificationsEntries.map(
                            ([notificationId, notificationProps]) => (
                                <NotificationCard
                                    key={notificationId}
                                    {...notificationProps}
                                    fullWidth
                                />
                            )
                        )}
                    </Paper>
                ) : (
                    <NoContent />
                )}
            </SectionBase>
        </>
    );
};

export default withRedirectionManger(Notifications, { requireAuth: true });
