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

//TODO:Change colors
export const statusColors: StatusColorsType = {
    auto: 'primary',
    online: 'success',
    available: 'success',
    haveTask: 'warning',
    busy: 'warning',
    offline: 'grey',
    unavailable: 'grey',
} as const;

export default userStatus;

export type UserStatusType = keyof typeof userStatus;

type StatusColorsType = { [key in UserStatusType]: string };
