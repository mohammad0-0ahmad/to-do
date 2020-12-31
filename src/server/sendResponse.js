export default (res, data) => {
    if (!data) {
        res.statusCode = 404;
        res.end();
    } else {
        const { statusCode, ...restData } = data;
        res.statusCode = !statusCode ? 200 : statusCode;
        if (Object.keys(restData).length) {
            res.send(restData);
        } else {
            res.end();
        }
    }
};
