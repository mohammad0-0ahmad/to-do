import { auth, db, functions } from '../utilities/getFirebase';
import { unsubscribeAll } from '../utilities';

type GetFriendListType = (setter: SetStateType<any>) => void;
export const getFriendList: GetFriendListType = (setter) => {
    const unsubscribeFunctions = [];
    const { uid } = auth.currentUser;
    unsubscribeFunctions.push(
        db.doc(`friendsLists/${uid}`).onSnapshot((doc) => {
            if (doc.exists) {
                setter({});
                Object.entries(doc.data()).map(async (entry) => {
                    unsubscribeFunctions.push(
                        entry[1].onSnapshot((doc) =>
                            setter((current) => ({
                                ...current,
                                [entry[0]]: {
                                    userRef: entry[1],
                                    ...doc.data(),
                                },
                            }))
                        )
                    );
                });
            }
        })
    );
    return unsubscribeAll(unsubscribeFunctions);
};

type GetSuggestedFriendsType = (
    searchKeyword: string,
    latestFetchedUserId: UserSchema['uid'],
    limit: number
) => any;

export const getSuggestedFriends: GetSuggestedFriendsType = async (
    searchKeyword,
    latestFetchedUserId,
    limit
) => {
    try {
        return (
            await functions.httpsCallable('getSuggestedFriends')({
                after: latestFetchedUserId,
                searchKeyword,
                limit,
            })
        ).data;
    } catch (err) {
        //console.log(err);
    }
};
