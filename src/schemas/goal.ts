import { z } from "zod";

export const GoalSchema = z.object({
  id: z.string().default("default-goal"),
  creatorId: z.string().min(1),
  title: z.string().min(3, "Title must be at least 3 characters").max(80),
  targetAmount: z.number().min(100, "Target must be at least ₹100"),
  currentAmount: z.number().min(0).default(0),
  endDate: z.string().optional(),
  active: z.boolean().default(true),
});

export type Goal = z.infer<typeof GoalSchema>;

export const UpdateGoalSchema = GoalSchema.partial().required({ creatorId: true });
export type UpdateGoalInput = z.infer<typeof UpdateGoalSchema>;
