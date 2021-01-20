import Pending from '../components/Svg/Pending';
import Check from '../components/Svg/Check';
import Close from '../components/Svg/Close';
import TaskLeave from '../components/Svg/TaskLeave';

const invitationStatus = ['pending', 'accepted', 'declined', 'left'];

export const getTaskInvitationStatusIcon = (status) => {
    switch (status) {
        case invitationStatus[0]:
            return <Pending />;
        case invitationStatus[1]:
            return <Check />;
        case invitationStatus[2]:
            return <Close />;
        case invitationStatus[3]:
            return <TaskLeave />;
    }
};

export default invitationStatus;
