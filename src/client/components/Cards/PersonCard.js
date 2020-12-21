import PersonPlus from '../Svg/PersonPlus';
import { sendFriendshipRequest } from '../../services/friendShip';
import WithProfileCard from './WithProfileCard';
import { IconButton, makeStyles } from '@material-ui/core';
import { string } from 'prop-types';

const useStyles = makeStyles(({ palette: { color4, type } }) => ({
    addFriend: { color: color4[type] },
}));

const PersonCard = ({ id }) => {
    const classes = useStyles();

    const addFriend = () => {
        sendFriendshipRequest({ id });
    };

    return (
        <IconButton className={classes.addFriend} onClick={addFriend}>
            <PersonPlus />
        </IconButton>
    );
};

PersonCard.propTypes = {
    id: string.isRequired,
};

export default WithProfileCard(PersonCard);
