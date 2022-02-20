import Pending from '../components/Svg/Pending';
import Check from '../components/Svg/Check';
import Close from '../components/Svg/Close';
import TaskLeave from '../components/Svg/TaskLeave';
import { TaskInvitationStatus } from 'src/db_schemas';

export const TaskInvitationStatusIcon: FC<
    TaskInvitationStatusIconPropsType
> = ({ status }) => {
    const Icon = {
        [TaskInvitationStatus.pending]: Pending,
        [TaskInvitationStatus.accepted]: Check,
        [TaskInvitationStatus.declined]: Close,
        [TaskInvitationStatus.left]: TaskLeave,
    }[status];

    return <Icon />;
};

export default TaskInvitationStatusIcon;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskInvitationStatusIconPropsType = {
    status: TaskInvitationStatus;
};
