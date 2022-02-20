//TODO:Change colors
export const UserStatusColors: StatusColorsType = {
    auto: 'primary',
    online: 'success',
    available: 'success',
    haveTask: 'warning',
    busy: 'warning',
    offline: 'grey',
    unavailable: 'grey',
} as const;

type StatusColorsType = { [key in UserSchema['status']]: string };