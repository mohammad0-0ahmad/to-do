import { useUsers } from '../../providers/UsersProvider';
import InvitationSenderCard from '../Cards/InvitationSenderCard';
import DialogBase, { DialogBasePropsType } from './DialogBase';
import Divider from '../Divider';
import Trans from '../Trans';
import NoContent from '../Cards/NoContent';
import { TaskDataStateType } from '../Cards/TaskCard';

const ParticipantManagerDialog: FC<ParticipantManagerDialogPropsType> = ({
    participants,
    setParticipants,
    ...props
}) => {
    const { friends } = useUsers();
    const handleParticipantsChanges = (participantId, addToParticipants) => {
        if (addToParticipants) {
            setParticipants({
                ...participants,
                [participantId]: friends[participantId],
            });
        } else {
            const newParticipantsValue = { ...participants };
            delete newParticipantsValue[participantId];
            setParticipants({
                ...newParticipantsValue,
            });
        }
    };

    const friendsEntries = Object.entries(friends);
    return (
        <DialogBase
            header={<Trans id="ParticipantManagerDialog.header" />}
            body={
                friendsEntries.length ? (
                    friendsEntries.map((friendEntry, i, arr) => (
                        <div key={friendEntry[0]}>
                            <InvitationSenderCard
                                {...(participants?.[friendEntry[0]] ||
                                    friendEntry[1])}
                                checked={Boolean(participants[friendEntry[0]])}
                                onCheckStateChange={(isChecked) =>
                                    handleParticipantsChanges(
                                        friendEntry[0],
                                        isChecked
                                    )
                                }
                            />
                            {i !== arr.length - 1 && <Divider />}
                        </div>
                    ))
                ) : (
                    <NoContent CustomMessageCode="ParticipantManagerDialog.label1" />
                )
            }
            {...props}
        />
    );
};

export default ParticipantManagerDialog;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type ParticipantManagerDialogPropsType = Partial<DialogBasePropsType> & {
    participants: TaskDataStateType['participants'];
    setParticipants: (
        participants: ParticipantManagerDialogPropsType['participants']
    ) => void;
};
