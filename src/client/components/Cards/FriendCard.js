
import PersonMinus from '../Svg/PersonMinus';
import WithProfileCard from './WithProfileCard';
import {IconButton,makeStyles} from '@material-ui/core';
import { string } from 'prop-types';

const useStyles = makeStyles(
    ({ palette: {red, type } }) => ({
        removeFriend: { color: red[type] },
    })
);

const FriendCard = ({id}) => {
    const classes = useStyles();

    return (
        <IconButton className={classes.removeFriend}>
            <PersonMinus />
        </IconButton>
    );
};

FriendCard.propTypes = {
    id: string.isRequired,
};

export default WithProfileCard(FriendCard);
