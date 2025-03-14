import type { Route } from './+types/signup';
import { SignupForm } from '~/components/signup-form';

const Login = (_: Route.ComponentProps) => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    );
};

export default Login;
