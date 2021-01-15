import { Grid, makeStyles, Typography } from '@material-ui/core';
import { string } from 'prop-types';
import UserAvatar from '../UserAvatar';

const useStyles = makeStyles(({ palette: { color1, color4, type } }) => ({
    avatar: {
        border: `4px solid ${color4[type]}`,
        borderRadius: '50%',
    },
    name: {
        color: color4[type],
        paddingTop: 16,
        paddingBottom: 16,
    },
    description: {
        color: color1[type],
        paddingBottom: 16,
    },
}));

const UserCard = ({ photoURL, firstName, lastName, description }) => {
    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <UserAvatar
                    photoURL={photoURL}
                    firstName={firstName}
                    lastName={lastName}
                    className={classes.avatar}
                    radius={125}
                />
            </Grid>
            <Grid item>
                <Typography
                    variant="h4"
                    component="h1"
                    className={classes.name}
                >
                    {[firstName, lastName].join('')}
                </Typography>
            </Grid>
            {description && (
                <Grid item>
                    <Typography className={classes.description}>
                        {description}
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

UserCard.propTypes = {
    photoURL: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    description: string,
};

export default UserCard;
