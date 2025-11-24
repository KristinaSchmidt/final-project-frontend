import {z} from zod;

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


export const registerSchema = z.object({
    email: z.string().email("Invalid email"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
        .string()
        .min(6),
        }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});



export const resetSchema = z.object({
    email: z.string().email("Invalid email"),
});