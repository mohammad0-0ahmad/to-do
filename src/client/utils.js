import Router from 'next/router';

export const isItLayoutBased = () => {
    if (Router.route === '/') {
        return true;
    }
    const withoutLayout = ['/profile'];
    for (let i = 0; i < withoutLayout.length; i++) {
        if (withoutLayout[i].startsWith(Router.route)) {
            return false;
        }
    }
    return true;
};
