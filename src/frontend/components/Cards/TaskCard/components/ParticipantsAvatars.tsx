import { AvatarGroupProps } from '@material-ui/lab';
import AvatarGroup from 'frontend/components/AvatarGroup';
import UserAvatar from 'frontend/components/UserAvatar';
import { TaskDataStateType } from '../TaskCard';

const ParticipantsAvatars: FC<ParticipantsAvatarsPropsType> = ({
    participants = {},
    max,
    isExpanded,
}) => {
    const participantsEntries = Object.entries(participants);

    return participantsEntries.length ? (
        <AvatarGroup max={max}>
            {participantsEntries.map(
                ([
                    uid,
                    { photoURL, firstName, lastName, invitationStatus },
                ]) => (
                    <UserAvatar
                        key={uid}
                        photoURL={photoURL}
                        firstName={firstName}
                        lastName={lastName}
                        invitationStatus={invitationStatus}
                        radius={isExpanded ? 25 : 20}
                    />
                )
            )}
        </AvatarGroup>
    ) : null;
};

export default ParticipantsAvatars;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type ParticipantsAvatarsPropsType = {
    participants: TaskDataStateType['participants'];
    isExpanded: boolean;
    max?: AvatarGroupProps['max'];
};
