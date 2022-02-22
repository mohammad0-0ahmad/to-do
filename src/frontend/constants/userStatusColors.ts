//TODO:Change colors
export const UserStatusColors: StatusColorsType = {
    auto: 'primary',
    online: 'success',
    available: 'success',
    haveTask: 'warning',
    busy: 'warning',
    offline: 'customGrey',
    unavailable: 'customGrey',
} as const;

type StatusColorsType = { [key in UserSchema['status']]: string };
