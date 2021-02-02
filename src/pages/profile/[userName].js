import { useRouter } from 'next/router';
import ProfileSection from '../../client/components/Sections/ProfileSection';
//TODO:Test SSR to improve SEO
//TODO:show it without need to be logged in
const userProfile = () => {
    const {
        query: { userName },
    } = useRouter();
    return <ProfileSection userName={userName} />;
};

export default userProfile;
