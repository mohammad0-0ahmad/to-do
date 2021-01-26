import Router from 'next/router';
import userStatus from './constants/userStatus';

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

export const unsubscribeAll = (unsubscribeFunctions) => {
    return () => {
        for (let i = 0; i < unsubscribeFunctions; i++) {
            unsubscribeFunctions[i]();
        }
    };
};

export const removeUndefinedAttr = (object) => {
    return Object.fromEntries(
        Object.entries(object).filter((entry) => entry[1] !== undefined)
    );
};

export const isUserStatusIsOnAutoMode = (currentUserStatus) => {
    if (
        currentUserStatus === userStatus.online ||
        currentUserStatus === userStatus.offline ||
        currentUserStatus === userStatus.busy
    ) {
        return true;
    }
    return false;
};

export const getServerSidePropsForNextTranslate = async ({ locale }) => {
    const translations = await import(
        `../../locales/${locale}/common.json`
    ).then((m) => m.default);

    return { props: { translations } };
};
