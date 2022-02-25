import { PaletteType } from '@material-ui/core';

/* -------------------------------------------------------------------------- */
/*                                   Schemas                                  */
/* -------------------------------------------------------------------------- */
declare global {
    type UserSchema = {
        uid: string; //make it userId instead
        userName: string;
        firstName: string;
        lastName: string;
        photoURL?: string;
        description?: string;
        status: UserStatus;
        notificationsCounter: number;
        preferences: {
            lang: LocaleVariant; // make ite locale instead
            paletteType: PaletteType;
        };
        //notifications collection
    };

    type AuthSchema = {
        email: string;
        password: string;
    };

    type TaskSchema = {
        taskId: string;
        createTime: FirebaseTimeStampType;
        owner: Pick<UserSchema, 'uid'> & {
            userRef: FirebaseDocumentReferenceType;
        };
        title: string;
        privacy: TaskPrivacy;
        participants: {
            [participantId: UserSchema['uid']]: {
                userRef: FirebaseDocumentReferenceType;
                invitationStatus: TaskInvitationStatus;
                responseTime?: FirebaseTimeStampType;
            };
        };
        date: string;
        startTime: string;
        endTime: string;
        description?: string;
    };

    type TaskInvitationSchema = {
        receivingTime: FirebaseTimeStampType;
        taskRef: FirebaseDocumentReferenceType;
    };

    type FriendsListSchema = {
        [friendId: UserSchema['uid']]: FirebaseDocumentReferenceType;
    };

    type FriendRequestListSchema = Record<
        UserSchema['uid'],
        {
            time: FirebaseTimeStampType;
            sender: FirebaseDocumentReferenceType;
        }
    >;

    type NotificationSchema = {
        notificationId: string;
        causedBy: UserSchema['uid'];
        createdAt: FirebaseTimeStampType;
        seen: boolean;
    } & (
        | {
              targetId: UserSchema['uid'];
              type:
                  | NotificationTypeProperty.gotNewFriend
                  | NotificationTypeProperty.friendshipRequest;
          }
        | {
              targetId: TaskSchema['taskId'];
              type: NotificationTypeProperty.taskInvitation;
          }
    );

    /* -------------------------------------------------------------------------- */
    /*                         Global types related to DB                         */
    /* -------------------------------------------------------------------------- */

    type NormalizedUserType = Pick<
        UserSchema,
        'uid' | 'firstName' | 'lastName' | 'photoURL'
    > & {
        userRef: FirebaseDocumentReferenceType;
    };

    type NormalizedParticipantType = NormalizedUserType & {
        invitationStatus: TaskInvitationStatus;
    };
}

/* -------------------------------------------------------------------------- */
/*                                    Enums                                   */
/* -------------------------------------------------------------------------- */

export enum UserStatus {
    auto = 'auto',
    online = 'online',
    available = 'available',
    haveTask = 'haveTask',
    busy = 'busy',
    offline = 'offline',
    unavailable = 'unavailable',
}

export enum TaskPrivacy {
    public = 'public',
    friends = 'friends',
    private = 'private',
}

export enum TaskInvitationStatus {
    accepted = 'accepted',
    pending = 'pending',
    left = 'left',
    declined = 'declined',
}

export enum LocaleVariant {
    en = 'en',
    sv = 'sv',
    ar = 'ar',
}

export enum NotificationTypeProperty {
    gotNewFriend = 'gotNewFriend',
    friendshipRequest = 'friendshipRequest',
    taskInvitation = 'taskInvitation',
}

/* -------------------------------------------------------------------------- */
/*                                 Types                                      */
/* -------------------------------------------------------------------------- */

declare type FirebaseDocumentReferenceType =
    firebase.default.firestore.DocumentReference<firebase.default.firestore.DocumentData>;

declare type FirebaseTimeStampType = firebase.default.firestore.FieldValue;
