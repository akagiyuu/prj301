import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { NavLink, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import * as api from '@/api';

const schema = z
    .object({
        fullName: z
            .string()
            .nonempty({
                message: 'Full name must not be empty.',
            })
            .max(50),
        username: z
            .string()
            .min(2, {
                message: 'Username must be at least 2 characters.',
            })
            .max(50),
        password: z.string().nonempty({
            message: 'Password must not be empty.',
        }),
        confirm: z.string(),
    })
    .refine((data) => data.password == data.confirm, {
        message: "Passwords don't match",
        path: ['confirm'],
    });

export const SignupForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: '',
            username: '',
            password: '',
            confirm: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const token = await api.auth.signup(values);

            localStorage.setItem('token', token);

            navigate('/');
        } catch (error) {
            toast.error(error.toString());
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Create new account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input {...field} required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirm"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Create account
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{' '}
                                <NavLink
                                    to="/auth/login"
                                    className="underline underline-offset-4"
                                >
                                    Login
                                </NavLink>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
