function sum(a, b, c) {
    return a + b + c;
}

function curry(func) {
    return (...args) => {
        if (args.length >= func.length) {
            return func(...args);
        } else {
            return curry(func.bind(null, ...args));
        }
    }
}

const curriedSum = curry(sum);
console.log(curriedSum(1, 2, 3))
const currv2 = curriedSum(1);
console.log(currv2(10, 10));
const currv3 = curriedSum(1, 2);
console.log(currv3(50));
console.log(curriedSum(1)(2)(6));

const v1 = curriedSum(1);
const v2 = v1(2);
const result = v2(3);

function buildUrl(domain, path, query) {
    return `${domain}/${path}?${new URLSearchParams(query).toString()}`;
}

const api = curry(buildUrl);
const googleApi = api('https://google.com');
const githubApi = api('https://github.com');

const searchEndpoint = googleApi('search');
console.log(searchEndpoint({ q: 'currying' }));
console.log(searchEndpoint({ a: 'hi' }));

const authEndpoint = googleApi('auth');
console.log(authEndpoint({ token: '123' }));

const usersEndpoint = githubApi('users')
console.log(usersEndpoint({ name: 'john' }));