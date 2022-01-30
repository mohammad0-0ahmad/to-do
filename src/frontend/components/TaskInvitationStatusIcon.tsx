import Pending from '../components/Svg/Pending';
import Check from '../components/Svg/Check';
import Close from '../components/Svg/Close';
import TaskLeave from '../components/Svg/TaskLeave';

export const TaskInvitationStatusIcon: FC<
    TaskInvitationStatusIconPropsType
> = ({ status }) => {
    switch (status) {
        case 'pending':
            return <Pending />;
        case 'accepted':
            return <Check />;
        case 'declined':
            return <Close />;
        case 'left':
            return <TaskLeave />;
    }
};

export default TaskInvitationStatusIcon;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskInvitationStatusIconPropsType = {
    status: TaskInvitationStatusType;
};

export type TaskInvitationStatusType =
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'left';
