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
import { Camera } from 'lucide-react';
import { fetchWrapper } from '@/lib/utils';
import { toast } from 'sonner';

const schema = z.object({
    avatar: z.any(),
    fullName: z.string().optional(),
    hobbies: z.string().optional(),
    dob: z.string().optional(),
    bio: z.string().optional(),
});

export const UserProfileUpdateForm = ({
    defaultValues,
}: {
    defaultValues?: z.infer<typeof schema>;
}) => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const formData = new FormData();

            formData.append('avatar', values.avatar);
            formData.append('fullName', values.fullName);
            formData.append('hobbies', values.hobbies);
            formData.append('dob', values.dob);
            formData.append('bio', values.bio);

            const response = await fetchWrapper('profile/update', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            toast.success('Profile updated successfully');
            navigate('/profile');
        } catch (error) {
            toast.error(error.toString());
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Button type="submit">Update Profile</Button>
            </form>
        </Form>
    );
};
