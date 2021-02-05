import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserCard from '../../client/components/Cards/UserCard';
import SectionBase from '../../client/components/SectionBase';
import TaskCard from '../../client/components/Cards/TaskCard';
import { getProfile } from '../../client/services/profiles';
import { getUserTasks } from '../../client/services/tasks';
import ProgressLogo from '../../client/components/Svg/ProgressLogo';
import { unsubscribeAll } from '../../client/utilities';
import Seo from '../../client/components/Seo';

//TODO:Test SSR to improve SEO
//TODO:show it without need to be logged in

const userProfile = () => {
    const {
        replace,
        query: { userName },
    } = useRouter();

    const [
        { exists, firstName, lastName, description, photoURL, uid },
        setProfileData,
    ] = useState({
        uid: null,
        exists: true,
        firstName: '',
        lastName: '',
        description: '',
        photoURL: '',
    });

    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const unsubscribe1 = getProfile(setProfileData, userName);
        return unsubscribeAll([unsubscribe1]);
    }, []);

    useEffect(() => {
        if (uid) {
            const unsubscribe2 = getUserTasks(setTasks, uid);
            return unsubscribeAll([unsubscribe2]);
        }
    }, [uid]);

    useEffect(() => {
        !exists && replace('/404');
    }, [exists]);

    return !firstName && !lastName ? (
        <ProgressLogo />
    ) : (
        <>
            <Seo title={[firstName, lastName].join(' ')} />
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
        </>
    );
};

export default userProfile;
