"use client";
import ConfirmModal from "@/components/ConfirmModal";
import Header from "@/components/Header";
import ListOfQuizzes from "@/components/ListOfQuizzes";
import ModalCreateQuiz from "@/components/ModalCreateQuiz";
import { api } from "@/lib/api";
import type { Quiz } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
	const [modalCreateQuiz, setModalCreateQuiz] = useState(false);
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [loading, setLoading] = useState(true);
	const [deleteModal, setDeleteModal] = useState<{
		isOpen: boolean;
		quiz: Quiz | null;
		isLoading: boolean;
	}>({ isOpen: false, quiz: null, isLoading: false });

	const fetchQuizzes = useCallback(async () => {
		const result = await api.quizzes.getAll();
		if (result.data) {
			setQuizzes(result.data.quizzes || []);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchQuizzes();
	}, [fetchQuizzes]);

	const handleCreateQuiz = () => {
		setModalCreateQuiz((prev) => !prev);
	};

	const handleDeleteClick = (quiz: Quiz) => {
		setDeleteModal({ isOpen: true, quiz, isLoading: false });
	};

	const handleConfirmDelete = async () => {
		if (!deleteModal.quiz) return;

		setDeleteModal((prev) => ({ ...prev, isLoading: true }));

		const result = await api.quizzes.delete(deleteModal.quiz.id);

		if (!result.error) {
			fetchQuizzes();
		}

		setDeleteModal({ isOpen: false, quiz: null, isLoading: false });
	};

	const handleCancelDelete = () => {
		setDeleteModal({ isOpen: false, quiz: null, isLoading: false });
	};

	return (
		<main className="min-h-screen bg-gray-50">
			<Header handleCreateQuiz={handleCreateQuiz} />

			<ListOfQuizzes
				quizzes={quizzes}
				loading={loading}
				onDeleteClick={handleDeleteClick}
			/>

			{modalCreateQuiz && (
				<ModalCreateQuiz
					onClose={() => setModalCreateQuiz(false)}
					onSuccess={fetchQuizzes}
				/>
			)}

			<ConfirmModal
				isOpen={deleteModal.isOpen}
				title="Delete Quiz"
				message={`Are you sure you want to delete the quiz "${deleteModal.quiz?.title}"? This action cannot be undone.`}
				confirmLabel="Delete"
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
				isLoading={deleteModal.isLoading}
			/>
		</main>
	);
}
