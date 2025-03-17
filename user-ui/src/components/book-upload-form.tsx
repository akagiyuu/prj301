import { cn, fetchWrapper } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
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
import { NavLink, useNavigate } from 'react-router';
import { TagInput, Tag } from 'emblor';
import { useState } from 'react';

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    genres: z.array(z.string()).min(1, 'At least one genre is required'),
    publicationDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    pdf: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'PDF file is required'),
    cover: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'Cover image is required'),
});

export const UploadBookForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
    const navigate = useNavigate();

    const [tags, setTags] = useState<Tag[]>([]);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            author: '',
            genres: [],
            publicationDate: '',
        },
    });

    const { setValue } = form;

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const response = await fetchWrapper('auth/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const token = await response.text();

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
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Book title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Author name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genres"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-left">
                                            Genres
                                        </FormLabel>
                                        <FormControl>
                                            <TagInput
                                                {...field}
                                                placeholder="Enter a topic"
                                                tags={tags}
                                                className="sm:min-w-[450px]"
                                                setTags={(newTags) => {
                                                    setTags(newTags);
                                                    setValue(
                                                        'genres',
                                                        (
                                                            newTags as [
                                                                Tag,
                                                                ...Tag[],
                                                            ]
                                                        ).map(
                                                            (tag) => tag.text,
                                                        ),
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="publicationDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Publication Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pdf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PDF File</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.files?.[0],
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cover"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cover Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.files?.[0],
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Upload Book'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
