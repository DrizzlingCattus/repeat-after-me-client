import util from './util.js';

/**
 * initString + path-like-string
 * note that objects props must be uppercase and
 * prop value must start with '/'
 *
 * ex)
 * let HELLO = makePathlikeString('hello')
 * HELLO.WORLD = '/world';
 * 
 * // 'hello/world'
 * console.log(HELLO.WORLD);
 * 
 * // 'hello'
 * console.log(HELLO); 
 * @param {String} initString prefix string for next prop string
 * @returns {Proxy Object} get, set handler proxy for attach prop string sequencly
 */
function makePathlikeString(initString) {
    if(!util.isString(initString)) {
        throw TypeError('initString must be string, not like this: ' + initString);
    }

    const self = {};
    const pathValueAccessor = '__SELF';
    self[pathValueAccessor] = initString; 
    self.toString = () => {
        return self[pathValueAccessor];
    };
    
    self.attach = (key, pathString) => {
        if(key != key.toUpperCase()) {
            throw Error('path like string\'s prop MUST BE CAPITAL letter');
        } else if(pathString.slice(0, 1) != '/') {
            throw Error('path like string\'s value MUST START WITH /');
        } else if(pathString.slice(-1) == '/') {
            throw Error('path like string\'s value MUST NOT END WITH /');
        }
        self[key] = makePathlikeString(self[pathValueAccessor] + pathString);
        return self[key];
    };

    return self;
}


// used by client request to server
const ENV = {
    SERVER_URL: 'https://stenrine.com'
};

const SERVER_PREFIX = 'api/repeat-after-me';
const SERVER_URL_WITH_PREFIX = `${ENV.SERVER_URL}/${SERVER_PREFIX}`

ENV.GET_TOKEN_URL = `${SERVER_URL_WITH_PREFIX}/login`;

// !) Auth & Verify terminology usage mix
ENV.VERIFY_LOGIN_URL = `${SERVER_URL_WITH_PREFIX}/login/auth`;

ENV.MAKE_SIMPLE_QUIZ_URL = `${SERVER_URL_WITH_PREFIX}/simple/quizs`;

ENV.GET_SIMPLE_QUIZ_FROM_DATE_URL = `${SERVER_URL_WITH_PREFIX}/simple/quizs/date`;

ENV.GET_COMPLEX_QUIZ_FROM_DATE_URL = `${SERVER_URL_WITH_PREFIX}/complex/quizs/date`;


// used by client router
const ROUTE = makePathlikeString('/repeat-after-me');

ROUTE.attach('HOME', '/home');
ROUTE.attach('LOGIN', '/login');

// `${ROUTE}/make` === '/repeat-after-me/make'
ROUTE.attach('MAKE', '/make');
ROUTE.MAKE.attach('SIMPLE', '/simple');
ROUTE.MAKE.attach('COMPLEX', '/complex');

ROUTE.attach('SOLVE', '/solve');

ROUTE.attach('SOLVE_QUIZ', '/solve_quiz');

ROUTE.attach('TEST', '/test');

export { 
    ENV, 
    ROUTE
};
