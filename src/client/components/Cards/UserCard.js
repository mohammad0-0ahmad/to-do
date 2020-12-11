import { Grid, makeStyles, Typography } from '@material-ui/core';
import { string } from 'prop-types';

const useStyles = makeStyles(({ palette: { color1, color4, type } }) => ({
    avatar: {
        border: `4px solid ${color4[type]}`,
        backgroundColor: color4[type],
        borderRadius: '50%',
        width: 250,
        height: 250,
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

const UserCard = ({ image, name, description }) => {
    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <img src={image} className={classes.avatar} />
            </Grid>
            <Grid item>
                <Typography variant="h4" component="h1" className={classes.name}>
                    {name}
                </Typography>
            </Grid>
            {description && (
                <Grid item>
                    <Typography className={classes.description}>{description}</Typography>
                </Grid>
            )}
        </Grid>
    );
};

UserCard.propTypes = {
    image: string.isRequired,
    name: string.isRequired,
    description: string,
};

export default UserCard;
