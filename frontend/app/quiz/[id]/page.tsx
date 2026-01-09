"use client";
import ConfirmModal from "@/components/ConfirmModal";
import ModalCreateQuestion from "@/components/ModalCreateQuestion";
import { api } from "@/lib/api";
import type { Question, Quiz } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const QuizPage = () => {
	const { id } = useParams();
	const [quiz, setQuiz] = useState<Quiz | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [deleteModal, setDeleteModal] = useState<{
		isOpen: boolean;
		question: Question | null;
		isLoading: boolean;
	}>({ isOpen: false, question: null, isLoading: false });

	const fetchQuiz = useCallback(async () => {
		const result = await api.quizzes.getById(id as string);
		if (result.error) {
			setError(result.error);
		} else if (result.data) {
			setQuiz(result.data.quizz);
		}
		setLoading(false);
	}, [id]);

	useEffect(() => {
		if (id) {
			fetchQuiz();
		}
	}, [id, fetchQuiz]);

	const handleDeleteClick = (question: Question) => {
		setDeleteModal({ isOpen: true, question, isLoading: false });
	};

	const handleConfirmDelete = async () => {
		if (!deleteModal.question) return;

		setDeleteModal((prev) => ({ ...prev, isLoading: true }));

		const result = await api.questions.delete(deleteModal.question.id);

		if (!result.error) {
			fetchQuiz();
		}

		setDeleteModal({ isOpen: false, question: null, isLoading: false });
	};

	const handleCancelDelete = () => {
		setDeleteModal({ isOpen: false, question: null, isLoading: false });
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
			</div>
		);
	}

	if (error || !quiz) {
		return (
			<div className="flex flex-col justify-center items-center min-h-screen">
				<p className="text-red-500 mb-4">{error || "Quiz not found"}</p>
				<Link href="/" className="text-indigo-600 hover:underline">
					Go back home
				</Link>
			</div>
		);
	}

	const sortedQuestions = quiz.questions
		? [...quiz.questions].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		: [];

	return (
		<main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-4">
						<Link
							href="/"
							className="p-2 hover:bg-gray-200 rounded-full transition-colors"
							aria-label="Back to home"
						>
							<svg
								className="w-6 h-6 text-gray-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
						</Link>
						<div>
							<h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
							<p className="text-sm text-gray-500 mt-1">
								Manage questions and options for this quiz
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={() => setShowAddForm(true)}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
					>
						Add Question
					</button>
				</div>

				{showAddForm && (
					<ModalCreateQuestion
						quizId={id as string}
						currentQuestionsCount={quiz.questions?.length || 0}
						onClose={() => setShowAddForm(false)}
						onSuccess={fetchQuiz}
					/>
				)}

				<div className="space-y-6">
					{sortedQuestions.length > 0 ? (
						sortedQuestions.map((question, qIndex) => (
							<div
								key={question.id}
								className="bg-white shadow rounded-lg p-6 border border-gray-200 group relative"
							>
								<div className="flex justify-between items-start mb-4">
									<div>
										<span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
											Question {qIndex + 1} • {question.type}
										</span>
										<h3 className="text-xl font-medium text-gray-900 mt-1">
											{question.text}
										</h3>
									</div>
									<button
										type="button"
										onClick={() => handleDeleteClick(question)}
										className="text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
										aria-label={`Delete question: ${question.text}`}
									>
										<svg
											className="w-5 h-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>

								<div className="space-y-3 mt-4">
									{question.options.map((option, oIndex) => (
										<div
											key={option.id || `opt-${oIndex}`}
											className={`flex items-center p-3 rounded-md border ${
												option.is_correct
													? "bg-green-50 border-green-200"
													: "bg-gray-50 border-gray-200"
											}`}
										>
											<div
												className={`w-4 h-4 rounded-full mr-3 ${
													option.is_correct ? "bg-green-500" : "bg-gray-300"
												}`}
											/>
											<span
												className={
													option.is_correct
														? "text-green-700 font-medium"
														: "text-gray-700"
												}
											>
												{option.text}
											</span>
											{option.is_correct && (
												<span className="ml-auto text-xs font-bold text-green-600 uppercase">
													Correct
												</span>
											)}
										</div>
									))}
								</div>
							</div>
						))
					) : (
						<div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
							<p className="text-gray-500">
								No questions yet. Add your first question above!
							</p>
						</div>
					)}
				</div>
			</div>

			<ConfirmModal
				isOpen={deleteModal.isOpen}
				title="Delete Question"
				message={`Are you sure you want to delete this question? This action cannot be undone.`}
				confirmLabel="Delete"
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
				isLoading={deleteModal.isLoading}
			/>
		</main>
	);
};

export default QuizPage;
