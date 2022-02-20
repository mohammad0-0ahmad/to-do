import { GridProps } from '@material-ui/core';
import TaskCardParticipantsItem, {
    TaskCardParticipantsItemPropsType,
} from './components/TaskCardParticipantsItem';
import TaskCardPrivacyItem, {
    TaskCardPrivacyItemPropsType,
} from './components/TaskCardPrivacyItem';
import { TaskCardTextFieldItemPropsType } from './components/TaskCardTextFieldItem';
import { TaskDataStateType } from './TaskCard';

export const taskCardSpecialItems = {
    title: {
        name: 'title',
        type: 'text',
        variant: 'standard',
        label: 'TaskCard.title',
        className: 'TaskCardItem-bottomMargin',
        required: true,
        InputLabelProps: {},
    },
} as const;

export const taskCardCommonItems: TaskCardItemsType = [
    {
        name: 'privacy',
        type: TaskCardPrivacyItem,
        gridProps: { xs: 12 },
    },
    {
        name: 'participants',
        type: TaskCardParticipantsItem,
        gridProps: { xs: 12 },
        max: 4,
    },
    {
        name: 'date',
        type: 'date',
        required: true,
        gridProps: { xs: 6 },
    },
    {
        containerProps: { justifyContent: 'space-between' },
        items: [
            {
                name: 'startTime',
                type: 'time',
                required: true,
                gridProps: { xs: 5 },
            },
            {
                name: 'endTime',
                type: 'time',
                required: true,
                gridProps: { xs: 5 },
            },
        ],
    },
    {
        name: 'description',
        variant: 'outlined',
        //@ts-ignore
        type: 'text',
        multiline: true,
        rows: 6,
        gridProps: { xs: 12 },
        InputLabelProps: {},
    },
];

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

export const getTaskDataChangeHandler: GetTaskDataChangeHandlerType =
    (taskDataSetter) =>
    ({ target: { name = undefined, value } }) => {
        taskDataSetter((current) => ({
            ...current,
            ...(name ? { [name]: value } : {}),
        }));
    };

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
type GetTaskDataChangeHandlerType = (
    taskDataSetter: SetStateType<TaskDataStateType>
) => (event: { target: { name?: string; value: string } }) => void;

type TaskCardItemsType = Array<
    | { containerProps: GridProps; items: Array<TaskCardItemType> }
    | (TaskCardItemType & {
          containerProps?: undefined;
          items?: undefined;
      })
>;
//TODO: Improve this type
export type TaskCardItemType =
    | OmitSomeTaskCardItem<TaskCardTextFieldItemPropsType>
    | ({
          type: FC<TaskCardPrivacyItemPropsType>;
      } & OmitSomeTaskCardItem<TaskCardPrivacyItemPropsType>)
    | ({
          type: FC<TaskCardParticipantsItemPropsType>;
      } & OmitSomeTaskCardItem<TaskCardParticipantsItemPropsType>);

type OmitSomeTaskCardItem<T> = Omit<T, 'isEditMode' | 'label'>;
