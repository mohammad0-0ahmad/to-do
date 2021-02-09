//Return just first new added attribute to a doc as an entry.
exports.getAddedAttribute = (before, after) => {
    return Object.entries(after).filter(([key, value]) => !before?.[key])[0];
};
