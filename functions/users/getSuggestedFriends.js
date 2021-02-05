const db = require('../utilities/getAdmin').db;
//Todo: get random users.
exports.default = async (data, { auth: { uid } }) => {
    const after = data?.after || null;
    const searchKeyword = data?.searchKeyword || null;
    const amountUsersToReturn = data?.limit || 5;
    try {
        const result = [];
        const friendsUIds = Object.keys(
            (await db.doc(`friendsLists/${uid}`).get()).data()
        );
        const allUsersQuery = db
            .collection('users')
            .where('uid', '!=', uid)
            .orderBy('uid');

        let latestFetchedUserDocId = after || null;

        while (result.length < amountUsersToReturn) {
            const fetchedDocs = (
                await allUsersQuery
                    .startAfter(latestFetchedUserDocId)
                    .limit(amountUsersToReturn * 3)
                    .get()
            ).docs;

            if (fetchedDocs.length === 0) {
                break;
            }
            for (let i = 0; i < fetchedDocs.length; i++) {
                const userDoc = fetchedDocs[i];
                if (result.length === amountUsersToReturn) {
                    break;
                }
                if (!friendsUIds.includes(userDoc.id)) {
                    const userDocData = userDoc.data();
                    if (
                        !searchKeyword ||
                        doesUserMatchSearchKeyword(userDocData, searchKeyword)
                    ) {
                        //delete unnecessary data.
                        delete userDocData.status;
                        delete userDocData.preferences;
                        delete userDocData.description;
                        result.push(userDocData);
                    }
                }
                latestFetchedUserDocId = userDoc.id;
            }
        }
        return result;
    } catch (err) {
        return [];
    }
};

const doesUserMatchSearchKeyword = (user, searchKeyword) => {
    const searchWord = searchKeyword.toLocaleLowerCase();
    return (
        user?.firstName.toLocaleLowerCase().startsWith(searchWord) ||
        user?.lastName.toLocaleLowerCase().startsWith(searchWord) ||
        [user?.firstName, user?.lastName]
            .join(' ')
            .toLocaleLowerCase()
            .startsWith(searchWord)
    );
};
