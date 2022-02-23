import { Grid, makeStyles, Typography } from '@material-ui/core';

import UserAvatar from '../UserAvatar';

const UserCard: FC<UserCardPropsType> = ({
    photoURL,
    firstName,
    lastName,
    description,
}) => {
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
                    {[firstName, lastName].join(' ')}
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

export default UserCard;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type UserCardPropsType = Pick<
    UserSchema,
    'firstName' | 'lastName' | 'photoURL' | 'description'
>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    avatar: {
        border: `4px solid ${primary.main}`,
        borderRadius: '50%',
    },
    name: {
        color: primary.main,
        paddingTop: 16,
        paddingBottom: 16,
    },
    description: {
        color: text.primary,
        paddingBottom: 16,
    },
}));
