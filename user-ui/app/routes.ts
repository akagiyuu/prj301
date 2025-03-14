import {
    type RouteConfig,
    index,
    layout,
    prefix,
    route,
} from '@react-router/dev/routes';

export default [
    layout('routes/layout.tsx', [index('routes/home.tsx')]),
    ...prefix('auth', [
        route('login', 'routes/auth/login.tsx'),
        route('signup', 'routes/auth/signup.tsx'),
    ]),
] satisfies RouteConfig;
