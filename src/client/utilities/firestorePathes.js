export const mainCollections = {
    users: 'users',
    tasks: 'tasks',
};

export const subCollections = {
    friendshipRequests: (uid) =>
        [mainCollections.users, uid, 'friendshipRequests'].join('/'),

    friends: (uid) => [mainCollections.users, uid, 'friends'].join('/'),

    tasksInvitations: (uid) =>
        [mainCollections.users, uid, 'tasksInvitations'].join('/'),

    notifications: (uid) =>
        [mainCollections.users, uid, 'notifications'].join('/'),
};

export const documents = {
    user: (uid) => [mainCollections.users, uid].join('/'),

    friendshipRequest: (uid, friendshipRequestId) =>
        [subCollections.friendshipRequests(uid), friendshipRequestId].join('/'),

    friend: (uid, friendId) =>
        [subCollections.friends(uid), friendId].join('/'),
};
