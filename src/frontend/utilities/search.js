export const doesUserMatchSearchKeyword = (user, searchKeyword) => {
    const searchWord = searchKeyword.toLocaleLowerCase();
    return (
        user?.firstName.toLocaleLowerCase().startsWith(searchWord) ||
        user?.lastName.toLocaleLowerCase().startsWith(searchWord) ||
        [user?.firstName, user?.lastName]
            .join(' ')
            .toLocaleLowerCase()
            .startsWith(searchWord) ||
        user?.userName.toLocaleLowerCase() === searchWord
    );
};
