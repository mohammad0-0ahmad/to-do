module.exports = () => {
    global.isDev = process.env.NODE_ENV === 'development';
};
