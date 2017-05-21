const config = require('config')
    , urlParse = require('url-parse')
    , querystring = require('querystring')
    , apiResponse = require('./api-response');

function url(hostname, pathname, options) {
    options = options || {};
    const protocol = options.ssl ? 'https' : 'http';
    const host = hostname + (!options.port || options.port === 80 ? '' : ':' + options.port);
    return protocol + '://' + host + '/' + pathname;
}

function backendUrl(pathname) {
    return url(config.get('apps.backend.hostname'), pathname, {
        ssl: config.get('ssl'),
        port: config.get('port')
    });
}

function frontendUrl(pathname) {
    return url(config.get('apps.frontend.hostname'), pathname, {
        ssl: config.get('ssl'),
        port: config.get('apps.frontend.port')
    });
}

function modifyUrlQuery(url, params, replace) {
    replace = !!replace;
    const parsed = urlParse(url);
    const newParams = replace ? params : Object.assign(querystring.parse(parsed.query.replace('?', '')), params);
    parsed.query = querystring.stringify(newParams);
    return parsed.toString();
}

function strtr(str, replacePairs) {
    str = str.toString();
    let key, re;
    for (key in replacePairs) {
        if (replacePairs.hasOwnProperty(key)) {
            re = new RegExp(key, 'g');
            str = str.replace(re, replacePairs[key]);
        }
    }
    return str;
}

function testCondition(value, condition) {
    switch (condition.operator) {
        case undefined:
        case 'eq':
            return value == condition.value;
        case 'not':
            return value != condition.value;
        case 'gte':
            return value >= condition.value;
        case 'lte':
            return value <= condition.value;
        case 'like':
            const escapedConditionValue = condition.value.replace(
                new RegExp('(\\' + ['/', '.', '%', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g'),
                '\\$1'
            );
            return new RegExp(escapedConditionValue.replace('*', '.*')).exec(value) != null;
    }
}

function testQuery(data, query) {
    let andSuccessful = true;
    query.forEach((andCondition) => {
        if (!andSuccessful) return;
        if (!andCondition.length) return true;
        let orSuccessful = false;
        andCondition.forEach((orCondition) => {
            if (orSuccessful) return;
            orSuccessful = testCondition(data[orCondition.field], orCondition);
        });
        andSuccessful = orSuccessful;
    });
    return andSuccessful;
}

module.exports = {
    frontendUrl,
    backendUrl,
    url,
    modifyUrlQuery,
    strtr,
    testCondition,
    testQuery,
    apiResponse
};
