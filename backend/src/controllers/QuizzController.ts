import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

const QuizzController = {
	createQuizz: async (req: Request, res: Response) => {
		const { title }: { title: string } = req.body;

		if (!title) {
			return res.status(400).json({ error: "Title is required" });
		}
		const quizz = await prisma.quizzes.create({
			data: { title },
		});
		res.status(201).json({ message: "Quizz created successfully", quizz });
	},
	getAllQuizzes: async (req: Request, res: Response) => {
		const quizzes = await prisma.quizzes.findMany({
			include: {
				questions: {
					include: {
						options: true,
					},
				},
			},
		});
		res.status(200).json({ message: "Quizzes fetched successfully", quizzes });
	},
	getQuizz: async (req: Request, res: Response) => {
		const { id }: { id: string } = req.params as { id: string };
		const quizz = await prisma.quizzes.findUnique({
			where: { id },
			include: {
				questions: {
					include: {
						options: true,
					},
				},
			},
		});
		res.status(200).json({ message: "Quizz fetched successfully", quizz });
	},
	deleteQuizz: async (req: Request, res: Response) => {
		const { id }: { id: string } = req.params as { id: string };
		const quizz = await prisma.quizzes.delete({
			where: { id },
			include: {
				questions: {
					include: {
						options: true,
					},
				},
			},
		});
		res.status(200).json({ message: "Quizz deleted successfully", quizz });
	},
};

export default QuizzController;
