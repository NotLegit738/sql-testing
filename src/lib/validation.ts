import { z } from 'zod';

export const applicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  discordUsername: z.string().min(2, 'Discord username is required'),
  age: z.number().int().min(13, 'You must be at least 13 years old').max(100, 'Invalid age'),
  country: z.string().min(2, 'Country is required'),
  timezone: z.string().min(2, 'Timezone is required'),
  position: z.enum(['Support Staff', 'Moderator', 'Senior Moderator', 'Manager', 'Developer', 'Sales', 'Other']),
  staffExperience: z.string().optional(),
  hostingExperience: z.string().optional(),
  whyJoin: z.string().min(10, 'Please provide a reason for joining'),
  whySelect: z.string().min(10, 'Please explain why we should select you'),
  contribution: z.string().min(10, 'Please explain what you can contribute'),
  availability: z.string().min(2, 'Availability is required'),
  hoursPerWeek: z.string().min(1, 'Hours per week is required'),
  previousPositions: z.string().optional(),
  additionalInformation: z.string().optional(),
  agreement: z.boolean().refine((val: boolean) => val === true, 'You must agree to the terms'),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const statusUpdateSchema = z.object({
  status: z.enum(['pending', 'reviewing', 'accepted', 'rejected']),
});

export type StatusUpdateData = z.infer<typeof statusUpdateSchema>;
