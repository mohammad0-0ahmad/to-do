import { Grid, GridProps, makeStyles } from '@material-ui/core';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import TaskCardTextFieldItem, {
    TaskCardTextFieldItemPropsType,
} from './components/TaskCardTextFieldItem';
import DefaultVariant from './variants/DefaultVariant';
import GeneratorVariant from './variants/GeneratorVariant';
import { useProfile } from 'frontend/providers/ProfileProvider';
import { useUsers } from 'frontend/providers/UsersProvider';
import {
    getTaskDataChangeHandler,
    taskCardCommonItems,
    TaskCardItemType,
} from './config';
import { unsubscribeAll } from 'frontend/utilities';
import { TaskPrivacy } from 'src/db_schemas';

const TaskCard: FC<TaskCardPropsType> = ({
    variant = 'default',
    owner: ownerRaw,
    participants: participantsRaw = {},
    CustomSummaryContent,
    ...taskProps
}) => {
    const [initialState, setInitialState] = useState<TaskDataStateType>({
        ...taskProps,
        owner: {},
        participants: {},
    } as TaskDataStateType);
    const isGenerator = variant === 'generator';
    const { allFetchedUsers } = useUsers() || {};
    const {
        uid: currentUserUid,
        firstName,
        lastName,
        photoURL,
    } = useProfile() || {};
    const [taskData, setTaskData] = useState<TaskDataStateType>(initialState);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditMode, setIsEditMode] = isGenerator
        ? [true, undefined]
        : useState(false);
    const classes = useStyles({ isEditMode });
    const handleTaskDataChange = getTaskDataChangeHandler(setTaskData);

    useEffect(() => {
        const unsubscribeFunctions = [];
        const updateOwner = (value) => {
            handleTaskDataChange({
                target: {
                    name: 'owner',
                    value: value,
                },
            });
        };
        //Checking if an user profile is already fetched for reuse it else it will be fetched.
        if (
            ownerRaw?.uid === currentUserUid ||
            (!ownerRaw?.uid && currentUserUid)
        ) {
            updateOwner({
                uid: currentUserUid,
                firstName,
                lastName,
                photoURL,
            });
        } else if (ownerRaw?.uid) {
            allFetchedUsers?.[ownerRaw.uid]
                ? updateOwner(allFetchedUsers[ownerRaw.uid])
                : unsubscribeFunctions.push(
                      ownerRaw.userRef.onSnapshot((doc) =>
                          updateOwner(doc.data())
                      )
                  );
        }
    }, [ownerRaw, currentUserUid]);

    useEffect(() => {
        const addParticipants = (participants) => {
            setInitialState((current) => ({
                ...current,
                participants: {
                    ...current.participants,
                    ...participants,
                },
            }));
            setTaskData((current) => ({
                ...current,
                participants: {
                    ...current.participants,
                    ...participants,
                },
            }));
        };
        const unsubscribeFunctions = [];
        //Set participants profile data.
        Object.entries(participantsRaw).forEach(
            ([uid, { userRef, invitationStatus }]) => {
                allFetchedUsers?.[uid]
                    ? addParticipants({
                          [uid]: {
                              invitationStatus: invitationStatus,
                              ...allFetchedUsers[uid],
                          },
                      })
                    : unsubscribeFunctions.push(
                          userRef?.onSnapshot((doc) => {
                              addParticipants({
                                  [uid]: {
                                      ...doc.data(),
                                      invitationStatus,
                                  },
                              });
                          })
                      );
            }
        );
        return unsubscribeAll(unsubscribeFunctions);
    }, [participantsRaw]);

    const itemRenderer = (
        { gridProps, ...itemProps }: TaskCardItemType,
        isEditMode
    ) => {
        let Component;
        if (typeof itemProps.type === 'string') {
            Component = TaskCardTextFieldItem;
        } else {
            Component = itemProps.type;
            delete itemProps.type;
        }

        return (
            //@ts-ignore
            <Component
                key={itemProps.name}
                value={taskData[itemProps.name]}
                label={`TaskCard.${itemProps.name}`}
                isEditMode={isEditMode}
                //@ts-ignore
                onChange={handleTaskDataChange}
                gridProps={{
                    className: 'TaskCardItem-bottomMargin',
                    ...gridProps,
                }}
                {...itemProps}
            />
        );
    };

    const Variant = isGenerator ? GeneratorVariant : DefaultVariant;

    return (
        <Variant
            className={classes.TaskCard}
            isExpandedState={[isExpanded, setIsExpanded]}
            taskDataState={[taskData, setTaskData]}
            {...(isGenerator
                ? {}
                : {
                      isEditModeState: [isEditMode, setIsEditMode],
                      CustomSummaryContent,
                  })}
        >
            {taskCardCommonItems.map((itemProps, i) =>
                itemProps?.containerProps ? (
                    <Grid container key={i} {...itemProps.containerProps}>
                        {itemProps.items.map((itemProps) =>
                            itemRenderer(itemProps, isEditMode)
                        )}
                    </Grid>
                ) : (
                    itemRenderer(
                        itemProps as TaskCardTextFieldItemPropsType,
                        isEditMode
                    )
                )
            )}
        </Variant>
    );
};

TaskCard.defaultProps = {
    createTime: undefined,
    privacy: TaskPrivacy.public,
    title: '',
    participants: {},
    date: '',
    startTime: '',
    endTime: '',
    description: '',
};

export default TaskCard;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskCardPropsType =
    | (TaskSchema & {
          variant?: 'default';
          CustomSummaryContent?: FC<{
              expanded: boolean;
              ownerName: string;
          }>;
      })
    | (Partial<TaskSchema> & {
          variant: 'generator';
          CustomSummaryContent?: undefined;
      });

export type TaskDataStateType = Pick<
    TaskSchema,
    | 'taskId'
    | 'createTime'
    | 'title'
    | 'privacy'
    | 'date'
    | 'startTime'
    | 'endTime'
    | 'description'
> &
    Pick<TaskSchema, 'createTime'> & {
        owner: Partial<NormalizedUserType>;
        participants: Record<UserSchema['uid'], NormalizedParticipantType>;
    };

export type WithTaskCardVariantBasePropsType<T> = T & {
    children: ReactElement[];
    taskDataState: StateType<TaskDataStateType>;
    isExpandedState: StateType<boolean>;
};

export type WithTaskCardItemBasePropsType<T> = T & {
    isEditMode: boolean;
    gridProps?: GridProps;
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, text, transparent }, spacing }) => ({
        TaskCard: {
            //@ts-ignore
            color: ({ isEditMode }) =>
                isEditMode ? primary.main : text.primary,
            '& .TaskCard-labels': {
                //@ts-ignore
                color: ({ isEditMode }) =>
                    isEditMode ? transparent : primary.main,
                //@ts-ignore
                fontSize: ({ isEditMode }) => (isEditMode ? 14 : 18),
            },
            '& .TaskCard-details': {
                paddingLeft: 10,
                color: text.primary,
            },
            '& .TaskCardItem-bottomMargin': {
                marginBottom: spacing(2),
            },
        },
    })
);
