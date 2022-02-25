import { useEffect, useState } from 'react';
import { Grid, GridProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import TaskCard, { WithTaskCardVariantBasePropsType } from '../TaskCard';
import UserAvatar from 'frontend/components/UserAvatar';
import ConfirmationDialog from 'frontend/components/Dialogs/ConfirmationDialog';
import Trans from 'frontend/components/Trans';
import Button from 'frontend/components/Inputs/Button';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from 'frontend/HOCs/withSnackbarManager';
import { TaskPrivacy } from 'src/db_schemas';
import { createTask } from 'frontend/services/tasks';
import TaskCardTextFieldItem from '../components/TaskCardTextFieldItem';
import { getTaskDataChangeHandler, taskCardSpecialItems } from '../config';

const GeneratorVariant: FC<GeneratorVariantType> = ({
    children: [child1, ...children],
    className,
    isExpandedState,
    showSnackbar,
    taskDataState: [taskData, setTaskData],
    ...props
}) => {
    const [isExpanded, setIsExpanded] = isExpandedState;
    const classes = useStyles({ isExpanded });
    const [
        isCreateTaskConfirmationDialogVisible,
        setIsCreateTaskConfirmationDialogVisible,
    ] = useState(false);

    const createTaskHandle = async () => {
        try {
            hideCreateTaskConfirmationDialog();
            showSnackbar(await createTask(taskData));
            handleCancel();
        } catch (err) {
            //console.error(err);
        }
    };

    const hideCreateTaskConfirmationDialog = () => {
        setIsCreateTaskConfirmationDialogVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsCreateTaskConfirmationDialogVisible(true);
    };

    const handleCancel = () => {
        //@ts-ignore
        setTaskData((current) => ({ ...current, ...TaskCard.defaultProps }));
    };

    useEffect(() => {
        handleCancel();
    }, []);

    useEffect(() => {
        const shouldBeExpanded = Boolean(
            taskData.title ||
                taskData.privacy !== TaskPrivacy.public ||
                taskData.date ||
                taskData.startTime ||
                taskData.endTime ||
                taskData.description ||
                Object.keys(taskData.participants).length
        );
        isExpanded !== shouldBeExpanded && setIsExpanded(shouldBeExpanded);
    }, [taskData]);

    return (
        <Grid
            container
            className={clsx(classes.GeneratorWrapper, className)}
            {...props}
        >
            <Grid container justifyContent="space-between">
                <Grid item xs={7}>
                    <Grid item xs={12} className={classes.titleWrapper}>
                        <TaskCardTextFieldItem
                            {...taskCardSpecialItems.title}
                            isEditMode={true}
                            onChange={getTaskDataChangeHandler(setTaskData)}
                            value={taskData.title}
                        />
                    </Grid>
                    {isExpanded && child1}
                </Grid>
                <Grid item>
                    <UserAvatar
                        radius={50}
                        owner
                        photoURL={taskData.owner.photoURL}
                        firstName={taskData.owner.firstName}
                        lastName={taskData.owner.lastName}
                    />
                </Grid>
            </Grid>
            {isExpanded && (
                <>
                    <Grid container>{children}</Grid>
                    <Grid container justifyContent="space-between">
                        <Grid item xs={5}>
                            <ConfirmationDialog
                                body={
                                    <Trans id="TaskCard.dialogs.taskCancellation" />
                                }
                                confirmButtonProps={{ onClick: handleCancel }}
                            >
                                <Button
                                    fullWidth
                                    backgroundColorVariant="error"
                                >
                                    <Trans id="TaskCard.buttons.cancelTaskCreation" />
                                </Button>
                            </ConfirmationDialog>
                        </Grid>
                        <Grid item xs={5}>
                            <ConfirmationDialog
                                handleClose={hideCreateTaskConfirmationDialog}
                                open={isCreateTaskConfirmationDialogVisible}
                                body={
                                    <Trans id="TaskCard.dialogs.taskConfirmation" />
                                }
                                confirmButtonProps={{
                                    onClick: createTaskHandle,
                                }}
                                rejectButtonProps={{
                                    onClick: hideCreateTaskConfirmationDialog,
                                }}
                            />
                            <Button
                                fullWidth
                                onClick={handleSubmit}
                                backgroundColorVariant="primary"
                            >
                                <Trans id="TaskCard.buttons.createTask" />
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default withSnackbarManager(GeneratorVariant);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type GeneratorVariantType = WithSnackbarManagerType<
    WithTaskCardVariantBasePropsType<GridProps>
>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { background }, spacing, direction }) => ({
        GeneratorWrapper: {
            padding: spacing(2),
            backgroundColor: background.paper,
            borderRadius: 4,
            boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.25)',
        },
        titleWrapper: {
            //@ts-ignore
            marginTop: ({ isExpanded }) => (!isExpanded ? 18 : ''),
            //@ts-ignore
            transform: ({ isExpanded }) =>
                !isExpanded
                    ? `scale(1.2) translate(${
                          direction === 'rtl' ? '-' : '+'
                      }10%)`
                    : '',
            transition: '300ms margin,300ms transform',
        },
        title: {
            paddingLeft: 8,
            fontSize: 18,
            display: '-webkit-box',
            lineClamp: 1,
            boxOrient: 'vertical',
            overflow: 'hidden',
            lineBreak: 'anywhere',
        },
    })
);
