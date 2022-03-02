import {
    Accordion,
    AccordionDetails,
    AccordionProps,
    AccordionSummary,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import Arrow from 'frontend/components/Svg/Arrow';
import Tooltip from 'frontend/components/Tooltip';
import UserAvatar from 'frontend/components/UserAvatar';
import ActionButtons from '../components/ActionButtons';
import {
    TaskCardPropsType,
    WithTaskCardVariantBasePropsType,
} from '../TaskCard';
import ParticipantsAvatars from '../components/ParticipantsAvatars';
import TaskCardTextFieldItem from '../components/TaskCardTextFieldItem';
import { getTaskDataChangeHandler, taskCardSpecialItems } from '../config';
import { ReactNode } from 'react';

const DefaultVariant: FC<DefaultVariantType> = ({
    children: [child1, child2, child3, ...children],
    className,
    isExpandedState,
    isEditModeState,
    CustomSummaryContent,
    taskDataState: [taskData, setTaskData],
    ...props
}) => {
    const [isExpanded, setIsExpanded] = isExpandedState;
    const [isEditMode, setIIsEditMode] = isEditModeState;
    const { title, owner, participants } = taskData;
    const classes = useStyles();

    return (
        <Accordion
            elevation={4}
            className={clsx(classes.DefaultVariant, className)}
            expanded={isExpanded}
            {...props}
        >
            <AccordionSummary
                className={classes.summary}
                onClick={() => {
                    !isEditMode && setIsExpanded(!isExpanded);
                }}
                expandIcon={!isEditMode && <Arrow />}
            >
                {CustomSummaryContent ? (
                    <CustomSummaryContent
                        expanded={isExpanded}
                        ownerName={[owner.firstName, owner.lastName].join(' ')}
                    />
                ) : (
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            {!isEditMode && (
                                <Tooltip title={title}>
                                    <Typography
                                        component="h3"
                                        variant="h6"
                                        className={classes.title}
                                    >
                                        {title}
                                    </Typography>
                                </Tooltip>
                            )}
                        </Grid>
                        <Grid
                            item
                            container
                            className={classes.actionsButtonsContainer}
                            justifyContent="flex-end"
                        >
                            {isExpanded ? (
                                <ActionButtons
                                    isEditModeState={[
                                        isEditMode,
                                        setIIsEditMode,
                                    ]}
                                    taskData={taskData}
                                />
                            ) : (
                                <>
                                    <ParticipantsAvatars
                                        isExpanded={isExpanded}
                                        participants={participants}
                                        max={3}
                                    />
                                    <UserAvatar
                                        photoURL={owner.photoURL}
                                        firstName={owner.firstName}
                                        lastName={owner.lastName}
                                        radius={20}
                                        owner
                                    />
                                </>
                            )}
                        </Grid>
                    </Grid>
                )}
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid container justifyContent="space-between">
                        <Grid item xs={7}>
                            {isEditMode && (
                                <TaskCardTextFieldItem
                                    isEditMode={true}
                                    onChange={getTaskDataChangeHandler(
                                        setTaskData
                                    )}
                                    value={taskData.title}
                                    {...taskCardSpecialItems.title}
                                />
                            )}
                            {child1}
                            {child2}
                            {child3}
                        </Grid>
                        <Grid item>
                            <UserAvatar
                                radius={50}
                                owner
                                photoURL={owner.photoURL}
                                firstName={owner.firstName}
                                lastName={owner.lastName}
                            />
                        </Grid>
                    </Grid>
                    {children}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default DefaultVariant;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type DefaultVariantType = AccordionProps &
    PropsWithChildren<
        WithTaskCardVariantBasePropsType<{
            isEditModeState: StateType<boolean>;
            CustomSummaryContent?: TaskCardPropsType['CustomSummaryContent'];
        }>
    >;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { primary } }) => ({
    DefaultVariant: {
        '&:before': {
            display: 'none',
        },
        '&.MuiAccordion-root.Mui-expanded': { marginBottom: 0 },
    },
    summary: {
        paddingLeft: 4,
        //@ts-ignore
        paddingRight: ({ isExpanded }) => (isExpanded ? 8 : 16),
        height: 72,
        direction: 'rtl',
        '&>*': {
            margin: 0,
            direction: 'ltr',
            flexFlow: 'nowrap',
        },
        '& .MuiAccordionSummary-content > *': {
            flexFlow: 'nowrap',
        },
        '&>.MuiAccordionSummary-expandIcon': {
            color: primary.main,
        },
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
    actionsButtonsContainer: { width: 'fit-content', flexShrink: 0 },
}));
