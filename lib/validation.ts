import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
    category: z.string().min(1, "Category is required").max(50, "Category must be less than 50 characters"),
    link: z.string().url("Invalid URL format").refine(async (url) => {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            const contentType = res.headers.get('content-type');
            return contentType?.startsWith('image/')
        } catch (error) {
            return false
        }
    }),
    pitch: z.string().min(1, "Pitch is required").max(2000, "Pitch must be less than 2000 characters")
})