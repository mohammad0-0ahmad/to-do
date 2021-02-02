import { useEffect, useState } from 'react';
import UserCard from '../Cards/UserCard';
import SectionBase from '../SectionBase';
import TaskCard from '../Cards/TaskCard';
import { getProfile } from '../../services/profiles';
import { getUserTasks } from '../../services/tasks';
import { useRouter } from 'next/router';
import { string } from 'prop-types';
import ProgressLogo from '../Svg/ProgressLogo';
import { unsubscribeAll } from '../../utilities';

const ProfileSection = ({ userName }) => {
    const router = useRouter();
    const [
        { exists, firstName, lastName, description, photoURL },
        setProfileData,
    ] = useState({
        exists: true,
        firstName: '',
        lastName: '',
        description: '',
        photoURL: '',
        tasks: [],
    });
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const unsubscribe1 = getProfile(setProfileData, userName);
        const unsubscribe2 = getUserTasks(setTasks, userName);

        return unsubscribeAll([unsubscribe1, unsubscribe2]);
    }, []);

    useEffect(() => {
        !exists && router.replace('/404');
    }, [exists]);

    return !firstName && !lastName ? (
        <ProgressLogo />
    ) : (
        <SectionBase>
            <UserCard
                firstName={firstName}
                lastName={lastName}
                description={description}
                image={photoURL}
            />
            {Object.entries(tasks).map((task) => (
                <TaskCard key={task[0]} {...task[1]} />
            ))}
        </SectionBase>
    );
};

ProfileSection.propTypes = {
    userName: string,
};

export default ProfileSection;
