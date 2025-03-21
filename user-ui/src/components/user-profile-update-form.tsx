import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router';
import { Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import * as api from '@/api';
import { User } from '@/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const schema = z.object({
    avatar: z.instanceof(File).optional(),
    fullName: z.string().optional(),
    hobbies: z.string().optional(),
    dob: z
        .preprocess(
            (arg) => {
                if (typeof arg === 'string' || arg instanceof Date) {
                    return new Date(arg);
                }
                return arg;
            },
            z.date().refine((date) => date.getTime() < Date.now(), {
                message: 'Date must be in the past',
            }),
        )
        .optional(),
    bio: z.string().optional(),
});

export const UserProfileUpdateForm = ({
    defaultValues,
}: {
    defaultValues: User;
}) => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const queryClient = useQueryClient();
    const {
        mutate: update,
        status,
    } = useMutation({
        mutationFn: api.user.update,
        onSuccess: () => {
            toast.success('Profile updated successfully');
            queryClient.invalidateQueries({
                queryKey: ['self'],
            });
            queryClient.invalidateQueries({
                queryKey: ['user', defaultValues.username],
            });
            navigate(`/user/${defaultValues.username}`);
        },
        onError: (error) => toast.error(error.message),
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => update(values))}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field: { value, onChange } }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-lg">
                                            {value ? (
                                                <img
                                                    src={
                                                        value instanceof File
                                                            ? URL.createObjectURL(
                                                                  value,
                                                              )
                                                            : '/placeholder.svg'
                                                    }
                                                    alt="Profile avatar"
                                                    width={128}
                                                    height={128}
                                                    className="object-cover w-full h-full"
                                                    onLoad={(e) => {
                                                        if (
                                                            value instanceof
                                                            File
                                                        ) {
                                                            const target =
                                                                e.target as HTMLImageElement;
                                                            return () =>
                                                                URL.revokeObjectURL(
                                                                    target.src,
                                                                );
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    src="/placeholder.svg"
                                                    alt="Profile avatar"
                                                    width={128}
                                                    height={128}
                                                    className="object-cover w-full h-full"
                                                />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            id="avatar-upload"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (file) {
                                                    onChange(file);
                                                }
                                            }}
                                        />
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="absolute bottom-0 right-0 rounded-full shadow-md"
                                            type="button"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        'avatar-upload',
                                                    )
                                                    ?.click()
                                            }
                                        >
                                            <Camera className="h-4 w-4 mr-1" />
                                            <span className="text-xs">
                                                Change
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hobbies"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hobbies</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us about yourself"
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {status === 'pending' ? (
                    <Button disabled>
                        <Loader2 className="animate-spin" />
                        Updating
                    </Button>
                ) : (
                    <Button type="submit">Update</Button>
                )}
            </form>
        </Form>
    );
};
