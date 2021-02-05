import { useUsers } from '../../context/UsersProvider';
import InvitationSenderCard from '../Cards/InvitationSenderCard';
import DialogBase from '../DialogBase';
import Divider from '../Divider';
import Trans from '../Trans';
import { object, func } from 'prop-types';
import NoContent from '../Cards/NoContent';

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
                    <NoContent
                        CustomMessageCode="ParticipantManagerDialog.label1"
                        minHeight="25vh"
                    />
                )
            }
            {...props}
        />
    );
};

ParticipantManagerDialog.propTypes = {
    participants: object,
    setParticipants: func,
};
export default ParticipantManagerDialog;
