import { useState } from 'react';
import WithProfileCard from './WithProfileCard';
import { IconButton, makeStyles, Checkbox } from '@material-ui/core';
import TaskPlus from '../Svg/TaskPlus';
import TaskMinus from '../Svg/TaskMinus';
import { bool, func } from 'prop-types';
import Tooltip from '../ToolTip';

const useStyles = makeStyles(({ palette: { color4, red, green, type } }) => ({
    addParticipant: { color: green[type] },
    removeParticipant: { color: red[type] },
    checkbox: {
        color: color4[type],
    },
}));

const InvitationSenderCard = ({
    onAdd,
    onRemove,
    onCheckStateChange,
    checked,
}) => {
    const classes = useStyles();
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxState = (e) => {
        setIsChecked(e.target.checked);
        onCheckStateChange(e.target.checked);
    };

    return (
        <>
            {onAdd && (
                <IconButton className={classes.addParticipant} onClick={onAdd}>
                    <TaskPlus />
                </IconButton>
            )}
            {onRemove && (
                <IconButton
                    className={classes.removeParticipant}
                    onClick={onRemove}
                >
                    <TaskMinus />
                </IconButton>
            )}
            {onCheckStateChange && (
                <Tooltip title={'add user to the task'} arrow enterDelay={2000}>
                    <Checkbox
                        className={classes.checkbox}
                        checked={isChecked}
                        onChange={handleCheckboxState}
                        color="default"
                    />
                </Tooltip>
            )}
        </>
    );
};

InvitationSenderCard.propTypes = {
    onAdd: func,
    onRemove: func,
    onCheckStateChange: func,
    checked: bool,
};

InvitationSenderCard.defaultProps = {
    checked: false,
};

export default WithProfileCard(InvitationSenderCard, {
    withoutShadow: true,
    withoutProfileButton: true,
});
