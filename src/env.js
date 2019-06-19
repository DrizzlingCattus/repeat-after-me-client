
const ENV = {
    SERVER_URL: 'http://stenrine.com:8080'
};

const SERVER_PREFIX = 'api/repeat-after-me';
const SERVER_URL_WITH_PREFIX = `${ENV.SERVER_URL}/${SERVER_PREFIX}`

ENV.GET_TOKEN_URL = `${SERVER_URL_WITH_PREFIX}/login`;

// !) Auth & Verify terminology usage mix
ENV.VERIFY_LOGIN_URL = `${SERVER_URL_WITH_PREFIX}/login/auth`;

ENV.MAKE_SIMPLE_QUIZ_URL = `${SERVER_URL_WITH_PREFIX}/simple/quizs`;


const ROUTE = {};

ROUTE.PREFIX = '/repeat-after-me';

ROUTE.MAKE = {};
ROUTE.MAKE.SIMPLE = `${ROUTE.PREFIX}/make/simple`;
ROUTE.MAKE.COMPLEX = `${ROUTE.PREFIX}/make/complex`;


export { ENV, ROUTE };

