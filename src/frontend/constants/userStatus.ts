//TODO:Improve userStatus
const userStatus = {
    auto: 'auto',
    online: 'online',
    available: 'available',
    haveTask: 'haveTask',
    busy: 'busy',
    offline: 'offline',
    unavailable: 'unavailable',
} as const;

export const statusColors: StatusColorsType = {
    auto: 'color4',
    online: 'green',
    available: 'green',
    haveTask: 'yellow',
    busy: 'yellow',
    offline: 'grey',
    unavailable: 'grey',
} as const;

export default userStatus;

export type UserStatusType = keyof typeof userStatus;

type StatusColorsType = { [key in UserStatusType]: string };
