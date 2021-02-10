import SectionBase from '../client/components/SectionBase';
import Seo from '../client/components/Seo';
import withRedirectionManger from '../client/components/withRedirectionManger';
import useTranslation from 'next-translate/useTranslation';
import { useNotifications } from '../client/context/NotificationsProvider';
import NotificationCard from '../client/components/Cards/NotificationCard';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(({ palette: { color5, type } }) => ({
    paper: {
        backgroundColor: color5[type],
    },
}));

const Notifications = () => {
    const classes = useStyles();
    const { notifications } = useNotifications();
    const { t: tr } = useTranslation();

    return (
        <>
            <Seo title={tr('common:settings.seo.title')} />
            <SectionBase>
                <Paper elevation={4} className={classes.paper}>
                    {notifications &&
                        Object.entries(
                            notifications
                        ).map(([notificationId, notificationProps]) => (
                            <NotificationCard
                                key={notificationId}
                                {...notificationProps}
                                fullWidth
                            />
                        ))}
                </Paper>
            </SectionBase>
        </>
    );
};

export default withRedirectionManger(Notifications, { requireAuth: true });
