import { useUsers } from '../../context/UsersProvider';
import InvitationSenderCard from '../Cards/InvitationSenderCard';
import DialogBase from '../DialogBase';
import Divider from '../Divider';
import Trans from '../Trans';
import { object, func } from 'prop-types';

const ParticipantManagerDialog = ({
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

    return (
        <DialogBase
            header={<Trans id="ParticipantManagerDialog.header" />}
            body={Object.entries(friends).map((friendEntry, i, arr) => (
                <div key={friendEntry[0]}>
                    <InvitationSenderCard
                        {...(participants?.[friendEntry[0]] || friendEntry[1])}
                        checked={Boolean(participants[friendEntry[0]])}
                        onCheckStateChange={(isChecked) =>
                            handleParticipantsChanges(friendEntry[0], isChecked)
                        }
                    />
                    {i !== arr.length - 1 && <Divider />}
                </div>
            ))}
            {...props}
        />
    );
};

ParticipantManagerDialog.propTypes = {
    participants: object,
    setParticipants: func,
};
export default ParticipantManagerDialog;
