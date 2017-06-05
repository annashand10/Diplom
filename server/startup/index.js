module.exports = (app) => {
    require('./database');
    require('./router')(app);
};
