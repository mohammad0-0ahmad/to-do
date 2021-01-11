import Router from 'next/router';

export const isItLayoutBased = () => {
    const currentRoute = Router.asPath;
    if (currentRoute === '/') {
        return true;
    }
    const withoutLayout = ['/profile'];
    for (let i = 0; i < withoutLayout.length; i++) {
        if (currentRoute.startsWith(withoutLayout[i])) {
            return false;
        }
    }
    return true;
};
