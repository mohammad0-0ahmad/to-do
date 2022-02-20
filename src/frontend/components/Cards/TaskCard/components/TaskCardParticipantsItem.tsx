import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { AvatarGroupProps } from '@material-ui/lab';
import ParticipantManagerDialog, {
    ParticipantManagerDialogPropsType,
} from 'frontend/components/Dialogs/ParticipantManagerDialog';
import Plus from 'frontend/components/Svg/Plus';
import Tooltip from 'frontend/components/Tooltip';
import Trans from 'frontend/components/Trans';
import clsx from 'clsx';
import ParticipantsAvatars from './ParticipantsAvatars';
import { WithTaskCardItemBasePropsType } from '../TaskCard';

const TaskCardParticipantsItem: FC<TaskCardParticipantsItemPropsType> = ({
    name,
    value: participants,
    label,
    onChange,
    max,
    isExpanded,
    isEditMode = false,
    gridProps,
}) => {
    const classes = useStyles();
    const handleChange = (
        value: ParticipantManagerDialogPropsType['participants']
    ) => {
        onChange && onChange({ target: { value, name } });
    };

    if (isEditMode) {
        return (
            <Grid
                item
                className={clsx(classes.participants, gridProps.className)}
                {...gridProps}
            >
                <Typography component="label" className="TaskCard-labels">
                    <Trans id={label} />
                </Typography>
                <Grid container alignItems="center">
                    <ParticipantManagerDialog
                        participants={participants}
                        setParticipants={handleChange}
                    >
                        <Grid item>
                            <ParticipantsAvatars
                                max={max}
                                participants={participants}
                                isExpanded={isExpanded}
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip titleTransId="TaskCard.toolTips.mangeParticipants">
                                <IconButton
                                    className={classes.addParticipantButton}
                                >
                                    <Plus />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </ParticipantManagerDialog>
                </Grid>
            </Grid>
        );
    } else if (Object.keys(participants).length) {
        return (
            <Grid
                item
                className={clsx(classes.participants, gridProps.className)}
                {...gridProps}
            >
                <Typography component="label" className="TaskCard-labels">
                    <Trans id={label} />
                </Typography>
                <Grid
                    container
                    alignItems="center"
                    className="TaskCard-details"
                >
                    <ParticipantsAvatars
                        participants={participants}
                        isExpanded={isExpanded}
                        max={max}
                    />
                </Grid>
            </Grid>
        );
    } else {
        return null;
    }
};

export default TaskCardParticipantsItem;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary, transparent } }) => ({
    participants: {
        color: transparent,
        '&>div>*': { cursor: 'pointer' },
    },
    addParticipantButton: {
        color: primary.main,
    },
}));

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskCardParticipantsItemPropsType = WithTaskCardItemBasePropsType<{
    name: string;
    value?: Record<UserSchema['uid'], NormalizedParticipantType>;
    onChange?: (e: {
        target: {
            name: TaskCardParticipantsItemPropsType['name'];
            value: TaskCardParticipantsItemPropsType['value'];
        };
    }) => void;
    label: string;
    isExpanded?: boolean;
    max?: AvatarGroupProps['max'];
}>;
