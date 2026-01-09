"use client";
import { api } from "@/lib/api";
import { type QuizFormData, quizSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputValidation from "./InputValidation";

interface ModalCreateQuizProps {
	onClose: () => void;
	onSuccess: () => void;
}

const ModalCreateQuiz = ({ onClose, onSuccess }: ModalCreateQuizProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useForm<QuizFormData>({
		resolver: zodResolver(quizSchema),
		mode: "onChange",
		defaultValues: {
			title: "",
		},
	});

	const onSubmit = async (data: QuizFormData) => {
		setLoading(true);
		setError(null);

		const result = await api.quizzes.create(data);

		if (result.error) {
			setError(result.error);
		} else {
			onSuccess();
			onClose();
		}

		setLoading(false);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
				<div className="px-6 py-4 border-b flex justify-between items-center">
					<h2 className="text-xl font-semibold text-gray-900">
						Create New Quiz
					</h2>
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

				<form onSubmit={handleSubmit(onSubmit)} className="p-6">
					{error && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
							{error}
						</div>
					)}

					<div className="mb-6">
						<InputValidation
							name="title"
							control={control}
							label="Quiz Title"
							placeholder="Enter a title for your quiz..."
							error={errors.title?.message}
						/>
					</div>

					<div className="flex gap-3 justify-end">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading || !isValid}
							className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
						>
							{loading && (
								<svg
									className="animate-spin h-4 w-4 text-white"
									fill="none"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
							)}
							{loading ? "Creating..." : "Create Quiz"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalCreateQuiz;
