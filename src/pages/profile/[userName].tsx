import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserCard from '../../frontend/components/Cards/UserCard';
import SectionBase from '../../frontend/components/SectionBase';
import TaskCard from '../../frontend/components/Cards/TaskCard';
import { getProfile } from '../../frontend/services/profiles';
import { getUserTasks } from '../../frontend/services/tasks';
import ProgressLogo from '../../frontend/components/Svg/ProgressLogo';
import { unsubscribeAll } from '../../frontend/utilities';
import Seo from '../../frontend/components/Seo';
import NoContent from '../../frontend/components/Cards/NoContent';

//TODO:Test SSR to improve SEO

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
        const unsubscribe1 = getProfile(setProfileData, userName as string);
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
    const tasksEntries = Object.entries(tasks);
    return (
        <>
            <Seo title={[firstName, lastName].join(' ')} />
            <SectionBase>
                {!firstName && !lastName ? (
                    <ProgressLogo />
                ) : (
                    <>
                        <UserCard
                            firstName={firstName}
                            lastName={lastName}
                            description={description}
                            photoURL={photoURL}
                        />
                        {!tasksEntries.length ? (
                            <NoContent />
                        ) : (
                            tasksEntries.map((task) => (
                                <TaskCard key={task[0]} {...task[1]} />
                            ))
                        )}
                    </>
                )}
            </SectionBase>
        </>
    );
};

export default userProfile;
