import userStatus from './constants/userStatus';

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
