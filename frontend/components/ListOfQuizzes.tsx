import type { Quiz } from "@/lib/types";
import Link from "next/link";

interface ListOfQuizzesProps {
	quizzes: Quiz[];
	loading: boolean;
	onDeleteClick: (quiz: Quiz) => void;
}

const ListOfQuizzes = ({
	quizzes,
	loading,
	onDeleteClick,
}: ListOfQuizzesProps) => {
	return (
		<div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold text-gray-900">
						Available Quizzes
					</h2>
					<span className="text-sm text-gray-500">
						{quizzes.length} {quizzes.length === 1 ? "Quiz" : "Quizzes"} found
					</span>
				</div>

				{loading ? (
					<div className="flex justify-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
					</div>
				) : quizzes.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{quizzes.map((quiz) => (
							<Link
								key={quiz.id}
								href={`/quiz/${quiz.id}`}
								className="bg-white overflow-hidden shadow rounded-lg border hover:shadow-md transition-all group flex flex-col"
							>
								<div className="px-4 py-5 sm:p-6 grow">
									<div className="flex justify-between items-start">
										<h3 className="text-lg font-medium text-gray-900 truncate">
											{quiz.title}
										</h3>
										<button
											type="button"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												onDeleteClick(quiz);
											}}
											className="text-gray-400 hover:text-red-500 transition-colors p-1"
											aria-label={`Delete ${quiz.title}`}
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
									<div className="mt-4 flex flex-col gap-1">
										<p className="text-sm text-gray-500 flex items-center gap-2">
											<span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-semibold">
												{quiz.questions?.length || 0} Questions
											</span>
										</p>
										<p className="text-xs text-gray-400">
											Created: {new Date(quiz.created_at).toLocaleDateString()}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
						<p className="text-gray-500">
							No quizzes found. Create your first one!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListOfQuizzes;
