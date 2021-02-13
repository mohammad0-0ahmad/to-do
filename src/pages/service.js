import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProgressLogo from '../client/components/Svg/ProgressLogo';
const service = () => {
    const { query, push } = useRouter();
    //TODO: Activate this page.
    push('/404');
    useEffect(() => {
        switch (query.mode) {
            case 'resetPassword':
                push(`reset-password/${query.oobCode}`);
                break;
            default:
                push('/');
        }
    }, [query]);

    return <ProgressLogo />;
};

export default service;
