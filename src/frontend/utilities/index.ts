import { UserStatus } from "src/db_schemas";

export const unsubscribeAll = (unsubscribeFunctions) => {
    return () => {
        (async () => {
            for (let i = 0; i < unsubscribeFunctions; i++) {
                if (unsubscribeFunctions[i]) {
                    if (typeof unsubscribeFunctions[i] === 'function') {
                        unsubscribeFunctions[i]();
                    } else if (typeof unsubscribeFunctions[i] === 'object') {
                        (await unsubscribeFunctions[i])();
                    }
                }
            }
        })();
    };
};

export const removeUndefinedAttr = (object) => {
    return Object.fromEntries(
        Object.entries(object).filter((entry) => entry[1] !== undefined)
    );
};

export const isUserStatusIsOnAutoMode = (currentUserStatus) => {
    if (
        currentUserStatus === UserStatus.online ||
        currentUserStatus === UserStatus.offline ||
        currentUserStatus === UserStatus.busy
    ) {
        return true;
    }
    return false;
};

export const formatDate = (date) => {
    return [
        date.toLocaleDateString({
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }),
        date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
    ].join('\n');
};
