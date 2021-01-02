import PersonCheck from '../Svg/PersonCheck';
import PersonUncheck from '../Svg/PersonUncheck';
import {
    acceptFriendshipRequest,
    rejectFriendshipRequest,
} from '../../services/friendShip';
import WithProfileCard from './WithProfileCard';
import { IconButton, makeStyles } from '@material-ui/core';
import { string } from 'prop-types';

const useStyles = makeStyles(({ palette: { green, red, type } }) => ({
    accept: { color: green[type] },
    reject: { color: red[type] },
}));

const PersonCard = ({ id }) => {
    const classes = useStyles();

    const accept = () => {
        acceptFriendshipRequest({ id });
    };

    const reject = () => {
        rejectFriendshipRequest({ id });
    };

    return (
        <>
            <IconButton className={classes.accept} onClick={accept}>
                <PersonCheck />
            </IconButton>
            <IconButton className={classes.reject} onClick={reject}>
                <PersonUncheck />
            </IconButton>
        </>
    );
};

PersonCard.propTypes = {
    id: string.isRequired,
};

export default WithProfileCard(PersonCard);
