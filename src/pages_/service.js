import { useEffect } from 'react';
import { useRouter } from 'next/router';

const service = () => {
    const { query, push } = useRouter();
    useEffect(() => {
        switch (query.mode) {
            case 'resetPassword':
                push(`reset-password/${query.oobCode}`);
                break;
            default:
                push('/');
        }
    }, [query]);
    //TODO:change loading UI
    return <div>loading...</div>;
};

export default service;
