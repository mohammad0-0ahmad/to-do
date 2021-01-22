import PersonMinus from '../Svg/PersonMinus';
import withProfileCard from './withProfileCard';
import { IconButton, makeStyles } from '@material-ui/core';
import { string } from 'prop-types';
import { unfriend } from '../../services/friendShip';

const useStyles = makeStyles(({ palette: { red, type } }) => ({
    removeFriend: { color: red[type] },
}));

const FriendCard = ({ id }) => {
    const classes = useStyles();

    const handleRemoveFriend = () => {
        //TODO: Show prompt.
        unfriend({ id });
    };

    return (
        <IconButton
            className={classes.removeFriend}
            onClick={handleRemoveFriend}
        >
            <PersonMinus />
        </IconButton>
    );
};

FriendCard.propTypes = {
    id: string.isRequired,
};

export default withProfileCard(FriendCard);
