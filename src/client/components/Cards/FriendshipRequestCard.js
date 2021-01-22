import PersonCheck from '../Svg/PersonCheck';
import PersonUncheck from '../Svg/PersonUncheck';
import {
    acceptFriendshipRequest,
    rejectFriendshipRequest,
} from '../../services/friendShip';
import withProfileCard from './withProfileCard';
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
        <div>
            <IconButton className={classes.accept} onClick={accept}>
                <PersonCheck />
            </IconButton>
            <IconButton className={classes.reject} onClick={reject}>
                <PersonUncheck />
            </IconButton>
        </div>
    );
};

PersonCard.propTypes = {
    id: string.isRequired,
};

export default withProfileCard(PersonCard);
