import * as z from "zod"; 


export const changePasswordSechema = z.object({
  password: z.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number").min(6, "Password must be at least 6 characters"),
  newPassword: z.string().nonempty("New Password is required").regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "New Password must contain at least one uppercase letter, one lowercase letter, and one number").min(6, "Password must be at least 6 characters"),

});