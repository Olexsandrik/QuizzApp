import type { question_type } from "@prisma/client";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

const QuestionController = {
	createQuestion: async (req: Request, res: Response) => {
		const {
			quiz_id,
			type,
			text,
			order,
			options,
		}: {
			quiz_id: string;
			type: question_type;
			text: string;
			order: number;
			options: { text: string; is_correct: boolean }[];
		} = req.body;

		if (!quiz_id || !type || !text || order === undefined) {
			return res
				.status(400)
				.json({ error: "quiz_id, type, text, and order are required" });
		}

		if (options && !Array.isArray(options)) {
			return res.status(400).json({ error: "options must be an array" });
		}

		try {
			const quiz = await prisma.quizzes.findUnique({
				where: { id: quiz_id },
			});

			if (!quiz) {
				return res.status(404).json({ error: "Quiz not found" });
			}

			const question = await prisma.questions.create({
				data: {
					quiz_id,
					type,
					text,
					order,
					options: {
						create: options.map((opt) => ({
							text: opt.text,
							is_correct: opt.is_correct || false,
						})),
					},
				},
				include: {
					options: true,
				},
			});

			res.status(201).json({
				message: "Question and options created successfully",
				question,
			});
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : "An unknown error occurred";
			res.status(500).json({ error: message });
		}
	},

	getQuestionsByQuiz: async (req: Request, res: Response) => {
		const { quiz_id }: { quiz_id: string } = req.params as { quiz_id: string };

		try {
			const questions = await prisma.questions.findMany({
				where: { quiz_id },
				include: {
					options: true,
				},
				orderBy: {
					order: "asc",
				},
			});

			res
				.status(200)
				.json({ message: "Questions fetched successfully", questions });
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : "An unknown error occurred";
			res.status(500).json({ error: message });
		}
	},

	deleteQuestion: async (req: Request, res: Response) => {
		const { id }: { id: string } = req.params as { id: string };

		try {
			const question = await prisma.questions.delete({
				where: { id },
				include: {
					options: true,
				},
			});

			res
				.status(200)
				.json({ message: "Question deleted successfully", question });
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : "An unknown error occurred";
			res.status(500).json({ error: message });
		}
	},
};

export default QuestionController;
