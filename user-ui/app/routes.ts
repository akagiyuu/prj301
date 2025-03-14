import {
    type RouteConfig,
    index,
    prefix,
    route,
} from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    ...prefix('auth', [
        route('login', 'routes/auth/login.tsx'),
        route('signup', 'routes/auth/signup.tsx'),
    ]),
] satisfies RouteConfig;
