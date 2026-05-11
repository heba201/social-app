import * as z from "zod"; 

export const registerSchema = z.object({
  name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(50, "Name cannot exceed 50 characters"),
  email: z.string().nonempty("Email is required").email("Email is invalid"),
  password: z.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number").min(6, "Password must be at least 6 characters"),
  rePassword: z.string().nonempty("Please confirm your password"),
  dateOfBirth: z.string().nonempty("Date of Birth is required").refine((date) => {
    let currentYear = new Date().getFullYear();
    let ageYear = new Date(date).getFullYear();
    let age = currentYear - ageYear;
    return age >= 18;
  },"Age not allowed less than 18 years"),
 gender: z.string().nonempty("Gender is required"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
});



export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email is invalid"),
  password: z.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number").min(6, "Password must be at least 6 characters"),

});