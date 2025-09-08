import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(6, {message: "Username must be atleast 6 character"})
  .max(20, {message: "Username not excceded more than 20 character"})
  .regex(/^[a-zA-Z0-9_]+$/, {message: "Uername must not contain special character"});


  export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid Email Address"}),
    password: z.string().min(6, {message: "password must be atleast 6 character"}),
    full_name: z.string().min(6, {message: "Name must be atleast 6 character long"})
  })