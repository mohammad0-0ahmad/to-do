import { MouseEventHandler, useState } from 'react';
import withProfileCard from '../../HOCs/withProfileCard';
import { IconButton, makeStyles, Checkbox } from '@material-ui/core';
import TaskPlus from '../Svg/TaskPlus';
import TaskMinus from '../Svg/TaskMinus';
import Tooltip from '../Tooltip';

const InvitationSenderCard: FC<InvitationSenderCardPropsType> = ({
    onAdd,
    onRemove,
    onCheckStateChange,
    checked = false,
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

export default withProfileCard(InvitationSenderCard, {
    withoutShadow: true,
    withoutProfileButton: true,
});

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type InvitationSenderCardPropsType = {
    onAdd: MouseEventHandler<HTMLButtonElement>;
    onRemove: MouseEventHandler<HTMLButtonElement>;
    onCheckStateChange: MouseEventHandler<HTMLButtonElement>;
    checked: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, error, success, type } }) => ({
        addParticipant: { color: success.main },
        removeParticipant: { color: error.main },
        checkbox: {
            color: primary.main,
        },
    })
);
