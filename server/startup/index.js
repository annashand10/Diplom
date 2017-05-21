module.exports = (app) => {
    require('./database');
    require('./server')(app);
    require('../router')(app);
};
