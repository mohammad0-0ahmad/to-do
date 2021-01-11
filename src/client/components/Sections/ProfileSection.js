import { useEffect, useState } from 'react';
import UserCard from '../Cards/UserCard';
import SectionBase from '../SectionBase';
import TaskCard from '../Cards/TaskCard';
import { getProfile } from '../../services/profiles';
import { getUserTasks } from '../../services/tasks';
import { useRouter } from 'next/router';

const ProfileSection = ({ uid }) => {
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
        const unsubscribe1 = getProfile(setProfileData, uid);
        const unsubscribe2 = getUserTasks(setTasks, uid);
        return () => {
            unsubscribe1();
            unsubscribe2();
        };
    }, []);

    useEffect(() => {
        !exists && router.push('/404');
    }, [exists]);

    return !firstName && !lastName ? (
        <></>
    ) : (
        <SectionBase>
            <UserCard
                name={[firstName, lastName].join(' ')}
                description={description}
                image={photoURL}
            />
            {Object.entries(tasks).map((task) => (
                <TaskCard key={task[0]} id={task[0]} {...task[1]} />
            ))}
        </SectionBase>
    );
};

export default ProfileSection;
