import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }).max(20, {
        message: "The username cannot contain more than 20 characters"
    }).refine(username => !/\s/.test(username), {
        message: "The username must not contain any spaces",
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        email: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "The password must contain at least 6 characters"
    }).max(14, {
        message: "The password must contain 14 characters or less"
    }).refine(pwd => !/\s/.test(pwd), {
        message: "The password must not contain any spaces",
    }),
})

export const loginSchema = z.object({
    uom: z.string({
        required_error: "Username or password is required"
    }).refine(username => !/\s/.test(username), {
        message: "The username must not contain any spaces",
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "The password must contain at least 6 characters"
    }).max(14, {
        message: "The password must contain 14 characters or less"
    }).refine(pwd => !/\s/.test(pwd), {
        message: "The password must not contain any spaces",
    }),
})