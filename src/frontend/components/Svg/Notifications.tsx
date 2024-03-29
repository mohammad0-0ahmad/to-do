import { Badge, makeStyles } from '@material-ui/core';

const Notifications = ({ counter = 0, ...props }) => {
    const classes = useStyles();
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            badgeContent={counter ? counter : false}
            classes={{ badge: classes.badge }}
            invisible={!counter}
        >
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 50 50"
                fill="currentColor"
                {...props}
            >
                <path d="M25 45.3125C27.2245 45.3125 29.044 43.4845 29.044 41.25H20.9559C20.9559 43.4845 22.7755 45.3125 25 45.3125ZM38.1435 33.125V21.9531C38.1435 15.7578 33.7962 10.4768 28.0331 9.15615V7.73437C28.0331 6.00762 26.7189 4.6875 25 4.6875C23.2811 4.6875 21.9669 6.00762 21.9669 7.73437V9.15615C16.2037 10.4768 11.8565 15.7578 11.8565 21.9531V33.125L7.8125 37.1875V39.2188H42.1875V37.1875L38.1435 33.125Z" />
            </svg>
        </Badge>
    );
};

export default Notifications;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type NotificationsPropsType = { counter?: number };

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { error } }) => ({
    badge: {
        backgroundColor: error.main,
        color: 'currentColor',
    },
}));
