"use client";
import { api } from "@/lib/api";
import { type QuestionFormData, questionSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FormCreateQuestions from "./FormCreateQuestions";

interface ModalCreateQuestionProps {
	quizId: string;
	currentQuestionsCount: number;
	onClose: () => void;
	onSuccess: () => void;
}

const ModalCreateQuestion = ({
	quizId,
	currentQuestionsCount,
	onClose,
	onSuccess,
}: ModalCreateQuestionProps) => {
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<QuestionFormData>({
		resolver: zodResolver(questionSchema),
		defaultValues: {
			text: "",
			type: "boolean",
			options: [
				{ text: "", is_correct: false },
				{ text: "", is_correct: false },
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "options",
	});

	const onSubmit = async (data: QuestionFormData) => {
		setSubmitting(true);
		setError(null);

		const result = await api.questions.create({
			quiz_id: quizId,
			...data,
			order: currentQuestionsCount,
		});

		if (result.error) {
			setError(result.error);
		} else {
			reset();
			onSuccess();
			onClose();
		}

		setSubmitting(false);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 animate-in fade-in zoom-in duration-200">
				<div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
					<h2 className="text-xl font-semibold text-gray-900">New Question</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 transition-colors"
						aria-label="Close modal"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{error && (
					<div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
						{error}
					</div>
				)}

				<FormCreateQuestions
					control={control}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					onClose={onClose}
					errors={errors}
					fields={fields}
					append={append}
					remove={remove}
					submitting={submitting}
				/>
			</div>
		</div>
	);
};

export default ModalCreateQuestion;
