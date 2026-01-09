import { z } from "zod";

export const quizSchema = z.object({
	title: z.string().min(1, "Title is required"),
});

export type QuizFormData = z.infer<typeof quizSchema>;

export const questionSchema = z.object({
	text: z.string().min(1, "Question text is required"),
	type: z.enum(["boolean", "input", "checkbox"]),
	options: z
		.array(
			z.object({
				text: z.string().min(1, "Option text is required"),
				is_correct: z.boolean(),
			}),
		)
		.min(2, "At least two options are required")
		.refine((options) => options.some((opt) => opt.is_correct), {
			message: "At least one option must be correct",
			path: [0, "is_correct"],
		}),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
